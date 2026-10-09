import { COMPONENTS, DEVICES, SCENARIOS, SYSTEM } from './data.js';
import { calculatePower, advanceBatterySoc, formatDuration, formatPower } from './simulation.js';
import { EnergyWorld3D, TOUR_STEPS } from './scene3d.js';

const app = document.querySelector('#app');
const state = {
  page: 'lab',
  irradiance: 70,
  soc: 71,
  gridAvailable: true,
  devices: DEVICES.map(d => ({ ...d })),
  selectedId: 'solar',
  selectedType: 'component',
  showConnections: true,
  playing: false,
  presentationMode: false,
  activeScenario: 'solar-peak',
  hudExpanded: false,
  tourExpanded: false,
};
let world = null;
let simulationTimer = null;
let toastTimer = null;
let pillTimer = null;

function derived() {
  return calculatePower({ irradiance: state.irradiance, soc: state.soc, gridAvailable: state.gridAvailable, devices: state.devices });
}

function showEventPill(title, message) {
  const pill = document.querySelector('#glass-event-pill');
  if (!pill) return;
  const titleEl = document.querySelector('#event-title');
  const descEl = document.querySelector('#event-desc');
  if (titleEl) titleEl.textContent = title;
  if (descEl) descEl.textContent = message;
  pill.classList.remove('hidden');
  if (pillTimer) clearTimeout(pillTimer);
  pillTimer = setTimeout(() => {
    pill.classList.add('hidden');
  }, 6500);
}

export const CABLE_SPECS = {
  'pv-mppt': {
    title: 'سلسلة الألواح الشمسية (DC PV String)',
    en: 'Solar PV String Feeder',
    category: 'توليد شمسي DC',
    standard: 'EN 50618 (PV1-F 2x6mm²)',
    voltage: '94.2 V DC (Vmp)',
    rating: '1000V DC / 35A / UV & Flame Resistant',
    insulation: 'Double Insulated Cross-Linked Polyolefin (LSZH)',
    protection: 'قواطع تيار مستمر DC Breaker + مانع صواعق SPD Type II',
    description: 'كابل شمسي مزدوج مخصص لنقل طاقة تيار مستمر DC من مصفوفة الألواح إلى منظم MPPT، ممدد ومثبت داخل حامل كابلات مجلفن ومحمي ضد العوامل البيئية.'
  },
  'mppt-battery': {
    title: 'ناقل شحن بنك البطاريات (48V Heavy Charge Bus)',
    en: 'MPPT to Battery Charge Bus',
    category: 'شحن البطارية DC',
    standard: 'BS 6004 / H07RN-F 2x35mm²',
    voltage: '48.0 V - 54.6 V DC',
    rating: '48V DC / 80A Max Charge',
    insulation: 'EPR Rubber / Heavy Duty Neoprene Sheath',
    protection: 'فيوز حماية فائق السرعة DC Fuse 100A',
    description: 'كابل شحن مرن عالي التحمل مزود بعوازل حرارية ومحمي ضد تيارات القصر، يربط خرج المنظم بمدخل قاطع عزل البطارية الرئيسي.'
  },
  'battery-inverter': {
    title: 'ناقل تفريغ البطارية للعاكس (48V Heavy DC Bus)',
    en: 'Heavy Battery to Hybrid Inverter Bus',
    category: 'تغذية البطارية للعاكس DC',
    standard: 'BS 6883 / H01N2-D 2x70mm² Extra-Flex Copper',
    voltage: '48.0 V DC Nominal (42V - 58.4V)',
    rating: '48V DC / 200A Continuous / Flame Retardant',
    insulation: 'High-Current Welding Grade Synthetic Rubber',
    protection: 'قاطع عزل دوار DC Isolator + قاطع حراري مغناطيسي 250A',
    description: 'كابل تيار مستمر فائق السماكة ومزدوج (+ أحمر، - أسود) مع أطراف نحاسية ملحومة ومعزولة بانكماش حراري، ينقل الطاقة للعاكس فور انقطاع الشبكة دون هبوط جهد.'
  },
  'inverter-ats': {
    title: 'خرج العاكس لمفتاح التحويل (Source B - Emergency AC)',
    en: 'Hybrid Inverter Pure Sine AC Output',
    category: 'طاقة العاكس الاحتياطية AC',
    standard: 'BS EN 50525 / H07VV-F 3G4mm² Armored Flex',
    voltage: '230 V AC ±2% (50 Hz Pure Sine Wave)',
    rating: '230V AC / 16A / Pure Sine Wave 50Hz',
    insulation: 'Corrugated Steel Flex Shielded Conduit (THD < 3%)',
    protection: 'قاطع تفاضلي طبي Type B RCD + MCB 16A Curve C',
    description: 'كابل طاقة تيار متناوب مع تأريض مصفح بدرع معدني مرن، ينقل الموجة الجيبية النقية من العاكس إلى مدخل المصدر الاحتياطي (Source B) في مفتاح ATS.'
  },
  'grid-ats': {
    title: 'تغذية الشبكة العامة لمفتاح التحويل (Source A - Utility Grid)',
    en: 'Utility Grid Main AC Feeder',
    category: 'مصدر الشبكة العمومية AC',
    standard: 'IEC 60502-1 NYY-J 3G6mm² Industrial Heavy Duty',
    voltage: '230 V AC Nominal (50 Hz Single Phase)',
    rating: '230V AC / 32A / 50Hz Utility Distribution',
    insulation: 'PVC Insulated Armored Surface Cable (32A Rating)',
    protection: 'قاطع رئيسي 32A + مانع صواعق الشبكة SPD Type I+II',
    description: 'كابل التغذية الرئيسي القادم من الشبكة العمومية مع غلاف حماية أزرق صناعي، يدخل عبر مجرى كابلات مصفح إلى مدخل المصدر الأساسي (Source A) في مفتاح ATS.'
  },
  'ats-icu': {
    title: 'الخط الرئيسي لوحدة التوزيع بالعناية المركزة (Hospital IPS Trunk)',
    en: 'ICU Isolated Power Supply (IPS) Feeder Trunk',
    category: 'تغذية العناية المركزة المعزولة AC',
    standard: 'IEC 60364-7-710 / BS EN 50525-3-11 LSZH 3G6mm²',
    voltage: '230 V AC Isolated IT System (نظام عزل طبي)',
    rating: '230V AC / 25A / Low Smoke Zero Halogen + Medical Shield',
    insulation: 'Low Smoke Zero Halogen (LSZH) + Medical Braided Shield',
    protection: 'نظام مراقبة العزل الطبي Insulation Monitoring Device (IMD)',
    description: 'كابل مصفح طبي خالي من الهالوجين مزود بحماية عزل كهرومغناطيسي، يغذي كونسول العناية المركزة الجداري بنظام عزل طبي غير مؤرض IT System لتأمين سلامة المريض القصوى.'
  },
  'branch-vent': {
    title: 'كابل تغذية جهاز التنفس الاصطناعي (Mechanical Ventilator)',
    en: 'Hospital-Grade Power Cord - Ventilator',
    category: 'دعم حياة حرج (Life Support Critical)',
    standard: 'UL 817 / IEC 60320-1 SJT 3x1.5mm² Hospital Grade',
    voltage: '230 V AC / 350 W Load',
    rating: '230V AC / 10A / Antimicrobial Medical Sheath',
    insulation: 'Medical Antimicrobial Silicone Jacket with Green Dot Grounding',
    protection: 'مقبس أحمر مخصص غير قابل للفصل العرضي',
    description: 'كابل طبي فائق الموثوقية مزود بقابس ذي النقطة الخضراء للتأريض الآمن، يغذي جهاز التنفس لدعم الحياة دون انقطاع.'
  },
  'branch-monitor': {
    title: 'كابل شاشة مراقبة المؤشرات الحيوية (Patient Monitor)',
    en: 'Hospital-Grade Power Cord - Monitor',
    category: 'مراقبة حيوية مستمرة',
    standard: 'SJT 3x1.0mm² Hospital Grade with Molded Strain Relief',
    voltage: '230 V AC / 60 W Load',
    rating: '230V AC / 60W Continuous Monitoring',
    insulation: 'Medical Grey Flexible PVC',
    protection: 'مقبس عناية قياسي أخضر مع تأريض متساوي الجهد',
    description: 'كابل تغذية مرن مع حماية مانعة للتداخل الكهرومغناطيسي لضمان دقة إشارات تخطيط القلب ومراقبة العلامات الحيوية.'
  },
  'branch-infusion': {
    title: 'كابل مضخات المحاليل الوريدية (Infusion Pumps ×2)',
    en: 'Hospital-Grade Power Cord - Infusion Pumps',
    category: 'ضخ محاليل وريدية حرجة',
    standard: 'SJT 3x1.0mm² Medical Flex Cord',
    voltage: '230 V AC / 60 W Load',
    rating: '230V AC / 60W IV Delivery Pumps',
    insulation: 'Clean White Hospital Grade Jacket',
    protection: 'مقبس عناية قياسي أخضر',
    description: 'كابل تغذية طبي مزدوج لتشغيل مضخات ضخ الأدوية والمحاليل الحيوية المستمرة في سرير العناية.'
  },
  'branch-syringe': {
    title: 'كابل مضخة الحقن الدقيق (Precision Syringe Pump)',
    en: 'Hospital-Grade Power Cord - Syringe Pump',
    category: 'حقن دوائي ميكروي',
    standard: 'SJT 3x0.75mm² Medical Grade Cord',
    voltage: '230 V AC / 25 W Load',
    rating: '230V AC / 25W Precision Medication Flow',
    insulation: 'Clean White Medical Flex',
    protection: 'مقبس عناية قياسي أخضر',
    description: 'كابل مرن فائق الخفة لحقن الجرعات الدوائية عالية الحساسية بدقة متناهية.'
  },
  'branch-defib': {
    title: 'كابل جهاز الصدمات والإنعاش القلبي (Defibrillator Crash Cart)',
    en: 'Hospital-Grade Power Cord - Defibrillator',
    category: 'إنعاش قلبي طارئ',
    standard: 'SJTW 3x1.5mm² High-Current Silicone Flex',
    voltage: '230 V AC / 200 W (شحن سريع للمكثفات)',
    rating: '230V AC / 10A Heavy Surge Rating',
    insulation: 'Vivid Safety Orange Medical Rubber',
    protection: 'مقبس أحمر مخصص لطوارئ الإنعاش',
    description: 'كابل طوارئ برتقالي عالي المرونة والتحمل لشحن مكثفات الصدمات الكهربائية السريعة في عربة الإنعاش.'
  },
  'branch-incubator': {
    title: 'كابل حاضنة الأطفال حديثي الولادة (Infant Incubator)',
    en: 'Hospital-Grade Power Cord - Incubator',
    category: 'رعاية حديثي الولادة الحرجة',
    standard: 'SJT 3x1.5mm² Thermal-Resistant Hospital Grade',
    voltage: '230 V AC / 400 W (تدفئة وتنظيم حراري)',
    rating: '230V AC / 10A Continuous Thermal Load',
    insulation: 'Medical Royal Blue Heavy Flex',
    protection: 'مقبس أزرق مخصص مع مراقبة تسريب تيار فائقة الحساسية',
    description: 'كابل عزل حراري خاص لتغذية أنظمة تدفئة وترطيب بيئة الحاضنة بدقة واستقرار.'
  },
  'branch-oxygen': {
    title: 'كابل مركّز الأوكسجين الطبي (Oxygen Concentrator)',
    en: 'Hospital-Grade Power Cord - Oxygen Concentrator',
    category: 'توليد أكسجين مستمر',
    standard: 'Heavy-Duty SJT 3x1.5mm² Medical Grade',
    voltage: '230 V AC / 300 W (محرك ضاغط طبي)',
    rating: '230V AC / 10A Inductive Motor Load',
    insulation: 'Medical Heavy Blue Flex',
    protection: 'مقبس أزرق مع حماية ضد تيار البدء',
    description: 'كابل تحمّل عالي مصمم لتيار البدء الحثي لضاغط تركيز وتوليد غاز الأكسجين الطبي.'
  }
};

function getObjectName(id) {
  if (CABLE_SPECS[id]) return CABLE_SPECS[id].title;
  const c = COMPONENTS.find(x => x.id === id);
  if (c) return c.name;
  const d = DEVICES.find(x => x.id === id);
  if (d) return d.name;
  return 'المكوّن المختار';
}

function shell() {
  app.innerHTML = `
    <div class="app-shell ${state.page === 'lab' ? 'fullwidth-lab-shell' : ''}" id="app-shell">
      <header class="topbar">
        <div class="brand"><div class="brand-mark">ϟ</div><div><div class="brand-title">ICU Power Lab <span style="color:#64dcb8">3D</span></div><div class="brand-subtitle">مختبر طاقة العناية المركزة · مشروع تخرج</div></div></div>
        <div class="topbar-center">
          <nav class="topbar-nav" aria-label="أقسام المختبر">
            <button class="top-nav-btn ${state.page === 'lab' ? 'active' : ''}" data-page="lab"><span class="nav-icon">◈</span>العالم 3D التفاعلي</button>
            <button class="top-nav-btn ${state.page === 'home' ? 'active' : ''}" data-page="home"><span class="nav-icon">⌂</span>لوحة المشروع وتوازن الطاقة</button>
            <button class="top-nav-btn ${state.page === 'components' ? 'active' : ''}" data-page="components"><span class="nav-icon">▦</span>المكوّنات والشروحات</button>
          </nav>
        </div>
        <div class="top-actions">
          <button class="secondary-btn small-btn" data-action="export">⇩ تقرير JSON</button>
          <button class="primary-btn small-btn" data-action="present">▣ وضع العرض</button>
        </div>
      </header>
      <div class="layout ${state.page === 'lab' ? 'fullwidth-layout' : ''}">
        <aside class="sidebar ${state.page === 'lab' ? 'lab-hidden' : ''}">
          <div><div class="side-label">القائمة الرئيسية</div><nav class="nav-list">
            <button class="nav-item ${state.page === 'lab' ? 'active' : ''}" data-page="lab"><span class="nav-icon">◈</span>العالم ثلاثي الأبعاد</button>
            <button class="nav-item ${state.page === 'home' ? 'active' : ''}" data-page="home"><span class="nav-icon">⌂</span>لوحة المشروع</button>
            <button class="nav-item ${state.page === 'components' ? 'active' : ''}" data-page="components"><span class="nav-icon">▦</span>المكوّنات والشروحات</button>
          </nav></div>
          <div class="sidebar-spacer"></div>
          <div class="side-note"><div class="side-note-title"><span style="color:var(--orange)">⚠</span> تنبيه هندسي</div><p>هذا نموذج تعليمي تصوري. لا تستخدمه للتوصيل الفعلي أو لاتخاذ قرار سريري أو لتحديد قدرة منظومة طبية.</p></div>
          <div class="side-foot">
            <strong>جامعة المعارف — كلية الهندسة التقنية</strong><br/>
            قسم هندسة تقنيات الأجهزة الطبية<br/>
            ICU POWER LAB 3D
          </div>
        </aside>
        <main class="main-content ${state.page === 'lab' ? 'expansive-main' : ''}" id="page-view"></main>
      </div>
      <!-- Mobile Bottom Navigation Bar -->
      <nav class="mobile-bottom-nav" aria-label="شريط التنقل للهاتف">
        <button class="mobile-nav-btn active" data-page="lab"><span class="m-icon">◈</span><span>العالم 3D</span></button>
        <button class="mobile-nav-btn" data-page="home"><span class="m-icon">⌂</span><span>لوحة المشروع</span></button>
        <button class="mobile-nav-btn" data-page="components"><span class="m-icon">▦</span><span>المكوّنات</span></button>
      </nav>
    </div>`;
  app.addEventListener('click', handleClick);
  app.addEventListener('input', handleInput);
  app.addEventListener('change', handleChange);
  renderPage();
}

function pageHeader(eyebrow, title, description, badges = '') {
  return `<div class="view-header"><div><span class="eyebrow">${eyebrow}</span><h1 class="view-title">${title}</h1><p class="view-description">${description}</p></div><div class="header-badges">${badges}</div></div>`;
}

function cautionBanner() {
  return `<div class="notice"><span class="notice-icon">⚠</span><div><strong>استخدام تعليمي فقط:</strong> هذه المحاكاة والمجسمات ليست تصميماً كهربائياً معتمداً ولا نظاماً طبياً جاهزاً. أرقام الأحمال والقدرات مأخوذة ومشتقة من المشروع المرجعي. يجب التحقق من جميع القيم والتوصيلات مع مهندس مختص وأوراق بيانات الأجهزة قبل أي تطبيق واقعي.</div></div>`;
}

function metricCard(label, value, caption, icon, color = '#5b8cff', id = '') {
  return `<article class="metric-card" style="--metric-color:${color}"><div class="metric-top"><span>${label}</span><span class="metric-icon">${icon}</span></div><div class="metric-value" ${id ? `id="${id}"` : ''}>${value}</div><div class="metric-caption">${caption}</div></article>`;
}

function scenarioCards() {
  return SCENARIOS.map(s => `<button class="scenario-card" data-scenario="${s.id}"><span class="scenario-icon">${s.icon}</span><strong>${s.name}</strong><p>${s.description}</p><span class="run-link">تطبيق السيناريو ←</span></button>`).join('');
}

function deviceMiniRows(showToggles = true) {
  return state.devices.map(device => `
    <div class="load-row" style="padding:7px 0">
      <div class="load-meta">
        <span class="device-symbol">${deviceIcon(device.id)}</span>
        <div>
          <div class="device-name">${device.name}</div>
          <div class="device-en">${device.en} · ${device.watts} W</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:12px">
        <span class="load-watts" id="load-watt-${device.id}" style="font-weight:700;color:${device.on ? 'var(--green)' : 'var(--muted)'}">${device.on ? device.watts + ' W' : '0 W'}</span>
        ${showToggles ? `
          <label class="toggle" aria-label="${device.name}">
            <input type="checkbox" data-device="${device.id}" ${device.on ? 'checked' : ''}>
            <span class="toggle-track"></span>
          </label>
        ` : `
          <span class="status-chip ${device.on ? '' : 'off'}">${device.on ? 'نشط' : 'متوقف'}</span>
        `}
      </div>
    </div>
  `).join('');
}

function medicalLoadMatrixHTML(showToggles = true) {
  const categories = [
    {
      id: 'cat-1',
      title: 'أحمال دعم الحياة فائقة الخطورة (Critical Life Support)',
      sub: 'Priority 1 · تغذية دون أي انقطاع مطلقاً',
      color: 'var(--red)',
      deviceIds: ['vent', 'monitor', 'defib'],
    },
    {
      id: 'cat-2',
      title: 'أجهزة العلاج والضخ الدقيق (Precision Drug Delivery)',
      sub: 'Priority 2 · جرعات محاليل وأدوية حرجة',
      color: 'var(--orange)',
      deviceIds: ['infusion', 'syringe'],
    },
    {
      id: 'cat-3',
      title: 'بيئة الحضانة والرعاية والغازات (Care Environment)',
      sub: 'Priority 3 · تدفئة وتوليد أكسجين مستمر',
      color: 'var(--blue)',
      deviceIds: ['incubator', 'oxygen'],
    },
  ];

  return categories.map(cat => {
    const devs = state.devices.filter(d => cat.deviceIds.includes(d.id));
    const catWatts = devs.reduce((sum, d) => sum + (d.on ? d.watts : 0), 0);
    const catMaxWatts = devs.reduce((sum, d) => sum + d.watts, 0);

    return `
      <div class="med-category-block" style="border-right: 4px solid ${cat.color}">
        <div class="med-category-head">
          <div class="med-category-title">
            <span style="color:${cat.color}">●</span>
            <div>
              <strong>${cat.title}</strong>
              <div style="font-size:10px;color:#8da5c3;margin-top:2px">${cat.sub}</div>
            </div>
          </div>
          <div class="med-category-sum">
            <strong id="${cat.id}-watts">${catWatts} W</strong> / ${catMaxWatts} W
          </div>
        </div>
        <div class="load-list">
          ${devs.map(device => `
            <div class="load-row" style="padding:7px 0">
              <div class="load-meta">
                <span class="device-symbol">${deviceIcon(device.id)}</span>
                <div>
                  <div class="device-name">${device.name}</div>
                  <div class="device-en">${device.en} · ${device.watts} W</div>
                </div>
              </div>
              <div style="display:flex;align-items:center;gap:12px">
                <span class="load-watts" id="load-watt-${device.id}" style="font-weight:700;color:${device.on ? 'var(--green)' : 'var(--muted)'}">${device.on ? device.watts + ' W' : '0 W'}</span>
                ${showToggles ? `
                  <label class="toggle" aria-label="${device.name}">
                    <input type="checkbox" data-device="${device.id}" ${device.on ? 'checked' : ''}>
                    <span class="toggle-track"></span>
                  </label>
                ` : `
                  <span class="status-chip ${device.on ? '' : 'off'}">${device.on ? 'نشط' : 'متوقف'}</span>
                `}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function livePowerSchematicHTML(d) {
  const pvFlowing = d.solarDcW > 10;
  const battDischarging = !state.gridAvailable || d.batterySupplyW > 10;
  const gridActive = state.gridAvailable;
  const icuPowered = d.loadW > 0 && d.unmetLoadW <= 1;
  const batteryUsableWh = Math.round(state.soc * (SYSTEM.batteryWh / 100));

  return `
    <div class="schematic-box">
      <div class="schematic-head">
        <div>
          <span class="eyebrow" style="margin-bottom:4px">INTERACTIVE SCADA TOPOLOGY · مخطط تدفق القدرة الحي</span>
          <h2 class="panel-title" style="font-size:16px;color:#f0f7ff">المخطط التفاعلي الحي لمسار وتدفق القدرة الكهربائية</h2>
          <p class="panel-subtitle">تتبّع مسارات التيار الحي وتوزيع الطاقة لحظياً بين المصادر الثلاثة والحمل الطبي المعزول</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <span class="tag ${gridActive ? 'green' : 'red'}" id="schematic-grid-tag">${gridActive ? '🟢 الشبكة متاحة' : '🔴 الشبكة مفصولة (ATS)'}</span>
          <span class="tag ${d.unmetLoadW > 1 ? 'red' : 'green'}" id="schematic-balance-tag">${d.unmetLoadW > 1 ? 'عجز تغذية' : 'تغذية مؤمنة 100%'}</span>
        </div>
      </div>

      <div class="schematic-canvas-wrap">
        <svg class="schematic-flow-diagram" viewBox="0 0 920 180" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="nodeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <!-- 1. PV to MPPT -->
          <path id="schematic-wire-pv" data-inspect="pv-mppt" d="M 125 65 L 210 65" fill="none" stroke="${pvFlowing ? '#ffb85c' : '#23415f'}" stroke-width="4" stroke-dasharray="${pvFlowing ? '6 4' : 'none'}" class="${pvFlowing ? 'wire-active' : ''}" style="cursor:pointer" />
          <!-- 2. MPPT to Battery -->
          <path id="schematic-wire-mppt" data-inspect="mppt-battery" d="M 320 65 L 405 65" fill="none" stroke="${pvFlowing ? '#33d6a6' : '#23415f'}" stroke-width="4" stroke-dasharray="${pvFlowing ? '6 4' : 'none'}" class="${pvFlowing ? 'wire-active' : ''}" style="cursor:pointer" />
          <!-- 3. Battery to Inverter -->
          <path id="schematic-wire-batt" data-inspect="battery-inverter" d="M 465 100 L 465 125" fill="none" stroke="${battDischarging ? '#f59e0b' : '#23415f'}" stroke-width="4" stroke-dasharray="${battDischarging ? '6 4' : 'none'}" class="${battDischarging ? 'wire-active' : ''}" style="cursor:pointer" />
          <!-- 4. Inverter to ATS (Source B) -->
          <path id="schematic-wire-inv" data-inspect="inverter-ats" d="M 525 150 L 610 150 L 610 110 L 640 110" fill="none" stroke="${battDischarging || pvFlowing ? '#33d6a6' : '#23415f'}" stroke-width="4" stroke-dasharray="${battDischarging || pvFlowing ? '6 4' : 'none'}" class="${battDischarging || pvFlowing ? 'wire-active' : ''}" style="cursor:pointer" />
          <!-- 5. Grid to ATS (Source A) -->
          <path id="schematic-wire-grid" data-inspect="grid-ats" d="M 525 25 L 610 25 L 610 65 L 640 65" fill="none" stroke="${gridActive ? '#5b8cff' : '#662233'}" stroke-width="4" stroke-dasharray="${gridActive ? '6 4' : 'none'}" class="${gridActive ? 'wire-active' : ''}" style="cursor:pointer" />
          <!-- 6. ATS to ICU -->
          <path id="schematic-wire-icu" data-inspect="ats-icu" d="M 740 88 L 790 88" fill="none" stroke="${icuPowered ? '#00f5b8' : '#ff4466'}" stroke-width="5" stroke-dasharray="${icuPowered ? '8 4' : 'none'}" class="${icuPowered ? 'wire-active' : ''}" style="cursor:pointer" />

          <!-- Node 1: PV Array -->
          <g transform="translate(15, 30)" data-inspect="solar" style="cursor:pointer" class="schematic-node-g">
            <title>مصفوفة الألواح الشمسية 2400Wp (انقر للاستعراض 3D)</title>
            <rect width="110" height="70" rx="12" fill="#0d2137" stroke="${pvFlowing ? '#ffb85c' : '#244566'}" stroke-width="2" filter="${pvFlowing ? 'url(#nodeGlow)' : 'none'}" />
            <text x="55" y="24" fill="#ffb85c" font-size="12" font-weight="bold" text-anchor="middle">☀️ الألواح (PV)</text>
            <text x="55" y="44" fill="#ffffff" font-size="13" font-family="monospace" font-weight="900" text-anchor="middle" id="schematic-pv-w">${formatPower(d.solarDcW)}</text>
            <text x="55" y="60" fill="#8eaac6" font-size="9" text-anchor="middle">2400 Wp Array ↗</text>
          </g>

          <!-- Node 2: MPPT Controller -->
          <g transform="translate(210, 30)" data-inspect="mppt" style="cursor:pointer" class="schematic-node-g">
            <title>منظم الشحن الذكي MPPT (انقر للاستعراض 3D)</title>
            <rect width="110" height="70" rx="12" fill="#0d2137" stroke="${pvFlowing ? '#33d6a6' : '#244566'}" stroke-width="2" />
            <text x="55" y="24" fill="#33d6a6" font-size="12" font-weight="bold" text-anchor="middle">⚡ منظم MPPT</text>
            <text x="55" y="44" fill="#ffffff" font-size="12" font-family="monospace" font-weight="bold" text-anchor="middle" id="schematic-mppt-w">كفاءة 97%</text>
            <text x="55" y="60" fill="#8eaac6" font-size="9" text-anchor="middle">تتبع الاستطاعة ↗</text>
          </g>

          <!-- Node 3: Battery Storage -->
          <g transform="translate(405, 25)" data-inspect="battery" style="cursor:pointer" class="schematic-node-g">
            <title>بنك بطاريات الليثيوم LiFePO4 (انقر للاستعراض 3D)</title>
            <rect width="120" height="65" rx="12" fill="#0d2137" stroke="${state.soc > 20 ? '#33d6a6' : '#ff526c'}" stroke-width="2" filter="url(#nodeGlow)" />
            <text x="60" y="22" fill="#33d6a6" font-size="12" font-weight="bold" text-anchor="middle">🔋 بنك البطاريات</text>
            <text x="60" y="42" fill="#ffffff" font-size="13" font-family="monospace" font-weight="900" text-anchor="middle" id="schematic-batt-soc">${Math.round(state.soc)}% (${(batteryUsableWh/1000).toFixed(1)} kWh)</text>
            <text x="60" y="58" fill="#8eaac6" font-size="9" text-anchor="middle">48V LiFePO4 · 9.6 kWh ↗</text>
          </g>

          <!-- Node 4: Hybrid Inverter -->
          <g transform="translate(405, 115)" data-inspect="inverter" style="cursor:pointer" class="schematic-node-g">
            <title>العاكس الهجين Pure Sine (انقر للاستعراض 3D)</title>
            <rect width="120" height="60" rx="12" fill="#0d2137" stroke="#2563eb" stroke-width="2" />
            <text x="60" y="22" fill="#7c9cff" font-size="12" font-weight="bold" text-anchor="middle">ϟ العاكس الهجين</text>
            <text x="60" y="40" fill="#ffffff" font-size="12" font-family="monospace" font-weight="bold" text-anchor="middle" id="schematic-inv-w">${formatPower(d.solarToLoadW + d.batterySupplyW)}</text>
            <text x="60" y="54" fill="#8eaac6" font-size="8.5" text-anchor="middle">2000W Pure Sine ↗</text>
          </g>

          <!-- Node 5: ATS Switch -->
          <g transform="translate(640, 45)" data-inspect="ats" style="cursor:pointer" class="schematic-node-g">
            <title>مفتاح التحويل السريع التلقائي ATS (انقر للاستعراض 3D)</title>
            <rect width="100" height="85" rx="12" fill="#0d2137" stroke="${gridActive ? '#5b8cff' : '#f59e0b'}" stroke-width="2" />
            <text x="50" y="24" fill="#ffd166" font-size="12" font-weight="bold" text-anchor="middle">⇄ مفتاح ATS</text>
            <text x="50" y="48" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle" id="schematic-ats-source">${gridActive ? 'Source A: شبكة' : 'Source B: عاكس'}</text>
            <text x="50" y="68" fill="#5ce2ba" font-size="10" font-family="monospace" text-anchor="middle">&lt; 10 ms سرعة ↗</text>
          </g>

          <!-- Node 6: ICU Isolated Medical Console & Beds -->
          <g transform="translate(790, 42)" data-inspect="icu" style="cursor:pointer" class="schematic-node-g">
            <title>وحدة العناية المركزة ونظام التأريض الطبي IPS (انقر للاستعراض 3D)</title>
            <rect width="115" height="92" rx="14" fill="#0c2b29" stroke="#00f5b8" stroke-width="3" filter="url(#nodeGlow)" />
            <text x="57" y="26" fill="#00f5b8" font-size="12" font-weight="bold" text-anchor="middle">✚ العناية ICU</text>
            <text x="57" y="52" fill="#ffffff" font-size="16" font-family="monospace" font-weight="900" text-anchor="middle" id="schematic-load-w">${formatPower(d.loadW)}</text>
            <text x="57" y="72" fill="#a5f2d9" font-size="10" text-anchor="middle">نظام عزل طبي IPS ↗</text>
          </g>
        </svg>
      </div>

      <!-- Quick Interactive Cable & Component Links -->
      <div class="schematic-footer-bar">
        <div class="schematic-hint">
          <span style="color:#00f5b8">💡 تفاعلي:</span> اضغط على أي مكوّن أو مسار في المخطط للانتقال المباشر وتفحصه في العالم 3D
        </div>
        <div class="schematic-cable-quicklinks">
          <button class="legend-item-btn small" data-inspect="pv-mppt" title="فحص كابل الطاقة الشمسية 6mm²"><i class="key-swatch" style="--key:#ffb85c"></i> <span>كابل PV (6mm²)</span></button>
          <button class="legend-item-btn small" data-inspect="mppt-battery" title="فحص كابل الشحن 35mm²"><i class="key-swatch" style="--key:#33d6a6"></i> <span>كابل شحن (35mm²)</span></button>
          <button class="legend-item-btn small" data-inspect="battery-inverter" title="فحص كابل تفريغ البطارية 70mm²"><i class="key-swatch" style="--key:#f59e0b"></i> <span>كابل عاكس (70mm²)</span></button>
          <button class="legend-item-btn small" data-inspect="grid-ats" title="فحص كابل الشبكة العامة 6mm²"><i class="key-swatch" style="--key:#5b8cff"></i> <span>تغذية شبكة ATS</span></button>
          <button class="legend-item-btn small" data-inspect="ats-icu" title="فحص خط التوزيع الطبي المعزول IPS"><i class="key-swatch" style="--key:#00f5b8"></i> <span>خط العزل الطبي IPS</span></button>
        </div>
      </div>
    </div>
  `;
}

function sliderField(id, label, value, min, max, suffix, left, right) {
  return `<div class="field-block"><div class="field-top"><label for="${id}">${label}</label><span class="field-value" id="${id}-value">${value}${suffix}</span></div><input class="range" id="${id}" type="range" min="${min}" max="${max}" step="1" value="${value}" data-input="${id}"><div class="range-labels"><span>${left}</span><span>${right}</span></div></div>`;
}

function controlsPanel() {
  return `<section class="panel glass-panel"><div class="panel-heading"><div><h2 class="panel-title">متحكّمات التجربة والمحاكاة</h2><p class="panel-subtitle">غيّر المتغيرات ولاحظ الاستجابة الفورية للمنظومة</p></div><span class="tag green">LIVE SCADA</span></div>
    ${sliderField('irradiance', 'الإشعاع الشمسي (Solar Irradiance)', state.irradiance, 0, 100, '%', '0% · غياب الشمس', '100% · ذروة الإشعاع')}
    <div class="slider-presets-row" style="margin-top:-6px;margin-bottom:12px">
      <button class="preset-pill" data-preset-irr="0">0% ليل</button>
      <button class="preset-pill" data-preset-irr="35">35% غائم</button>
      <button class="preset-pill" data-preset-irr="70">70% قياسي</button>
      <button class="preset-pill" data-preset-irr="100">100% ذروة</button>
    </div>
    ${sliderField('soc', 'حالة شحن البطارية (State of Charge)', Math.round(state.soc), 0, 100, '%', '0%', '100%')}
    <div class="slider-presets-row" style="margin-top:-6px;margin-bottom:12px">
      <button class="preset-pill" data-preset-soc="15">15% حرج</button>
      <button class="preset-pill" data-preset-soc="50">50% نصف</button>
      <button class="preset-pill" data-preset-soc="80">80% آمن</button>
      <button class="preset-pill" data-preset-soc="100">100% كامل</button>
    </div>
    <div class="status-line"><span>الشبكة الكهربائية العامة (Source A)</span><span class="tag ${state.gridAvailable ? 'green' : 'red'}" id="grid-badge">${state.gridAvailable ? 'متاحة ومستقرة' : 'منقطعة (معزولة)'}</span></div>
    <button class="${state.gridAvailable ? 'danger-btn secondary-btn' : 'primary-btn'}" data-action="grid-toggle" style="width:100%;margin:10px 0 8px">${state.gridAvailable ? '⚡ محاكاة انقطاع الشبكة العامة (ATS)' : '↻ إعادة ربط وتغذية الشبكة العامة'}</button>
    <div class="divider"></div>
    <div class="control-grid"><button class="secondary-btn" data-action="all-on">تشغيل كل الأحمال</button><button class="secondary-btn" data-action="all-off">إيقاف كل الأحمال</button><button class="secondary-btn" data-action="reset">إعادة الضبط</button><button class="primary-btn" data-action="play">${state.playing ? 'Ⅱ إيقاف الزمن' : '▶ تقدّم دقيقة'}</button></div>
    <p class="tiny-note">زر الزمن يقدّم المحاكاة دقيقةً في كل ثانية عند التشغيل لمراقبة شحن أو تفريغ البطارية الحقيقي.</p>
  </section>`;
}

function dashboardPage() {
  const d = derived();
  const effectiveSupply = d.solarToLoadW + d.gridSupplyW + d.batterySupplyW;
  const balanceStatus = d.unmetLoadW > 1 ? `<span class="tag red">عجز ${Math.round(d.unmetLoadW)} W</span>` : d.gridAvailable ? `<span class="tag green">التغذية متاحة ومستقرة</span>` : `<span class="tag blue">تعمل على الطاقة الاحتياطية</span>`;

  // Calculate percentage shares of supply
  const loadBase = Math.max(1, d.loadW);
  const solarPct = Math.min(100, Math.round((d.solarToLoadW / loadBase) * 100));
  const battPct = Math.min(100, Math.round((d.batterySupplyW / loadBase) * 100));
  const gridPct = Math.min(100, Math.round((d.gridSupplyW / loadBase) * 100));
  const unmetPct = Math.min(100, Math.round((d.unmetLoadW / loadBase) * 100));
  const greenSelfSufficiency = Math.min(100, Math.round(((d.solarToLoadW + d.batterySupplyW) / loadBase) * 100));
  const loadPercentageOfInverter = Math.min(100, Math.round((d.loadW / SYSTEM.inverterLimitW) * 100));
  const solarPercentageOfCapacity = Math.min(100, Math.round((d.solarDcW / SYSTEM.panelWp) * 100));
  const batteryUsableWh = Math.round(state.soc * (SYSTEM.batteryWh / 100));

  return `
    <div class="view-header">
      <div>
        <span class="eyebrow">HOSPITAL MICROGRID SCADA · نظام التغذية الكهربائية الطبية المعزولة</span>
        <h1 class="view-title">لوحة المشروع والمحاكاة الحية لتوازن الطاقة</h1>
        <p class="view-description">مركز المراقبة والتحكم الشامل بمنظومة الطاقة الاحتياطية لوحدة العناية المركزة (ICU Isolated Power Supply). تتبع مباشر لتدفق القدرة بين المصفوفة الشمسية، بنك البطاريات، والشبكة العامة مع كشف فوري لأي عجز كهربائي.</p>
      </div>
      <div class="header-badges">
        <span class="tag green">● محاكاة حيّة SCADA</span>
        <span class="tag blue">معيار IEC 60364-7-710</span>
        <span class="tag muted">زمن تحويل ATS &lt; 10ms</span>
      </div>
    </div>

    ${cautionBanner()}

    <!-- 1. Executive Telemetry 6-KPI Matrix -->
    <div class="dashboard-kpi-grid">
      <!-- KPI 1: ICU Demand -->
      <article class="kpi-card" data-inspect="icu" style="border-top:3px solid var(--blue);cursor:pointer" title="انقر لتفحص وحدة العناية والأحمال في العالم 3D">
        <div class="kpi-card-top">
          <span class="kpi-label">الحمل الطبي اللحظي (ICU Load)</span>
          <span class="kpi-icon" style="color:var(--blue)">▤</span>
        </div>
        <div class="kpi-value-row">
          <span class="kpi-val" id="home-load">${formatPower(d.loadW)}</span>
          <span class="tag muted" style="font-size:10px" id="home-load-ratio">${loadPercentageOfInverter}% من العاكس</span>
        </div>
        <div class="kpi-sub">مجموع أحمال الأجهزة الطبية قيد التشغيل ↗</div>
        <div class="kpi-meter"><div class="kpi-meter-fill" id="home-load-bar" style="width:${loadPercentageOfInverter}%;background:var(--blue)"></div></div>
      </article>

      <!-- KPI 2: Solar PV Generation -->
      <article class="kpi-card" data-inspect="solar" style="border-top:3px solid var(--orange);cursor:pointer" title="انقر لتفحص مصفوفة الألواح الشمسية في العالم 3D">
        <div class="kpi-card-top">
          <span class="kpi-label">توليد الألواح بعد MPPT</span>
          <span class="kpi-icon" style="color:var(--orange)">☀️</span>
        </div>
        <div class="kpi-value-row">
          <span class="kpi-val" id="home-solar" style="color:var(--orange)">${formatPower(d.solarDcW)}</span>
          <span class="tag orange" style="font-size:10px" id="home-irr-tag">إشعاع ${state.irradiance}%</span>
        </div>
        <div class="kpi-sub">مصفوفة 6 ألواح (2400Wp) · كفاءة MPPT 97% ↗</div>
        <div class="kpi-meter"><div class="kpi-meter-fill" id="home-pv-bar" style="width:${solarPercentageOfCapacity}%;background:var(--orange)"></div></div>
      </article>

      <!-- KPI 3: Battery Storage -->
      <article class="kpi-card" data-inspect="battery" style="border-top:3px solid var(--green);cursor:pointer" title="انقر لتفحص بنك بطاريات الليثيوم في العالم 3D">
        <div class="kpi-card-top">
          <span class="kpi-label">بنك بطاريات الليثيوم (SOC)</span>
          <span class="kpi-icon" style="color:var(--green)">🔋</span>
        </div>
        <div class="kpi-value-row">
          <span class="kpi-val" id="home-soc" style="color:var(--green)">${Math.round(state.soc)}%</span>
          <span class="tag green" style="font-size:10px" id="home-batt-kwh">${(batteryUsableWh/1000).toFixed(1)} kWh</span>
        </div>
        <div class="kpi-sub">سعة اسمية 9.6 kWh · جهد 48V بنظام BMS ↗</div>
        <div class="kpi-meter"><div class="kpi-meter-fill" id="home-soc-bar" style="width:${Math.round(state.soc)}%;background:var(--green)"></div></div>
      </article>

      <!-- KPI 4: Utility Grid Supply -->
      <article class="kpi-card" data-inspect="grid" style="border-top:3px solid #7c9cff;cursor:pointer" title="انقر لتفحص مدخل الشبكة العامة في العالم 3D">
        <div class="kpi-card-top">
          <span class="kpi-label">تغذية الشبكة العامة (Source A)</span>
          <span class="kpi-icon" style="color:#7c9cff">⌁</span>
        </div>
        <div class="kpi-value-row">
          <span class="kpi-val" id="home-grid-val" style="color:${state.gridAvailable ? '#7c9cff' : 'var(--muted)'}">${formatPower(d.gridSupplyW)}</span>
          <span class="tag ${state.gridAvailable ? 'green' : 'red'}" id="home-grid-status-tag">${state.gridAvailable ? 'متاحة ومستقرة' : 'منقطعة'}</span>
        </div>
        <div class="kpi-sub">230V AC / 50Hz · خط التغذية الأساسي لمفتاح ATS ↗</div>
        <div class="kpi-meter"><div class="kpi-meter-fill" id="home-grid-bar" style="width:${state.gridAvailable ? '100%' : '0%'};background:#7c9cff"></div></div>
      </article>

      <!-- KPI 5: Emergency Autonomy -->
      <article class="kpi-card" data-inspect="ats" style="border-top:3px solid #5ce2ba;cursor:pointer" title="انقر لتفحص مفتاح ATS في العالم 3D">
        <div class="kpi-card-top">
          <span class="kpi-label">الاستقلالية عند انقطاع الشبكة</span>
          <span class="kpi-icon" style="color:#5ce2ba">⏱</span>
        </div>
        <div class="kpi-value-row">
          <span class="kpi-val" id="home-autonomy" style="color:#5ce2ba">${formatDuration(calculatePower({...state, gridAvailable:false}).autonomyHours)}</span>
        </div>
        <div class="kpi-sub">زمن التشغيل التقديري لأجهزة العناية الحالية دون شبكة ↗</div>
        <div class="kpi-meter"><div class="kpi-meter-fill" style="width:100%;background:#5ce2ba"></div></div>
      </article>

      <!-- KPI 6: Green Self-Sufficiency -->
      <article class="kpi-card" data-inspect="inverter" style="border-top:3px solid ${d.unmetLoadW > 1 ? 'var(--red)' : '#33d6a6'};cursor:pointer" title="انقر لتفحص العاكس الهجين في العالم 3D">
        <div class="kpi-card-top">
          <span class="kpi-label">نسبة الاكتفاء الذاتي والتوازن</span>
          <span class="kpi-icon" style="color:${d.unmetLoadW > 1 ? 'var(--red)' : '#33d6a6'}">⚖</span>
        </div>
        <div class="kpi-value-row">
          <span class="kpi-val" id="home-self-sufficiency" style="color:${d.unmetLoadW > 1 ? 'var(--red)' : '#33d6a6'}">${greenSelfSufficiency}%</span>
          <span class="tag ${d.unmetLoadW > 1 ? 'red' : 'green'}" id="home-unmet-tag">${d.unmetLoadW > 1 ? 'عجز ' + Math.round(d.unmetLoadW) + 'W' : 'مغطى 100%'}</span>
        </div>
        <div class="kpi-sub" id="home-balance-caption">${d.unmetLoadW > 1 ? 'تحذير: القدرة المطلوبة تتجاوز إمدادات الطاقة!' : 'الحمل الطبي مغطّى بالكامل مع أمان واستقرار.'}</div>
        <div class="kpi-meter"><div class="kpi-meter-fill" id="home-self-bar" style="width:${greenSelfSufficiency}%;background:${d.unmetLoadW > 1 ? 'var(--red)' : '#33d6a6'}"></div></div>
      </article>
    </div>

    <!-- 2. Interactive SVG Power Flow Schematic -->
    ${livePowerSchematicHTML(d)}

    <!-- 3. Dynamic Power Balance & Medical Load Matrix -->
    <div class="grid two-col">
      <!-- Left: Power Distribution & Balance Analysis -->
      <section class="panel glass-panel">
        <div class="panel-heading">
          <div>
            <h2 class="panel-title">توازن وتوزيع مصادر التغذية</h2>
            <p class="panel-subtitle">نسبة مساهمة كل مصدر طاقة في تلبية أحمال العناية المركزة</p>
          </div>
          ${balanceStatus}
        </div>

        <!-- Multi-segment visual split bar -->
        <div class="balance-split-bar">
          <div class="split-seg" id="split-solar" style="width:${solarPct}%;background:var(--orange)" title="الشمس: ${solarPct}%"></div>
          <div class="split-seg" id="split-batt" style="width:${battPct}%;background:var(--green)" title="البطارية: ${battPct}%"></div>
          <div class="split-seg" id="split-grid" style="width:${gridPct}%;background:#5b8cff" title="الشبكة: ${gridPct}%"></div>
          <div class="split-seg" id="split-unmet" style="width:${unmetPct}%;background:var(--red)" title="عجز: ${unmetPct}%"></div>
        </div>

        <div class="split-legend-row">
          <span class="split-legend-item"><i class="key-swatch" style="--key:var(--orange)"></i> <span>الشمس: <strong id="split-lbl-solar">${solarPct}%</strong></span></span>
          <span class="split-legend-item"><i class="key-swatch" style="--key:var(--green)"></i> <span>البطارية: <strong id="split-lbl-batt">${battPct}%</strong></span></span>
          <span class="split-legend-item"><i class="key-swatch" style="--key:#5b8cff"></i> <span>الشبكة: <strong id="split-lbl-grid">${gridPct}%</strong></span></span>
          ${unmetPct > 0 ? `<span class="split-legend-item" style="color:var(--red)"><i class="key-swatch" style="--key:var(--red)"></i> <span>عجز: <strong id="split-lbl-unmet">${unmetPct}%</strong></span></span>` : ''}
        </div>

        <div class="chart-wrap"><canvas id="energy-chart" aria-label="رسم توضيحي لتوازن الطاقة"></canvas></div>
        <div class="chart-axis"><span>PV</span><span>Battery</span><span>Grid</span><span>Load</span></div>

        <div class="divider"></div>

        <div class="control-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr))">
          <div class="control-tile"><span class="tiny">الشمس إلى الحمل</span><strong id="home-solar-load">${formatPower(d.solarToLoadW)}</strong></div>
          <div class="control-tile"><span class="tiny">البطارية إلى الحمل</span><strong id="home-battery-load">${formatPower(d.batterySupplyW)}</strong></div>
          <div class="control-tile"><span class="tiny">الشبكة إلى الحمل</span><strong id="home-grid-load">${formatPower(d.gridSupplyW)}</strong></div>
          <div class="control-tile"><span class="tiny">الحمل المغطّى إجمالاً</span><strong id="home-covered">${formatPower(effectiveSupply)}</strong></div>
          <div class="control-tile"><span class="tiny">هامش أمان العاكس</span><strong id="home-inverter-headroom" style="color:#5ce2ba">${Math.max(0, SYSTEM.inverterLimitW - d.loadW)} W</strong></div>
          <div class="control-tile"><span class="tiny">حصة الطاقة النظيفة</span><strong id="home-renewable-ratio" style="color:var(--green)">${greenSelfSufficiency}%</strong></div>
        </div>
      </section>

      <!-- Right: Medical Loads Matrix Categorized by Criticality -->
      <section class="panel glass-panel">
        <div class="panel-heading">
          <div>
            <h2 class="panel-title">مصفوفة الأحمال الطبية وتوزيع الأولويات</h2>
            <p class="panel-subtitle">أجهزة وحدة العناية مصنّفة حسب معيار الأمان السريري</p>
          </div>
          <div class="panel-actions">
            <button class="secondary-btn small-btn" data-action="all-on">تشغيل الكل</button>
            <button class="secondary-btn small-btn" data-action="all-off">إيقاف الكل</button>
          </div>
        </div>

        <div class="med-matrix-wrap">
          ${medicalLoadMatrixHTML(true)}
        </div>

        <div class="divider"></div>
        <div class="status-line"><span>إجمالي الأجهزة النشطة</span><strong id="device-count">${state.devices.filter(d=>d.on).length} من أصل ${state.devices.length} جهاز</strong></div>
        <div class="status-line"><span>حالة نظام العزل الطبي IT System</span><strong style="color:#00f5b8">100% مؤرض طبياً معزول (IPS)</strong></div>
      </section>
    </div>

    <!-- 4. Operational Controls & Ready Scenarios -->
    <div class="grid two-col" style="margin-top:18px">
      ${controlsPanel()}

      <section class="panel glass-panel">
        <div class="panel-heading">
          <div>
            <h2 class="panel-title">السيناريوهات التشغيلية الجاهزة</h2>
            <p class="panel-subtitle">اختبار سريع لحالات التشغيل الميدانية المختلفة بضغطة زر</p>
          </div>
        </div>
        <div class="grid scenario-grid" style="margin-top:0">${scenarioCards()}</div>
      </section>
    </div>

    <!-- 5. Mathematical Modeling & Medical Standards Verification -->
    <div class="grid bottom-grid" style="margin-top:18px">
      <section class="panel glass-panel">
        <div class="panel-heading">
          <div>
            <h2 class="panel-title">معادلات النموذج الحسابي والهندسي</h2>
            <p class="panel-subtitle">الأسس الرياضية المستخدمة لحساب تدفق القدرة</p>
          </div>
          <span class="tag muted">SCADA MATH</span>
        </div>
        <div class="status-line"><span>توليد PV بعد MPPT</span><strong class="mono">P_dc = Irradiance × 2400 Wp × 0.97</strong></div>
        <div class="status-line"><span>خرج العاكس المتناوب Pure Sine</span><strong class="mono">P_ac = P_dc × 0.94 (حد العاكس 2000W)</strong></div>
        <div class="status-line"><span>معادلة زمن استقلالية البطارية</span><strong class="mono">T_autonomy = (9600 Wh × SOC) / P_load</strong></div>
        <div class="status-line"><span>زمن تحويل مفتاح ATS التلقائي</span><strong class="mono">&lt; 10 ms (دون انقطاع)</strong></div>
      </section>

      <section class="panel glass-panel">
        <div class="panel-heading">
          <div>
            <h2 class="panel-title">المعايير الطبية والهندسية المعتمدة</h2>
            <p class="panel-subtitle">مطابقة التصميم للاشتراطات والمواصفات الدولية</p>
          </div>
          <span class="tag green">3 معايير</span>
        </div>
        <div class="status-line"><span>المعيار الطبي الدولي IEC 60364-7-710</span><strong>المستشفيات وغرف العمليات والعناية المركزة</strong></div>
        <div class="status-line"><span>المعيار الأمريكي NFPA 99</span><strong>Health Care Facilities Code</strong></div>
        <div class="status-line"><span>معيار الكابلات والمقابس UL 817</span><strong>Hospital Grade مع عزل LSZH</strong></div>
        <button class="primary-btn" style="margin-top:16px;width:100%" data-page="lab">انتقل إلى العالم ثلاثي الأبعاد 3D ↗</button>
      </section>
    </div>

    ${footer()}`;
}

function componentInspectorHTML(id = state.selectedId) {
  if (CABLE_SPECS[id]) {
    const cable = CABLE_SPECS[id];
    const d = derived();
    let livePower = '0 W';
    let liveCurrent = '0.0 A';
    let statusBadge = '<span class="tag green">نشط وموصل</span>';
    
    if (id === 'pv-mppt') {
      livePower = formatPower(d.solarDcW);
      liveCurrent = (d.solarDcW / 94.2).toFixed(1) + ' A';
      statusBadge = d.solarDcW > 0 ? '<span class="tag green">توليد نشط</span>' : '<span class="tag muted">غياب الشمس</span>';
    } else if (id === 'battery-inverter') {
      livePower = formatPower(d.batterySupplyW);
      liveCurrent = (d.batterySupplyW / 48).toFixed(1) + ' A';
      statusBadge = !state.gridAvailable ? '<span class="tag orange">تفريغ طارئ للعاكس</span>' : (d.batterySupplyW > 0 ? '<span class="tag green">تفريغ نشط</span>' : '<span class="tag blue">استعداد / شحن</span>');
    } else if (id === 'grid-ats') {
      livePower = formatPower(d.gridSupplyW);
      liveCurrent = (d.gridSupplyW / 230).toFixed(1) + ' A';
      statusBadge = state.gridAvailable ? '<span class="tag green">متاحة ومستقرة</span>' : '<span class="tag red">منقطعة (معزولة)</span>';
    } else if (id === 'inverter-ats' || id === 'ats-icu') {
      livePower = formatPower(d.loadW);
      liveCurrent = (d.loadW / 230).toFixed(1) + ' A';
    } else if (id.startsWith('branch-')) {
      const devId = id.replace('branch-', '');
      const dev = state.devices.find(x => x.id === devId);
      if (dev) {
        livePower = (dev.on ? dev.watts : 0) + ' W';
        liveCurrent = ((dev.on ? dev.watts : 0) / 230).toFixed(2) + ' A';
        statusBadge = dev.on ? '<span class="tag green">يغذي الجهاز</span>' : '<span class="tag muted">متوقف</span>';
      }
    }

    return `<div class="inspector-hero" style="border-right:4px solid var(--green)">
      <div class="inspector-icon" style="background:#13332e;color:#33d6a6">⚡</div>
      <span class="tag blue">${cable.category}</span>
      <h2 class="inspector-title" style="margin-top:10px">${cable.title}</h2>
      <div class="inspector-en">${cable.en}</div>
      <div class="inspector-desc">${cable.description}</div>
    </div>
    <section class="panel">
      <div class="panel-heading"><h3 class="panel-title">المواصفات الكهربائية والهندسية</h3>${statusBadge}</div>
      <div class="spec-list">
        <div class="spec-row"><span>المعيار القياسي</span><strong class="mono">${cable.standard}</strong></div>
        <div class="spec-row"><span>الجهد الاسمي</span><strong class="mono">${cable.voltage}</strong></div>
        <div class="spec-row"><span>القدرة اللحظية المنقولة</span><strong class="mono strong-green">${livePower}</strong></div>
        <div class="spec-row"><span>التيار اللحظي المقدر</span><strong class="mono">${liveCurrent}</strong></div>
        <div class="spec-row"><span>نوع العزل والغلاف</span><strong>${cable.insulation}</strong></div>
        <div class="spec-row"><span>وسيلة الحماية</span><strong>${cable.protection}</strong></div>
      </div>
      <div class="safety-note"><strong>معيار الأمان الطبي:</strong> ممدد على حوامل كابلات معدنية مجلفنة ومؤرضة مع عوازل مقاومة للهب وانخفاض انبعاث الدخان (LSZH) لضمان حماية أجهزة العناية المركزة والمرضى.</div>
    </section>`;
  }
  const component = COMPONENTS.find(c => c.id === id);
  const device = DEVICES.find(d => d.id === id);
  if (device) {
    return `<div class="inspector-hero"><div class="inspector-icon">${deviceIcon(device.id)}</div><div class="tag blue">جهاز طبي · ${device.on?'نشط':'متوقف'}</div><h2 class="inspector-title" style="margin-top:10px">${device.name}</h2><div class="inspector-en">${device.en}</div><div class="inspector-desc">جهاز ضمن أحمال العناية المركزة في النموذج التعليمي. قيمة القدرة هي قيمة افتراضية مأخوذة من دراسة المشروع وليست مواصفة مؤكدة لكل طراز.</div></div><section class="panel"><div class="panel-heading"><h3 class="panel-title">معلومات الجهاز</h3><span class="tag muted">LOAD</span></div><div class="spec-list"><div class="spec-row"><span>القدرة الافتراضية</span><strong class="mono">${device.watts} W</strong></div><div class="spec-row"><span>الحالة الحالية</span><strong>${device.on?'قيد التشغيل':'متوقف'}</strong></div><div class="spec-row"><span>مساهمة الحمل</span><strong>${device.on?device.watts:0} W</strong></div></div><div class="safety-note">قبل تصميم الطاقة الاحتياطية، تحقّق من بيانات لوحة الجهاز، الاستهلاك الأقصى، تيار بدء التشغيل، ومتطلبات التشغيل الاحتياطي للرعاية الحرجة.</div></section>`;
  }
  const c = component || COMPONENTS[0];
  return `<div class="inspector-hero"><div class="inspector-icon">${componentIcon(c.id)}</div><span class="tag blue">${c.family}</span><h2 class="inspector-title" style="margin-top:10px">${c.name}</h2><div class="inspector-en">${c.en}</div><div class="inspector-desc">${c.description}</div></div><section class="panel"><div class="panel-heading"><h3 class="panel-title">المواصفات الأساسية</h3><span class="tag muted">REFERENCE</span></div><div class="spec-list">${c.specs.map(([k,v])=>`<div class="spec-row"><span>${k}</span><strong>${v}</strong></div>`).join('')}</div><div class="safety-note"><strong>ملاحظة هندسية:</strong> ${c.safety}</div></section>`;
}

function labPage() {
  const d = derived();
  const stepIdx = world?.tourIndex || 0;
  const currentStep = TOUR_STEPS[stepIdx] || TOUR_STEPS[0];
  return `
    <div class="lab-expansive-wrapper">
      <!-- 100% Unobstructed Widescreen 3D Canvas -->
      <div class="expansive-canvas-container" id="scene-container">
        
        <!-- Ultra-Slim Live Status Ribbon (At Top of 3D Canvas) -->
        <div class="canvas-top-ribbon" data-action="toggle-mobile-hud">
          <span class="ribbon-chip"><i class="hud-chip-dot ${d.unmetLoadW > 1 ? 'red' : 'green'}"></i> <span class="m-chip-lbl">الحمل الطبي:</span> <strong class="mono" id="m-glass-load">${formatPower(d.loadW)}</strong></span>
          <span class="ribbon-chip" style="color:var(--orange)">☀️ <span class="m-chip-lbl">الألواح:</span> <strong class="mono" id="m-glass-solar">${formatPower(d.solarDcW)}</strong></span>
          <span class="ribbon-chip" style="color:var(--green)">🔋 <span class="m-chip-lbl">البطارية:</span> <strong class="mono" id="m-glass-soc">${Math.round(state.soc)}%</strong></span>
          <span class="ribbon-chip" id="m-glass-grid-status" style="color:${state.gridAvailable ? 'var(--green)' : 'var(--red)'}">${state.gridAvailable ? '🟢 الشبكة متاحة' : '🔴 الشبكة منقطعة'}</span>
          <button class="ribbon-tour-btn" data-action="toggle-tour" title="تشغيل الجولة السينمائية">🎬 جولة ثلاثية الأبعاد</button>
        </div>

        <!-- Mobile Floating Action Button Dock (Right Side of Canvas) -->
        <div class="mobile-fab-dock">
          <button class="mobile-fab-btn" data-action="open-mobile-controls" title="التحكم والسيناريوهات">
            <span class="fab-icon">⚙️</span>
            <span class="fab-label">التحكم</span>
          </button>
          <button class="mobile-fab-btn" data-action="toggle-tour" title="الجولة السينمائية">
            <span class="fab-icon">🎬</span>
            <span class="fab-label">الجولة</span>
          </button>
          <button class="mobile-fab-btn" data-action="open-mobile-cables" title="شبكة الكابلات والتوصيل">
            <span class="fab-icon">⚡</span>
            <span class="fab-label">الكابلات</span>
          </button>
          <button class="mobile-fab-btn" data-action="fullscreen" title="ملء الشاشة">
            <span class="fab-icon">⛶</span>
            <span class="fab-label">شاشة</span>
          </button>
        </div>

        <!-- Compact Bottom Floating Camera Toolbar -->
        <div class="canvas-floating-toolbar">
          <span class="cam-dock-label">الكاميرا:</span>
          <button class="cam-dock-btn" data-action="view-overview" title="نظرة عامة شاملة">⌖ عامة</button>
          <button class="cam-dock-btn" data-action="view-power" title="محطة الطاقة">☼ محطة الطاقة</button>
          <button class="cam-dock-btn" data-action="view-medical" title="جناح العناية">🫁 العناية</button>
          <button class="cam-dock-btn" data-action="view-top" title="مسقط علوي">⇧ علوي</button>
          <button class="cam-dock-btn" data-action="connections" title="إظهار أو إخفاء مسارات الأسلاك">${state.showConnections ? 'مسارات: مفعّلة' : 'مسارات: مخفية'}</button>
          <button class="cam-dock-btn" data-action="fullscreen" title="ملء الشاشة">⛶</button>
        </div>

        <!-- Live Event Flash Badge (Appears when any event occurs) -->
        <div class="glass-event-pill hidden" id="glass-event-pill">
          <span class="event-icon" id="event-icon">⚡</span>
          <div class="event-body">
            <strong id="event-title">حدث في المنظومة</strong>
            <p id="event-desc">تفاصيل الحدث...</p>
          </div>
          <button class="close-pill-btn" data-action="close-event">✕</button>
        </div>

        <!-- Floating Interactive Component Explainer Glass Card (Hidden by default, opens on 3D click) -->
        <div class="glass-card glass-explainer-card hidden" id="glass-explainer">
          <div class="glass-card-header">
            <div style="display:flex;align-items:center;gap:8px">
              <span class="g-icon">🔍</span>
              <strong id="explainer-heading">الشرح الهندسي التفاعلي</strong>
            </div>
            <button class="sheet-close-btn" data-action="close-desktop-explainer" title="إغلاق الشرح" style="width:24px;height:24px;font-size:11px">✕</button>
          </div>
          <div class="explainer-content" id="explainer-content">
            ${componentInspectorHTML()}
          </div>
        </div>

        <!-- Guided Tour Player (Hidden by default, opens via button) -->
        <div class="glass-card glass-tour-player hidden" id="glass-tour">
          <div class="tour-top-bar">
            <div class="tour-badge">
              <span class="tour-rec-dot"></span>
              <span>الجولة السينمائية · مشهد <span id="caption-step-num">${stepIdx + 1}</span> من ${TOUR_STEPS.length}</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px">
              <div class="tour-timecode mono" id="tour-timecode">${currentStep.timeCode}</div>
              <button class="sheet-close-btn" data-action="toggle-tour" title="إغلاق الجولة" style="width:26px;height:26px;font-size:12px;border-radius:50%;cursor:pointer">✕</button>
            </div>
          </div>
          <div class="video-timeline" id="tour-timeline">
            ${TOUR_STEPS.map((s, idx) => `<div class="timeline-step ${idx === stepIdx ? 'active' : idx < stepIdx ? 'completed' : ''}" data-tour-step="${idx}" title="${s.title}"></div>`).join('')}
          </div>
          <div class="tour-body-row">
            <div class="tour-btns">
              <button class="play-tour-btn ${world?.tourPlaying ? 'active' : ''}" id="tour-play-btn" data-action="tour-play">
                ${world?.tourPlaying ? '⏸ إيقاف' : '▶ تشغيل الجولة'}
              </button>
              <button class="secondary-btn small-btn" data-action="tour-prev">السابق</button>
              <button class="secondary-btn small-btn" data-action="tour-next">التالي ▷</button>
              <button class="soft-btn small-btn ${world?.voiceEnabled ? 'strong-green' : ''}" id="tour-voice-btn" data-action="tour-voice">
                ${world?.voiceEnabled ? '🔊 صوت مفعّل' : '🔇 تشغيل الصوت'}
              </button>
            </div>
            <div class="tour-narration-caption">
              <strong id="caption-title">${currentStep.title}</strong>
              <span class="caption-en" id="caption-en">(${currentStep.en})</span>
              <p id="caption-text">${currentStep.narration}</p>
            </div>
          </div>
        </div>

      </div>

      <!-- ==========================================================================
           Dedicated Mission Control Section Below Canvas (NEVER Covers the 3D World!)
           ========================================================================== -->
      <div class="lab-mission-control-section">
        <!-- Interactive Cable Selector Bar -->
        <div class="panel glass-panel" style="padding:14px 18px;margin-bottom:16px">
          <div class="legend-header" style="border:none;padding:0;margin-bottom:10px">
            <span class="legend-icon">⚡</span>
            <strong style="color:#d8e8f8;font-size:13.5px">شبكة التمديدات والكابلات الكهربائية (انقر لتسليط الضوء وفحص المسار في المشهد 3D):</strong>
          </div>
          <div class="legend-items-row">
            <button class="legend-item-btn" data-inspect="pv-mppt" title="فحص كابل الألواح"><i class="key-swatch" style="--key:#38bdf8"></i> <span>DC شمسي (6mm²)</span></button>
            <button class="legend-item-btn" data-inspect="mppt-battery" title="فحص ناقل شحن البطارية"><i class="key-swatch" style="--key:#10b981"></i> <span>DC شحن (35mm²)</span></button>
            <button class="legend-item-btn" data-inspect="battery-inverter" title="فحص ناقل البطارية للعاكس"><i class="key-swatch" style="--key:#f59e0b"></i> <span>DC تفريغ (70mm²)</span></button>
            <button class="legend-item-btn" data-inspect="inverter-ats" title="فحص خرج العاكس"><i class="key-swatch" style="--key:#10b981"></i> <span>AC عاكس (4mm²)</span></button>
            <button class="legend-item-btn" data-inspect="grid-ats" title="فحص كابل الشبكة"><i class="key-swatch" style="--key:#2563eb"></i> <span>AC شبكة (6mm²)</span></button>
            <button class="legend-item-btn" data-inspect="ats-icu" title="فحص كابل العناية المركزة"><i class="key-swatch" style="--key:#00f5b8"></i> <span>AC عناية IPS (6mm²)</span></button>
          </div>
        </div>

        <div class="grid two-col" style="margin-bottom:16px">
          <!-- 1. Live Energy Flow HUD Panel (مؤشرات تدفق الطاقة) -->
          <section class="panel glass-panel" id="glass-hud">
            <div class="panel-heading">
              <div style="display:flex;align-items:center;gap:10px">
                <span class="glass-dot-live"></span>
                <div>
                  <h2 class="panel-title">مؤشرات تدفق الطاقة الحية</h2>
                  <p class="panel-subtitle">مراقبة فورية للقدرة الكهربائية وتوزيع مصادر التغذية</p>
                </div>
              </div>
              <span class="tag ${d.unmetLoadW > 1 ? 'red' : 'green'}" id="glass-status-tag">${d.unmetLoadW > 1 ? 'عجز تغذية' : 'تغذية مستقرة'}</span>
            </div>
            <div class="grid" style="grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
              <div class="glass-metric-item">
                <span class="g-label">الحمل الطبي الكلي</span>
                <strong class="g-val mono" id="glass-load">${formatPower(d.loadW)}</strong>
              </div>
              <div class="glass-metric-item">
                <span class="g-label">توليد الألواح (DC)</span>
                <strong class="g-val mono" style="color:var(--orange)" id="glass-solar">${formatPower(d.solarDcW)}</strong>
              </div>
              <div class="glass-metric-item">
                <span class="g-label">بنك البطاريات (SOC)</span>
                <strong class="g-val mono" style="color:var(--green)" id="glass-soc">${Math.round(state.soc)}%</strong>
              </div>
              <div class="glass-metric-item">
                <span class="g-label">الشبكة العامة</span>
                <strong class="g-val" id="glass-grid-status" style="color:${state.gridAvailable ? 'var(--green)' : 'var(--red)'}">${state.gridAvailable ? 'متاحة 🟢' : 'منقطعة 🔴'}</strong>
              </div>
            </div>
            <div class="glass-autonomy-line">
              <span>زمن استقلالية البطارية عند انقطاع الشبكة:</span>
              <strong class="mono" id="glass-autonomy">${formatDuration(calculatePower({...state, gridAvailable:false}).autonomyHours)}</strong>
            </div>
          </section>

          <!-- 2. Operational Scenarios & Controls Panel (السيناريوهات والتحكم) -->
          <section class="panel glass-panel" id="glass-controls">
            <div class="panel-heading">
              <div style="display:flex;align-items:center;gap:10px">
                <span class="g-icon" style="font-size:20px">⚙️</span>
                <div>
                  <h2 class="panel-title">السيناريوهات التشغيلية والتحكم</h2>
                  <p class="panel-subtitle">تطبيق حالات التشغيل الميدانية وضبط الإشعاع والشبكة</p>
                </div>
              </div>
              <span class="tag green">LIVE</span>
            </div>
            
            <div class="glass-scenario-btns" style="margin-bottom:12px">
              <button class="glass-btn" data-scenario="solar-peak" title="يوم مشمس وذروة الإنتاج">☀️ شمس ساطعة</button>
              <button class="glass-btn" data-scenario="outage-day" title="انقطاع الشبكة نهاراً">⚡ انقطاع الشبكة</button>
              <button class="glass-btn" data-scenario="night-discharge" title="تفريغ ليلي للبطارية">🌙 تفريغ ليلي</button>
              <button class="glass-btn" data-scenario="heavy-load" title="أقصى استهلاك طبي">🚨 استهلاك أقصى</button>
            </div>

            <div class="glass-action-row" style="margin-bottom:12px">
              <button class="glass-action-btn ${state.gridAvailable ? 'danger' : 'success'}" data-action="grid-toggle">
                ${state.gridAvailable ? '⚡ محاكاة انقطاع الشبكة العامة (ATS)' : '↻ إعادة تغذية الشبكة العامة'}
              </button>
            </div>

            <div class="glass-slider-row" style="margin-bottom:0">
              <div class="slider-head">
                <span>الإشعاع الشمسي (Solar Irradiance):</span>
                <span class="mono" id="glass-irr-val">${state.irradiance}%</span>
              </div>
              <input class="range" type="range" min="0" max="100" value="${state.irradiance}" data-input="irradiance">
              <div class="glass-preset-pills">
                <button class="pill-btn" data-set-irr="0">0% ليل</button>
                <button class="pill-btn" data-set-irr="50">50% غائم</button>
                <button class="pill-btn" data-set-irr="100">100% ذروة</button>
              </div>
            </div>
          </section>
        </div>
      </div>

      <!-- ==========================================
           Mobile Sliding Bottom Sheets (Modals)
           ========================================== -->

      <!-- 1. Mobile Controls Bottom Sheet -->
      <div class="mobile-sheet-backdrop hidden" id="mobile-controls-backdrop" data-action="close-mobile-controls"></div>
      <div class="mobile-bottom-sheet hidden" id="mobile-controls-sheet">
        <div class="sheet-drag-handle"></div>
        <div class="sheet-header">
          <div class="sheet-title">
            <span class="sheet-icon">⚙️</span>
            <strong>التحكم والسيناريوهات التشغيلية</strong>
          </div>
          <button class="sheet-close-btn" data-action="close-mobile-controls">✕</button>
        </div>
        <div class="sheet-body">
          <div class="sheet-section-title">سيناريوهات الاختبار السريعة</div>
          <div class="glass-scenario-btns">
            <button class="glass-btn small-btn" data-scenario="solar-peak">☀️ شمس ساطعة</button>
            <button class="glass-btn small-btn" data-scenario="outage-day">⚡ انقطاع الشبكة</button>
            <button class="glass-btn small-btn" data-scenario="night-discharge">🌙 تفريغ ليلي</button>
            <button class="glass-btn small-btn" data-scenario="heavy-load">🚨 استهلاك أقصى</button>
          </div>
          
          <div class="glass-action-row" style="margin-top:10px">
            <button class="glass-action-btn ${state.gridAvailable ? 'danger' : 'success'}" data-action="grid-toggle">
              ${state.gridAvailable ? '⚡ محاكاة انقطاع الشبكة العامة (ATS)' : '↻ إعادة تغذية الشبكة العامة'}
            </button>
          </div>

          <div class="glass-slider-row" style="margin-top:10px">
            <div class="slider-head">
              <span>الإشعاع الشمسي (Solar Irradiance):</span>
              <span class="mono" id="m-glass-irr-val">${state.irradiance}%</span>
            </div>
            <input class="range" type="range" min="0" max="100" value="${state.irradiance}" data-input="irradiance">
            <div class="glass-preset-pills">
              <button class="pill-btn" data-set-irr="0">0% ليل</button>
              <button class="pill-btn" data-set-irr="50">50% غائم</button>
              <button class="pill-btn" data-set-irr="100">100% ذروة</button>
            </div>
          </div>

          <div class="sheet-section-title" style="margin-top:12px">زوايا الكاميرا المسبقة</div>
          <div class="glass-camera-toolbar" style="border:none;padding:0">
            <button class="glass-cam-btn" data-action="view-overview">⌖ عامة</button>
            <button class="glass-cam-btn" data-action="view-power">☼ محطة الطاقة</button>
            <button class="glass-cam-btn" data-action="view-medical">🫁 العناية</button>
            <button class="glass-cam-btn" data-action="view-top">⇧ مسقط علوي</button>
            <button class="glass-cam-btn" data-action="connections">${state.showConnections ? 'مسارات: مفعّلة' : 'مسارات: مخفية'}</button>
          </div>
        </div>
      </div>

      <!-- 2. Mobile Energy Breakdown Sheet -->
      <div class="mobile-sheet-backdrop hidden" id="mobile-hud-backdrop" data-action="close-mobile-hud"></div>
      <div class="mobile-bottom-sheet hidden" id="mobile-hud-sheet">
        <div class="sheet-drag-handle"></div>
        <div class="sheet-header">
          <div class="sheet-title">
            <span class="glass-dot-live"></span>
            <strong>تفاصيل تدفق الطاقة والاستقلالية</strong>
          </div>
          <button class="sheet-close-btn" data-action="close-mobile-hud">✕</button>
        </div>
        <div class="sheet-body">
          <div class="glass-metric-row">
            <div class="glass-metric-item">
              <span class="g-label">الحمل الطبي الكلي</span>
              <strong class="g-val mono" id="m-sheet-load">${formatPower(d.loadW)}</strong>
            </div>
            <div class="glass-metric-item">
              <span class="g-label">توليد الألواح (DC)</span>
              <strong class="g-val mono" style="color:var(--orange)" id="m-sheet-solar">${formatPower(d.solarDcW)}</strong>
            </div>
          </div>
          <div class="glass-metric-row">
            <div class="glass-metric-item">
              <span class="g-label">شحن البطارية (SOC)</span>
              <strong class="g-val mono" style="color:var(--green)" id="m-sheet-soc">${Math.round(state.soc)}%</strong>
            </div>
            <div class="glass-metric-item">
              <span class="g-label">الشبكة العامة</span>
              <strong class="g-val" id="m-sheet-grid">${state.gridAvailable ? 'متاحة 🟢' : 'منقطعة 🔴'}</strong>
            </div>
          </div>
          <div class="glass-autonomy-line" style="margin-top:8px">
            <span>زمن استقلالية البطارية عند الانقطاع:</span>
            <strong class="mono" id="m-sheet-autonomy" style="color:#5ce2ba">${formatDuration(calculatePower({...state, gridAvailable:false}).autonomyHours)}</strong>
          </div>
          <div class="glass-autonomy-line" style="margin-top:6px">
            <span>حالة التغذية الإجمالية:</span>
            <span class="tag ${d.unmetLoadW > 1 ? 'red' : 'green'}" id="m-sheet-status-tag">${d.unmetLoadW > 1 ? 'عجز تغذية' : 'تغذية مستقرة 100%'}</span>
          </div>
        </div>
      </div>

      <!-- 3. Mobile Cables Selector Sheet -->
      <div class="mobile-sheet-backdrop hidden" id="mobile-cables-backdrop" data-action="close-mobile-cables"></div>
      <div class="mobile-bottom-sheet hidden" id="mobile-cables-sheet">
        <div class="sheet-drag-handle"></div>
        <div class="sheet-header">
          <div class="sheet-title">
            <span class="sheet-icon">⚡</span>
            <strong>فحص مسارات الكابلات والتوصيلات</strong>
          </div>
          <button class="sheet-close-btn" data-action="close-mobile-cables">✕</button>
        </div>
        <div class="sheet-body">
          <p class="tiny-note" style="margin-bottom:10px">اختر أي مسار كهربائي لتسليط الضوء عليه في المشهد ثلاثي الأبعاد وعرض مواصفاته الهندسية:</p>
          <div class="mobile-cables-list">
            <button class="mobile-cable-tile" data-inspect="pv-mppt">
              <span class="cable-dot" style="background:#38bdf8"></span>
              <div class="cable-info"><strong>كابل الألواح الشمسية (PV String)</strong><small>DC 94.2V · 6mm² LSZH عزل مزدوج</small></div>
              <span class="cable-arrow">←</span>
            </button>
            <button class="mobile-cable-tile" data-inspect="mppt-battery">
              <span class="cable-dot" style="background:#10b981"></span>
              <div class="cable-info"><strong>ناقل شحن البطارية (Charge Bus)</strong><small>DC 48V / 80A · 35mm² مرن عالي التحمل</small></div>
              <span class="cable-arrow">←</span>
            </button>
            <button class="mobile-cable-tile" data-inspect="battery-inverter">
              <span class="cable-dot" style="background:#f59e0b"></span>
              <div class="cable-info"><strong>ناقل تفريغ البطارية للعاكس (Heavy Bus)</strong><small>DC 48V / 200A · 70mm² نحاس معزول</small></div>
              <span class="cable-arrow">←</span>
            </button>
            <button class="mobile-cable-tile" data-inspect="inverter-ats">
              <span class="cable-dot" style="background:#10b981"></span>
              <div class="cable-info"><strong>خرج العاكس لمفتاح ATS (Source B)</strong><small>AC 230V موجة جيبية نقية · 4mm²</small></div>
              <span class="cable-arrow">←</span>
            </button>
            <button class="mobile-cable-tile" data-inspect="grid-ats">
              <span class="cable-dot" style="background:#38bdf8"></span>
              <div class="cable-info"><strong>تغذية الشبكة العامة (Source A)</strong><small>AC 230V / 32A · 6mm² NYY-J مدرع</small></div>
              <span class="cable-arrow">←</span>
            </button>
            <button class="mobile-cable-tile" data-inspect="ats-icu">
              <span class="cable-dot" style="background:#00f5b8"></span>
              <div class="cable-info"><strong>خط العناية المركزة الرئيسي (IPS Trunk)</strong><small>AC 230V معزول IT System · 6mm² LSZH</small></div>
              <span class="cable-arrow">←</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 4. Mobile Interactive Object Explainer Sheet -->
      <div class="mobile-sheet-backdrop hidden" id="mobile-explainer-backdrop" data-action="close-mobile-explainer"></div>
      <div class="mobile-bottom-sheet hidden" id="mobile-explainer-sheet">
        <div class="sheet-drag-handle"></div>
        <div class="sheet-header">
          <div class="sheet-title">
            <span class="sheet-icon">🔍</span>
            <strong id="m-explainer-heading">تفاصيل المكوّن المختار</strong>
          </div>
          <button class="sheet-close-btn" data-action="close-mobile-explainer">✕</button>
        </div>
        <div class="sheet-body" id="m-explainer-content">
          ${componentInspectorHTML()}
        </div>
      </div>
      </div>

      <!-- Operational Section Below Canvas: Medical Loads & Power Analysis -->
      <div class="lab-bottom-section">
        <div class="grid two-col">
          <!-- Direct Medical Device Toggles -->
          <section class="panel glass-panel">
            <div class="panel-heading">
              <div>
                <h2 class="panel-title">الأجهزة الطبية في وحدة العناية المركزة</h2>
                <p class="panel-subtitle">بدّل تشغيل الأجهزة لمشاهدة استجابة أسلاك التغذية ومسارات الطاقة في المشهد 3D فورياً</p>
              </div>
              <div class="panel-actions">
                <button class="secondary-btn small-btn" data-action="all-on">تشغيل الكل</button>
                <button class="secondary-btn small-btn" data-action="all-off">إيقاف الكل</button>
              </div>
            </div>
            <div class="load-list">
              ${deviceMiniRows(true)}
            </div>
          </section>

          <!-- Real-time Energy Balance & Distribution Analysis -->
          <section class="panel glass-panel">
            <div class="panel-heading">
              <div>
                <h2 class="panel-title">توازن وتوزيع القدرة الكهربائية</h2>
                <p class="panel-subtitle">تحليل فوري لكيفية تغطية أحمال العناية المركزة من المصادر الثلاثة</p>
              </div>
              <span class="tag ${d.unmetLoadW > 1 ? 'red' : 'green'}">${d.unmetLoadW > 1 ? 'عجز في القدرة' : 'الحمل مغطّى بالكامل'}</span>
            </div>
            <div class="chart-wrap"><canvas id="energy-chart" aria-label="رسم توضيحي لتوازن الطاقة"></canvas></div>
            <div class="chart-axis"><span>PV</span><span>Battery</span><span>Grid</span><span>Load</span></div>
            <div class="divider"></div>
            <div class="control-grid">
              <div class="control-tile"><span class="tiny">الشمس إلى الحمل</span><strong id="lab-solar-load">${formatPower(d.solarToLoadW)}</strong></div>
              <div class="control-tile"><span class="tiny">البطارية إلى الحمل</span><strong id="lab-battery-load">${formatPower(d.batterySupplyW)}</strong></div>
              <div class="control-tile"><span class="tiny">الشبكة إلى الحمل</span><strong id="lab-grid-load">${formatPower(d.gridSupplyW)}</strong></div>
              <div class="control-tile"><span class="tiny">القدرة غير المغطاة</span><strong id="lab-unmet-val">${formatPower(d.unmetLoadW)}</strong></div>
            </div>
          </section>
        </div>
      </div>
    </div>
    ${footer()}`;
}

function componentsPage() {
  return `${pageHeader('COMPONENT LIBRARY & EXPLANATIONS', 'المكوّنات والشروحات الهندسية', 'دليل شامل لكل مكون من مكونات المنظومة مع الوظيفة، المواصفات الفنية المرجعية، وشروحات الأجهزة الطبية واحتياطات السلامة.', '<span class="tag blue">7 مكوّنات رئيسية</span><span class="tag green">7 أحمال طبية</span>')}
    ${cautionBanner()}
    <div class="grid component-grid">${COMPONENTS.map(c=>`<article class="component-card">
      <div class="component-card-top">
        <div class="component-icon">${componentIcon(c.id)}</div>
        <span class="component-rating">${c.rating}</span>
      </div>
      <div>
        <h3>${c.name}</h3>
        <div class="component-en">${c.en}</div>
      </div>
      <p>${c.description}</p>
      <div class="spec-pill-list">${c.specs.slice(0,3).map(([k,v])=>`<span class="spec-pill">${k}: ${v}</span>`).join('')}</div>
      <button class="primary-btn small-btn" data-inspect="${c.id}">عرض في العالم ثلاثي الأبعاد ↗</button>
    </article>`).join('')}</div>
    <div class="grid two-col" style="margin-top:17px">
      <section class="panel">
        <div class="panel-heading">
          <div><h2 class="panel-title">الأجهزة الطبية في وحدة العناية المركزة</h2><p class="panel-subtitle">الأحمال الكهربائية للأجهزة الحرجة المعتمدة في المشروع</p></div>
          <span class="tag muted">ICU LOADS</span>
        </div>
        <div class="load-list">${deviceMiniRows(false)}</div>
        <p class="tiny-note">الأحمال الطبية المذكورة مأخوذة من الدراسة المرجعية للمشروع. في التصاميم الواقعية يجب حساب تيارات البدء (Inrush currents) ومعامل القدرة (Power factor) لكل جهاز طبي.</p>
      </section>
      <section class="panel">
        <div class="panel-heading">
          <div><h2 class="panel-title">المواصفات الكلية للمنظومة</h2><p class="panel-subtitle">القيم المرجعية لمنظومة الطاقة الاحتياطية</p></div>
        </div>
        <div class="status-line"><span>القدرة الاسمية للألواح (PV Array)</span><strong class="mono">2400 Wp (6 × 400W)</strong></div>
        <div class="status-line"><span>كفاءة منظم الشحن MPPT</span><strong class="mono">97%</strong></div>
        <div class="status-line"><span>كفاءة العاكس (Inverter)</span><strong class="mono">94% Pure Sine</strong></div>
        <div class="status-line"><span>سعة بنك البطاريات الكلية</span><strong class="mono">9.6 kWh (48V / 200Ah)</strong></div>
        <div class="status-line"><span>القدرة القصوى للعاكس</span><strong class="mono">2000 W مستمر</strong></div>
        <div class="status-line"><span>زمن التحويل التلقائي (ATS)</span><strong class="mono">&lt; 10 ms</strong></div>
        <button class="primary-btn" style="width:100%;margin-top:16px" data-page="lab">فتح المشهد ثلاثي الأبعاد ↗</button>
      </section>
    </div>
    ${footer()}`;
}

function footer() {
  return `<footer class="footer"><span>ICU Power Lab 3D · مشروع تخرج / مختبر تعليمي</span><span>جامعة المعارف — كلية الهندسة التقنية — قسم هندسة تقنيات الأجهزة الطبية</span></footer>`;
}

function syncTourUI(stepIndex, stepData, isPlaying) {
  const playBtn = document.querySelector('#tour-play-btn');
  if (playBtn) {
    playBtn.textContent = isPlaying ? '⏸ إيقاف مؤقت' : '▶ تشغيل جولة الفيديو';
    playBtn.classList.toggle('active', isPlaying);
  }

  const voiceBtn = document.querySelector('#tour-voice-btn');
  if (voiceBtn && world) {
    voiceBtn.textContent = world.voiceEnabled ? '🔊 الصوت مفعّل' : '🔇 تشغيل الصوت';
    voiceBtn.classList.toggle('strong-green', world.voiceEnabled);
  }

  const timelineSteps = document.querySelectorAll('.timeline-step');
  timelineSteps.forEach((el, idx) => {
    el.classList.toggle('active', idx === stepIndex);
    el.classList.toggle('completed', idx < stepIndex);
  });

  const timecode = document.querySelector('#tour-timecode');
  if (timecode && stepData) timecode.textContent = stepData.timeCode;

  const captionStepNum = document.querySelector('#caption-step-num');
  if (captionStepNum) captionStepNum.textContent = `${stepIndex + 1}`;

  const captionTimeTag = document.querySelector('#caption-time-tag');
  if (captionTimeTag && stepData) captionTimeTag.textContent = stepData.timeCode;

  const captionTitle = document.querySelector('#caption-title');
  if (captionTitle && stepData) captionTitle.textContent = stepData.title;

  const captionEn = document.querySelector('#caption-en');
  if (captionEn && stepData) captionEn.textContent = stepData.en;

  const captionText = document.querySelector('#caption-text');
  if (captionText && stepData) captionText.textContent = stepData.narration;
}

function renderPage() {
  if (world) { world.dispose(); world = null; }
  const view = document.querySelector('#page-view');
  const renderers = { lab: labPage, home: dashboardPage, components: componentsPage };
  view.innerHTML = (renderers[state.page] || labPage)();
  
  document.querySelectorAll('[data-page]').forEach(el => el.classList.toggle('active', el.dataset.page === state.page));
  document.querySelectorAll('.mobile-nav-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.page === state.page));
  document.querySelectorAll('.top-nav-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.page === state.page));

  const appShell = document.querySelector('#app-shell');
  if (appShell) appShell.classList.toggle('fullwidth-lab-shell', state.page === 'lab');

  const layout = document.querySelector('.layout');
  if (layout) layout.classList.toggle('fullwidth-layout', state.page === 'lab');

  const sidebar = document.querySelector('.sidebar');
  if (sidebar) sidebar.classList.toggle('lab-hidden', state.page === 'lab');

  const mainContent = document.querySelector('.main-content');
  if (mainContent) mainContent.classList.toggle('expansive-main', state.page === 'lab');

  if (state.page === 'lab') {
    const container = document.querySelector('#scene-container');
    world = new EnergyWorld3D(container, {
      onSelect: (id, type) => {
        state.selectedId = id; state.selectedType = type;
        const inspector = document.querySelector('#explainer-content') || document.querySelector('#component-inspector');
        if (inspector) inspector.innerHTML = componentInspectorHTML(id);
        const heading = document.querySelector('#explainer-heading');
        if (heading) heading.textContent = `الشرح: ${getObjectName(id)}`;

        const mInspector = document.querySelector('#m-explainer-content');
        if (mInspector) mInspector.innerHTML = componentInspectorHTML(id);
        const mHeading = document.querySelector('#m-explainer-heading');
        if (mHeading) mHeading.textContent = `${getObjectName(id)}`;

        if (window.innerWidth <= 860) {
          document.querySelector('#mobile-explainer-sheet')?.classList.remove('hidden');
          document.querySelector('#mobile-explainer-backdrop')?.classList.remove('hidden');
        } else {
          document.querySelector('#glass-explainer')?.classList.remove('hidden');
        }
      },
      onTourChange: (stepIndex, stepData, isPlaying) => {
        syncTourUI(stepIndex, stepData, isPlaying);
        if (stepData.action === 'grid-toggle') {
          state.gridAvailable = false;
          syncLiveUI();
        }
      },
      onEvent: (eventType, eventData) => {
        showEventPill(eventData.title, eventData.message);
      }
    });
    world.setConnectionsVisible(state.showConnections);
    world.updateState({ ...derived(), irradiance: state.irradiance, soc: state.soc, gridAvailable: state.gridAvailable, devices: state.devices });
    world.select(state.selectedId);
    syncTourUI(world.tourIndex, TOUR_STEPS[world.tourIndex], world.tourPlaying);
  }
  drawChart();
  syncLiveUI();
}

function handleClick(event) {
  const setIrr = event.target.closest('[data-set-irr]')?.dataset.setIrr;
  if (setIrr !== undefined) {
    state.irradiance = Number(setIrr);
    syncLiveUI();
    showEventPill(`☀️ ضبط الإشعاع الشمسي: ${setIrr}%`, `تم تغيير شدة الإشعاع الشمسي إلى ${setIrr}%. تم تحديث توليد الألواح وتدفق تيار DC إلى منظم MPPT فورياً.`);
    return;
  }
  const presetIrr = event.target.closest('[data-preset-irr]')?.dataset.presetIrr;
  if (presetIrr !== undefined) {
    state.irradiance = Number(presetIrr);
    syncLiveUI();
    showEventPill(`☀️ تعديل الإشعاع: ${state.irradiance}%`, `تم ضبط الإشعاع الشمسي على ${state.irradiance}% لاختبار توليد المنظومة.`);
    return;
  }
  const presetSoc = event.target.closest('[data-preset-soc]')?.dataset.presetSoc;
  if (presetSoc !== undefined) {
    state.soc = Number(presetSoc);
    syncLiveUI();
    showEventPill(`🔋 تعديل شحن البطارية: ${state.soc}%`, `تم ضبط نسبة شحن بنك البطاريات على ${state.soc}% لاختبار استقلالية المنظومة.`);
    return;
  }

  const pageButton = event.target.closest('[data-page]');
  if (pageButton) {
    const next = pageButton.dataset.page;
    if (next && next !== state.page) { state.page = next; renderPage(); }
    return;
  }
  const timelineStep = event.target.closest('[data-tour-step]');
  if (timelineStep && world) {
    world.goToTourStep(Number(timelineStep.dataset.tourStep));
    return;
  }
  const scenarioButton = event.target.closest('[data-scenario]');
  if (scenarioButton) {
    applyScenario(scenarioButton.dataset.scenario);
    document.querySelector('#mobile-controls-sheet')?.classList.add('hidden');
    document.querySelector('#mobile-controls-backdrop')?.classList.add('hidden');
    return;
  }
  const inspectButton = event.target.closest('[data-inspect]');
  if (inspectButton) {
    state.selectedId = inspectButton.dataset.inspect;
    state.selectedType = 'component';
    state.page = 'lab';
    renderPage();
    document.querySelector('#mobile-cables-sheet')?.classList.add('hidden');
    document.querySelector('#mobile-cables-backdrop')?.classList.add('hidden');
    return;
  }
  
  const action = event.target.closest('[data-action]')?.dataset.action;
  if (!action) return;
  switch(action) {
    case 'grid-toggle':
      state.gridAvailable = !state.gridAvailable;
      renderPage();
      if (!state.gridAvailable) {
        showEventPill('⚡ محاكاة انقطاع الشبكة العامة', 'تم تفعيل مفتاح التحويل التلقائي ATS لنقل تغذية أجهزة العناية المركزة فورياً إلى عاكس الطاقة وبنك البطاريات خلال أقل من 10ms دون انقطاع.');
      } else {
        showEventPill('↻ عودة تغذية الشبكة العامة', 'عادت الشبكة الكهربائية الرئيسية، وبدأ شحن بنك البطاريات مع استمرار التغذية المستقرة لأجهزة دعم الحياة.');
      }
      break;
    case 'open-mobile-controls':
      document.querySelector('#mobile-controls-sheet')?.classList.remove('hidden');
      document.querySelector('#mobile-controls-backdrop')?.classList.remove('hidden');
      break;
    case 'close-mobile-controls':
      document.querySelector('#mobile-controls-sheet')?.classList.add('hidden');
      document.querySelector('#mobile-controls-backdrop')?.classList.add('hidden');
      break;
    case 'toggle-mobile-hud':
      {
        const sheet = document.querySelector('#mobile-hud-sheet');
        const backdrop = document.querySelector('#mobile-hud-backdrop');
        if (sheet) {
          const isHidden = sheet.classList.contains('hidden');
          sheet.classList.toggle('hidden', !isHidden);
          backdrop?.classList.toggle('hidden', !isHidden);
        }
      }
      break;
    case 'close-mobile-hud':
      document.querySelector('#mobile-hud-sheet')?.classList.add('hidden');
      document.querySelector('#mobile-hud-backdrop')?.classList.add('hidden');
      break;
    case 'open-mobile-cables':
      document.querySelector('#mobile-cables-sheet')?.classList.remove('hidden');
      document.querySelector('#mobile-cables-backdrop')?.classList.remove('hidden');
      break;
    case 'close-mobile-cables':
      document.querySelector('#mobile-cables-sheet')?.classList.add('hidden');
      document.querySelector('#mobile-cables-backdrop')?.classList.add('hidden');
      break;
    case 'toggle-tour':
    case 'toggle-mobile-tour':
      {
        const tourPlayer = document.querySelector('#glass-tour');
        if (tourPlayer) {
          const isHidden = tourPlayer.classList.contains('hidden');
          tourPlayer.classList.toggle('hidden', !isHidden);
          tourPlayer.classList.toggle('mobile-tour-visible', isHidden);
        }
      }
      break;
    case 'close-desktop-explainer':
      document.querySelector('#glass-explainer')?.classList.add('hidden');
      break;
    case 'close-mobile-explainer':
      document.querySelector('#mobile-explainer-sheet')?.classList.add('hidden');
      document.querySelector('#mobile-explainer-backdrop')?.classList.add('hidden');
      break;
    case 'toggle-explainer':
      document.querySelector('#glass-explainer')?.classList.toggle('collapsed');
      break;
    case 'toggle-hud':
      document.querySelector('#glass-hud')?.classList.toggle('mobile-hud-expanded');
      break;
    case 'toggle-controls':
      document.querySelector('#glass-controls')?.classList.toggle('mobile-expanded');
      break;
    case 'close-event':
      document.querySelector('#glass-event-pill')?.classList.add('hidden');
      break;
    case 'all-on': state.devices.forEach(d=>d.on=true); renderPage(); showEventPill('🫁 تشغيل جميع الأجهزة الطبية', 'تم تفعيل كل أجهزة العناية المركزة. ارتفع الحمل الإجمالي وتدفقت الطاقة في كافة مسارات التغذية.'); break;
    case 'all-off': state.devices.forEach(d=>d.on=false); renderPage(); showEventPill('⏹ إيقاف جميع الأجهزة', 'تم إيقاف أحمال العناية المركزة لمراقبة استهلاك الاستعداد.'); break;
    case 'reset': resetSimulation(); break;
    case 'play': togglePlay(); break;
    case 'connections':
      state.showConnections = !state.showConnections;
      world?.setConnectionsVisible(state.showConnections);
      document.querySelectorAll('[data-action="connections"]').forEach(btn => {
        btn.textContent = state.showConnections ? 'مسارات: مفعّلة' : 'مسارات: مخفية';
      });
      break;
    case 'view-overview': world?.setView('overview'); break;
    case 'view-power': world?.setView('power'); break;
    case 'view-medical': world?.setView('medical'); break;
    case 'view-top': world?.setView('top'); break;
    case 'tour-play':
      if (!world) break;
      if (world.tourPlaying) world.pauseTour();
      else world.startTour();
      break;
    case 'tour-next':
      world?.nextTourStep();
      break;
    case 'tour-prev':
      world?.prevTourStep();
      break;
    case 'tour-voice':
      if (world) {
        world.setVoiceEnabled(!world.voiceEnabled);
        syncTourUI(world.tourIndex, TOUR_STEPS[world.tourIndex], world.tourPlaying);
      }
      break;
    case 'fullscreen':
      world?.toggleFullscreen();
      break;
    case 'present':
      state.presentationMode = !state.presentationMode;
      document.querySelector('#app-shell')?.classList.toggle('presentation-shell',state.presentationMode);
      const pbtn=document.querySelector('[data-action="present"]');
      if(pbtn) pbtn.textContent=state.presentationMode?'✕ إنهاء وضع العرض':'▣ وضع العرض';
      toast(state.presentationMode?'تم تفعيل وضع العرض. استخدم القائمة للتنقل ثم أنهِ الوضع عند الحاجة.':'تم إنهاء وضع العرض.');
      break;
    case 'export': exportReport(); break;
    default: break;
  }
}

function handleInput(event) {
  const id = event.target.dataset.input;
  if (id === 'irradiance') {
    state.irradiance = Number(event.target.value);
    syncLiveUI();
  } else if (id === 'soc') {
    state.soc = Number(event.target.value);
    syncLiveUI();
  }
}

function handleChange(event) {
  const deviceId = event.target.dataset.device;
  if (deviceId) {
    const device = state.devices.find(d=>d.id===deviceId);
    if (device) {
      device.on = event.target.checked;
      showEventPill(`${device.on ? '🔌 تفعيل' : '⏹ إيقاف'} ${device.name}`, `${device.name} (${device.watts}W) ${device.on ? 'يعمل الآن ويستهلك طاقة من المنظومة.' : 'تم إيقافه.'}`);
    }
    syncLiveUI();
  }
}

function applyScenario(id) {
  const scenario = SCENARIOS.find(s=>s.id===id); if (!scenario) return;
  state.irradiance = scenario.irradiance; state.soc = scenario.soc; state.gridAvailable = scenario.grid;
  if (scenario.allDevices) state.devices.forEach(d=>d.on=true);
  else state.devices = DEVICES.map(d=>({...d}));
  renderPage();
  toast(`تم تطبيق سيناريو: ${scenario.name}`);
  showEventPill(`⚡ سيناريو: ${scenario.name}`, scenario.description);
}

function resetSimulation() {
  stopSimulation();
  state.irradiance = 70; state.soc = 71; state.gridAvailable = true; state.devices = DEVICES.map(d=>({...d}));
  renderPage(); toast('رجعت المنظومة إلى القيم الافتراضية.');
  showEventPill('↻ إعادة ضبط المنظومة', 'عادت جميع المتغيرات والأحمال إلى الحالة القياسية المرجعية.');
}

function togglePlay() {
  if (state.playing) { stopSimulation(); return; }
  state.playing = true; syncPlayButton();
  simulationTimer = setInterval(() => {
    state.soc = advanceBatterySoc({ soc: state.soc, hours: 1/60, irradiance: state.irradiance, gridAvailable: state.gridAvailable, devices: state.devices });
    if (state.soc <= 0.1 || state.soc >= 99.9) { state.soc = Math.max(0,Math.min(100,state.soc)); }
    syncLiveUI();
  }, 1000);
}
function stopSimulation() { if(simulationTimer) clearInterval(simulationTimer); simulationTimer=null; state.playing=false; syncPlayButton(); }
function syncPlayButton(){ const btn=document.querySelector('[data-action="play"]'); if(btn) btn.textContent=state.playing?'Ⅱ إيقاف الزمن':'▶ تقدّم دقيقة'; }

function syncLiveUI() {
  const d = derived();
  const text = (id, value) => { const el=document.getElementById(id); if(el) el.textContent=value; };

  // Common calculations
  const loadBase = Math.max(1, d.loadW);
  const loadPercentageOfInverter = Math.min(100, Math.round((d.loadW / SYSTEM.inverterLimitW) * 100));
  const solarPercentageOfCapacity = Math.min(100, Math.round((d.solarDcW / SYSTEM.panelWp) * 100));
  const batteryUsableWh = Math.round(state.soc * (SYSTEM.batteryWh / 100));
  const greenSelfSufficiency = Math.min(100, Math.round(((d.solarToLoadW + d.batterySupplyW) / loadBase) * 100));
  const effectiveSupply = d.solarToLoadW + d.gridSupplyW + d.batterySupplyW;
  const solarPct = Math.min(100, Math.round((d.solarToLoadW / loadBase) * 100));
  const battPct = Math.min(100, Math.round((d.batterySupplyW / loadBase) * 100));
  const gridPct = Math.min(100, Math.round((d.gridSupplyW / loadBase) * 100));
  const unmetPct = Math.min(100, Math.round((d.unmetLoadW / loadBase) * 100));

  // 1. Dashboard Executive 6 KPIs
  text('home-load', formatPower(d.loadW));
  text('home-load-ratio', `${loadPercentageOfInverter}% من العاكس`);
  const homeLoadBar = document.getElementById('home-load-bar');
  if (homeLoadBar) {
    homeLoadBar.style.width = `${loadPercentageOfInverter}%`;
    homeLoadBar.style.background = loadPercentageOfInverter > 90 ? 'var(--red)' : loadPercentageOfInverter > 75 ? 'var(--orange)' : 'var(--blue)';
  }

  text('home-solar', formatPower(d.solarDcW));
  text('home-irr-tag', `إشعاع ${state.irradiance}%`);
  const homePvBar = document.getElementById('home-pv-bar');
  if (homePvBar) homePvBar.style.width = `${solarPercentageOfCapacity}%`;

  text('home-soc', `${Math.round(state.soc)}%`);
  text('home-batt-kwh', `${(batteryUsableWh/1000).toFixed(1)} kWh`);
  const homeSocBar = document.getElementById('home-soc-bar');
  if (homeSocBar) {
    homeSocBar.style.width = `${Math.round(state.soc)}%`;
    homeSocBar.style.background = state.soc < 20 ? 'var(--red)' : state.soc < 40 ? 'var(--orange)' : 'var(--green)';
  }

  text('home-grid-val', formatPower(d.gridSupplyW));
  const homeGridVal = document.getElementById('home-grid-val');
  if (homeGridVal) homeGridVal.style.color = state.gridAvailable ? '#7c9cff' : 'var(--muted)';
  const homeGridStatusTag = document.getElementById('home-grid-status-tag');
  if (homeGridStatusTag) {
    homeGridStatusTag.textContent = state.gridAvailable ? 'متاحة ومستقرة' : 'منقطعة';
    homeGridStatusTag.className = `tag ${state.gridAvailable ? 'green' : 'red'}`;
  }
  const homeGridBar = document.getElementById('home-grid-bar');
  if (homeGridBar) homeGridBar.style.width = state.gridAvailable ? '100%' : '0%';

  text('home-autonomy', formatDuration(calculatePower({...state, gridAvailable:false}).autonomyHours));

  text('home-self-sufficiency', `${greenSelfSufficiency}%`);
  const homeSelfEl = document.getElementById('home-self-sufficiency');
  if (homeSelfEl) homeSelfEl.style.color = d.unmetLoadW > 1 ? 'var(--red)' : '#33d6a6';

  const homeUnmetTag = document.getElementById('home-unmet-tag');
  if (homeUnmetTag) {
    homeUnmetTag.textContent = d.unmetLoadW > 1 ? `عجز ${Math.round(d.unmetLoadW)} W` : 'مغطى 100%';
    homeUnmetTag.className = `tag ${d.unmetLoadW > 1 ? 'red' : 'green'}`;
  }

  const homeBalanceCaption = document.getElementById('home-balance-caption');
  if (homeBalanceCaption) {
    homeBalanceCaption.textContent = d.unmetLoadW > 1 ? 'تحذير: القدرة المطلوبة تتجاوز إمدادات الطاقة!' : 'الحمل الطبي مغطّى بالكامل مع أمان واستقرار.';
  }

  const homeSelfBar = document.getElementById('home-self-bar');
  if (homeSelfBar) {
    homeSelfBar.style.width = `${greenSelfSufficiency}%`;
    homeSelfBar.style.background = d.unmetLoadW > 1 ? 'var(--red)' : '#33d6a6';
  }

  // 2. Multi-segment balance split bar & telemetry tiles
  const splitSolar = document.getElementById('split-solar');
  if (splitSolar) splitSolar.style.width = `${solarPct}%`;
  const splitBatt = document.getElementById('split-batt');
  if (splitBatt) splitBatt.style.width = `${battPct}%`;
  const splitGrid = document.getElementById('split-grid');
  if (splitGrid) splitGrid.style.width = `${gridPct}%`;
  const splitUnmet = document.getElementById('split-unmet');
  if (splitUnmet) splitUnmet.style.width = `${unmetPct}%`;

  text('split-lbl-solar', `${solarPct}%`);
  text('split-lbl-batt', `${battPct}%`);
  text('split-lbl-grid', `${gridPct}%`);
  text('split-lbl-unmet', `${unmetPct}%`);

  text('home-solar-load', formatPower(d.solarToLoadW));
  text('home-battery-load', formatPower(d.batterySupplyW));
  text('home-grid-load', formatPower(d.gridSupplyW));
  text('home-covered', formatPower(effectiveSupply));
  text('home-inverter-headroom', `${Math.max(0, SYSTEM.inverterLimitW - d.loadW)} W`);
  text('home-renewable-ratio', `${greenSelfSufficiency}%`);

  // 3. Interactive SCADA Schematic SVG badges & wire states
  const pvFlowing = d.solarDcW > 10;
  const battDischarging = !state.gridAvailable || d.batterySupplyW > 10;
  const gridActive = state.gridAvailable;
  const icuPowered = d.loadW > 0 && d.unmetLoadW <= 1;

  text('schematic-pv-w', formatPower(d.solarDcW));
  text('schematic-batt-soc', `${Math.round(state.soc)}% (${(batteryUsableWh/1000).toFixed(1)} kWh)`);
  text('schematic-inv-w', formatPower(d.solarToLoadW + d.batterySupplyW));
  text('schematic-ats-source', gridActive ? 'Source A: شبكة' : 'Source B: عاكس');
  text('schematic-load-w', formatPower(d.loadW));

  const schematicGridTag = document.getElementById('schematic-grid-tag');
  if (schematicGridTag) {
    schematicGridTag.textContent = gridActive ? '🟢 الشبكة متاحة' : '🔴 الشبكة مفصولة (ATS)';
    schematicGridTag.className = `tag ${gridActive ? 'green' : 'red'}`;
  }
  const schematicBalanceTag = document.getElementById('schematic-balance-tag');
  if (schematicBalanceTag) {
    schematicBalanceTag.textContent = d.unmetLoadW > 1 ? 'عجز تغذية' : 'تغذية مؤمنة 100%';
    schematicBalanceTag.className = `tag ${d.unmetLoadW > 1 ? 'red' : 'green'}`;
  }

  const updateSchematicWire = (id, active, activeStroke, inactiveStroke = '#23415f', dash = '6 4') => {
    const el = document.getElementById(id);
    if (!el) return;
    el.setAttribute('stroke', active ? activeStroke : inactiveStroke);
    el.setAttribute('stroke-dasharray', active ? dash : 'none');
    el.classList.toggle('wire-active', !!active);
  };
  updateSchematicWire('schematic-wire-pv', pvFlowing, '#ffb85c');
  updateSchematicWire('schematic-wire-mppt', pvFlowing, '#33d6a6');
  updateSchematicWire('schematic-wire-batt', battDischarging, '#f59e0b');
  updateSchematicWire('schematic-wire-inv', battDischarging || pvFlowing, '#33d6a6');
  updateSchematicWire('schematic-wire-grid', gridActive, '#5b8cff', '#662233');
  updateSchematicWire('schematic-wire-icu', icuPowered, '#00f5b8', '#ff4466', '8 4');

  // 4. Medical Load Matrix Tier Sums and Devices
  const cat1Devs = state.devices.filter(dev => ['vent', 'monitor', 'defib'].includes(dev.id));
  const cat2Devs = state.devices.filter(dev => ['infusion', 'syringe'].includes(dev.id));
  const cat3Devs = state.devices.filter(dev => ['incubator', 'oxygen'].includes(dev.id));

  text('cat-1-watts', `${cat1Devs.reduce((s, dev) => s + (dev.on ? dev.watts : 0), 0)} W`);
  text('cat-2-watts', `${cat2Devs.reduce((s, dev) => s + (dev.on ? dev.watts : 0), 0)} W`);
  text('cat-3-watts', `${cat3Devs.reduce((s, dev) => s + (dev.on ? dev.watts : 0), 0)} W`);

  state.devices.forEach(dev => {
    const wEl = document.getElementById(`load-watt-${dev.id}`);
    if (wEl) {
      wEl.textContent = dev.on ? `${dev.watts} W` : '0 W';
      wEl.style.color = dev.on ? 'var(--green)' : 'var(--muted)';
    }
  });

  // 5. Existing Lab & HUD Elements
  text('home-unmet', formatPower(d.unmetLoadW));
  text('home-grid-status', state.gridAvailable ? 'متاحة' : 'منقطعة');
  text('lab-load', formatPower(d.loadW));
  text('lab-solar', formatPower(d.solarDcW));
  text('lab-grid', formatPower(d.gridSupplyW));
  text('lab-unmet', formatPower(d.unmetLoadW));

  // Glass HUD live elements
  text('glass-load', formatPower(d.loadW));
  text('glass-solar', formatPower(d.solarDcW));
  text('glass-soc', `${Math.round(state.soc)}%`);
  text('glass-grid-status', state.gridAvailable ? 'متاحة 🟢' : 'منقطعة 🔴');
  const gridStatusEl = document.getElementById('glass-grid-status');
  if (gridStatusEl) gridStatusEl.style.color = state.gridAvailable ? 'var(--green)' : 'var(--red)';
  text('glass-autonomy', formatDuration(calculatePower({...state, gridAvailable:false}).autonomyHours));
  text('glass-irr-val', `${state.irradiance}%`);
  text('lab-solar-load', formatPower(d.solarToLoadW));
  text('lab-battery-load', formatPower(d.batterySupplyW));
  text('lab-grid-load', formatPower(d.gridSupplyW));
  text('lab-unmet-val', formatPower(d.unmetLoadW));

  // Mobile Ribbon & Bottom Sheet elements
  text('m-glass-load', formatPower(d.loadW));
  text('m-glass-solar', formatPower(d.solarDcW));
  text('m-glass-soc', `${Math.round(state.soc)}%`);
  text('m-glass-grid-status', state.gridAvailable ? '🟢 شبكة' : '🔴 منقطعة');
  const mGridStatus = document.getElementById('m-glass-grid-status');
  if (mGridStatus) mGridStatus.style.color = state.gridAvailable ? 'var(--green)' : 'var(--red)';
  text('m-glass-irr-val', `${state.irradiance}%`);

  text('m-sheet-load', formatPower(d.loadW));
  text('m-sheet-solar', formatPower(d.solarDcW));
  text('m-sheet-soc', `${Math.round(state.soc)}%`);
  text('m-sheet-grid', state.gridAvailable ? 'متاحة 🟢' : 'منقطعة 🔴');
  const mSheetGrid = document.getElementById('m-sheet-grid');
  if (mSheetGrid) mSheetGrid.style.color = state.gridAvailable ? 'var(--green)' : 'var(--red)';
  text('m-sheet-autonomy', formatDuration(calculatePower({...state, gridAvailable:false}).autonomyHours));
  const mSheetStatus = document.getElementById('m-sheet-status-tag');
  if (mSheetStatus) {
    mSheetStatus.textContent = d.unmetLoadW > 1 ? 'عجز تغذية' : 'تغذية مستقرة 100%';
    mSheetStatus.className = `tag ${d.unmetLoadW > 1 ? 'red' : 'green'}`;
  }

  const glassStatusTag = document.querySelector('#glass-status-tag');
  if (glassStatusTag) {
    glassStatusTag.textContent = d.unmetLoadW > 1 ? 'عجز تغذية' : 'تغذية مستقرة';
    glassStatusTag.className = `tag ${d.unmetLoadW > 1 ? 'red' : 'green'}`;
  }

  const labResultStatus = document.querySelector('#lab-result-status');
  if (labResultStatus) {
    labResultStatus.textContent = d.unmetLoadW > 1 ? 'عجز في التغطية' : 'الحمل مغطّى';
    labResultStatus.className = `tag ${d.unmetLoadW > 1 ? 'red' : 'green'}`;
  }
  const labUnmet = document.querySelector('#lab-unmet');
  if (labUnmet) labUnmet.classList.toggle('high-load', d.unmetLoadW > 1);

  const homeUnmet = document.querySelector('#home-unmet');
  if (homeUnmet) homeUnmet.classList.toggle('high-load', d.unmetLoadW > 1);

  const count = document.querySelector('#device-count');
  if (count) count.textContent = `${state.devices.filter(d=>d.on).length} / ${state.devices.length} نشط`;

  const gridBadges = document.querySelectorAll('#grid-badge');
  gridBadges.forEach(b => {
    b.textContent = state.gridAvailable ? 'متاحة ومستقرة' : 'منقطعة (معزولة)';
    b.className = `tag ${state.gridAvailable ? 'green' : 'red'}`;
  });

  const irrSliders = document.querySelectorAll('input[data-input="irradiance"]');
  irrSliders.forEach(s => { if (Number(s.value) !== state.irradiance) s.value = state.irradiance; });
  const irrVals = document.querySelectorAll('#irradiance-value');
  irrVals.forEach(v => { v.textContent = `${state.irradiance}%`; });

  const socSliders = document.querySelectorAll('input[data-input="soc"]');
  socSliders.forEach(s => { if (Number(s.value) !== Math.round(state.soc)) s.value = Math.round(state.soc); });
  const socVals = document.querySelectorAll('#soc-value');
  socVals.forEach(v => { v.textContent = `${Math.round(state.soc)}%`; });

  if (world) world.updateState({ ...d, irradiance: state.irradiance, soc: state.soc, gridAvailable: state.gridAvailable, devices: state.devices });
  drawChart();
}

function drawChart() {
  const canvas=document.querySelector('#energy-chart'); if(!canvas) return;
  const rect=canvas.getBoundingClientRect(); if(rect.width<2||rect.height<2) return;
  const ratio=Math.min(window.devicePixelRatio||1,1.7);canvas.width=Math.round(rect.width*ratio);canvas.height=Math.round(rect.height*ratio);
  const ctx=canvas.getContext('2d');ctx.scale(ratio,ratio);const w=rect.width,h=rect.height;
  ctx.clearRect(0,0,w,h);
  for(let i=0;i<4;i++){const y=24+i*(h-48)/3;ctx.beginPath();ctx.moveTo(10,y);ctx.lineTo(w-10,y);ctx.strokeStyle='#1d3550';ctx.lineWidth=1;ctx.stroke();}
  const d=derived();const vals=[d.solarToLoadW,d.batterySupplyW,d.gridSupplyW,d.loadW];const labels=['الشمس','البطارية','الشبكة','الحمل'];const colors=['#ffb85c','#33d6a6','#7c9cff','#5b8cff'];const max=Math.max(SYSTEM.inverterLimitW,...vals,800);const groupW=(w-50)/4;const base=h-28;const chartH=h-58;
  vals.forEach((val,i)=>{const bh=Math.max(val>0?3:0,val/max*chartH);const x=25+i*groupW+groupW*.22;const bw=groupW*.48;const grad=ctx.createLinearGradient(0,base-bh,0,base);grad.addColorStop(0,colors[i]);grad.addColorStop(1,colors[i]+'55');ctx.fillStyle=grad;roundRectCanvas(ctx,x,base-bh,bw,bh,7);ctx.fill();ctx.fillStyle='#bfd0e6';ctx.font='11px Tajawal,Arial';ctx.textAlign='center';ctx.fillText(`${Math.round(val)}W`,x+bw/2,Math.max(14,base-bh-8));ctx.fillStyle='#6e88a7';ctx.font='10px Tajawal,Arial';ctx.fillText(labels[i],x+bw/2,h-8);});
}
function roundRectCanvas(ctx,x,y,w,h,r){if(h<1)return;ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}

function componentIcon(id) { return ({solar:'☼',mppt:'◫',battery:'▰',inverter:'ϟ',ats:'⇄',grid:'⌁',icu:'✚'})[id]||'◈'; }
function deviceIcon(id) { return ({vent:'🫁',monitor:'📈',infusion:'💧',syringe:'💉',defib:'♡',incubator:'♧',oxygen:'◉'})[id]||'▣'; }

function exportReport() {
  const d=derived();
  const report={
    project:'ICU Power Lab 3D', generatedAt:new Date().toISOString(), educationalOnly:true,
    sourceBaseline:{ panelWp:SYSTEM.panelWp,mpptEfficiency:SYSTEM.mpptEfficiency,inverterEfficiency:SYSTEM.inverterEfficiency,batteryWh:SYSTEM.batteryWh,inverterLimitW:SYSTEM.inverterLimitW },
    state:{ irradiancePercent:state.irradiance,batterySocPercent:state.soc,gridAvailable:state.gridAvailable,devices:state.devices.map(x=>({id:x.id,name:x.name,watts:x.watts,on:x.on})) },
    calculated:{ loadW:d.loadW,solarDcW:d.solarDcW,solarToLoadW:d.solarToLoadW,batterySupplyW:d.batterySupplyW,gridSupplyW:d.gridSupplyW,unmetLoadW:d.unmetLoadW,autonomyHours:calculatePower({...state,gridAvailable:false}).autonomyHours },
    assumptions:['الأحمال والمواصفات مرجعية من دراسة المشروع وليست مواصفات مُعتمدة لطراز محدد.','شحن البطارية 1200W وتفريغها 1800W افتراضان تعليميان.','المجسمات توضيحية، ولا يجوز استخدامها كمخطط تنفيذ أو كاعتماد طبي.']
  };
  const blob=new Blob([JSON.stringify(report,null,2)],{type:'application/json;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='icu-power-lab-report.json';a.click();URL.revokeObjectURL(url);toast('تم تصدير تقرير الحالة إلى ملف JSON.');
}
function toast(message) { document.querySelector('.toast')?.remove();const el=document.createElement('div');el.className='toast';el.textContent=message;document.body.appendChild(el);if(toastTimer)clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.remove(),3200); }

window.addEventListener('resize', drawChart);
shell();
