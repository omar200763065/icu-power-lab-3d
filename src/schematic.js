import { COMPONENTS, CONNECTIONS } from './data.js';

const positions = {
  solar: { x: 80, y: 130, w: 150, h: 76, title: 'الألواح الشمسية', tag: 'PV · DC' },
  mppt: { x: 290, y: 130, w: 145, h: 76, title: 'منظّم MPPT', tag: 'DC / DC' },
  battery: { x: 510, y: 130, w: 145, h: 76, title: 'البطارية', tag: '48 V · 9.6 kWh' },
  inverter: { x: 715, y: 130, w: 145, h: 76, title: 'العاكس الهجين', tag: 'DC / AC' },
  ats: { x: 920, y: 130, w: 145, h: 76, title: 'مفتاح ATS', tag: 'تحويل المصدر' },
  grid: { x: 920, y: 290, w: 145, h: 76, title: 'الشبكة', tag: 'مصدر بديل' },
  icu: { x: 1120, y: 130, w: 155, h: 76, title: 'أحمال العناية', tag: 'أجهزة طبية' },
};

export function renderSchematic(state = {}) {
  const colors = { dc: '#5b8cff', ac: '#33d6a6', grid: '#ffb85c' };
  const links = CONNECTIONS.map((connection) => {
    const a = positions[connection.from];
    const b = positions[connection.to];
    const color = colors[connection.medium];
    let x1 = a.x + a.w;
    let y1 = a.y + a.h / 2;
    let x2 = b.x;
    let y2 = b.y + b.h / 2;
    let path;
    if (connection.from === 'grid') {
      x1 = a.x + a.w / 2; y1 = a.y;
      x2 = b.x + b.w / 2; y2 = b.y + b.h;
      path = `M ${x1} ${y1} C ${x1} ${y1-40}, ${x2} ${y2+45}, ${x2} ${y2}`;
    } else if (connection.from === 'mppt' && connection.to === 'battery') {
      path = `M ${x1} ${y1} L ${x2} ${y2}`;
    } else if (connection.from === 'battery' && connection.to === 'inverter') {
      path = `M ${x1} ${y1} L ${x2} ${y2}`;
    } else {
      path = `M ${x1} ${y1} C ${x1+28} ${y1}, ${x2-28} ${y2}, ${x2} ${y2}`;
    }
    const active = connection.from === 'grid' ? Boolean(state.gridAvailable) : connection.medium === 'dc' ? state.solarDcW > 0 : state.loadW > 0;
    return `<g class="wire-group" tabindex="0" role="button" aria-label="${connection.label}" data-connection="${connection.id}">
      <path d="${path}" fill="none" stroke="#07111f" stroke-width="12" stroke-linecap="round" opacity=".85" />
      <path d="${path}" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-dasharray="${active ? '8 9' : '3 10'}" class="wire-flow ${active ? 'wire-active' : ''}" />
      <title>${connection.label} — ${connection.status}</title>
    </g>`;
  }).join('');
  const nodes = Object.entries(positions).map(([id, p]) => {
    const component = COMPONENTS.find(c => c.id === id);
    const status = id === 'grid' ? (state.gridAvailable ? 'متاحة' : 'منقطعة') : id === 'icu' ? `${Math.round(state.loadW || 0)} W` : component.rating;
    return `<g class="schematic-node" tabindex="0" role="button" data-component="${id}" transform="translate(${p.x} ${p.y})">
      <rect width="${p.w}" height="${p.h}" rx="13" fill="#10213a" stroke="${id === 'grid' && !state.gridAvailable ? '#ff667c' : '#2a466a'}" stroke-width="1.5" />
      <rect x="11" y="11" width="6" height="${p.h-22}" rx="3" fill="${id==='grid'&&!state.gridAvailable?'#ff667c':id==='solar'?'#5b8cff':id==='icu'?'#33d6a6':'#6d8aaa'}" />
      <text x="${p.w/2+4}" y="31" text-anchor="middle" fill="#f0f6ff" font-size="15" font-weight="700">${p.title}</text>
      <text x="${p.w/2+4}" y="51" text-anchor="middle" fill="#8fa8c8" font-size="11">${p.tag}</text>
      <text x="${p.w/2+4}" y="66" text-anchor="middle" fill="${id==='grid'&&!state.gridAvailable?'#ff8c9c':'#33d6a6'}" font-size="10">${status}</text>
    </g>`;
  }).join('');
  return `<div class="schematic-wrap">
    <div class="schematic-topline"><span class="eyebrow">ENGINEERING VIEW · CONCEPT ONLY</span><span class="scheme-disclaimer">مخطط تعليمي تصوري — ليس مخطط تمديدات للتنفيذ</span></div>
    <svg class="schematic-svg" viewBox="0 0 1320 420" role="img" aria-label="مخطط تصوري لمسار الطاقة في نظام احتياطي لأجهزة العناية المركزة">
      <defs><pattern id="schemGrid" width="22" height="22" patternUnits="userSpaceOnUse"><path d="M22 0H0V22" fill="none" stroke="#18304d" stroke-width=".8"/></pattern></defs>
      <rect width="1320" height="420" rx="18" fill="url(#schemGrid)"/>
      ${links}${nodes}
      <text x="70" y="40" fill="#829bbd" font-size="12">مسار DC</text><line x1="135" y1="36" x2="175" y2="36" stroke="#5b8cff" stroke-width="4" stroke-dasharray="6 5"/>
      <text x="235" y="40" fill="#829bbd" font-size="12">مسار AC</text><line x1="300" y1="36" x2="340" y2="36" stroke="#33d6a6" stroke-width="4" stroke-dasharray="6 5"/>
      <text x="405" y="40" fill="#829bbd" font-size="12">الشبكة</text><line x1="455" y1="36" x2="495" y2="36" stroke="#ffb85c" stroke-width="4" stroke-dasharray="6 5"/>
      <text x="660" y="365" text-anchor="middle" fill="#607b9f" font-size="12">تتطلب تفاصيل الحمايات، التأريض، العزل، القواطع وأقطاب التوصيل مراجعة هندسية مستقلة.</text>
    </svg>
    <div class="schematic-legend"><span><i class="dot dc"></i> تيار مستمر DC</span><span><i class="dot ac"></i> تيار متناوب AC</span><span><i class="dot grid"></i> مصدر الشبكة</span></div>
    <div class="connection-list">${CONNECTIONS.map(c=>`<div class="connection-row"><span class="connection-dot ${c.medium}"></span><div><strong>${c.label}</strong><small>${c.status} · نقطة التحقق: راجع دليل الجهاز ومخطط الشركة المصنّعة</small></div><span class="tag muted">${c.medium.toUpperCase()}</span></div>`).join('')}</div>
  </div>`;
}
