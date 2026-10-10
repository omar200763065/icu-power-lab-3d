import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { COMPONENTS, DEVICES, SYSTEM } from './data.js';

// Procedural Photorealistic Textures
function createPhotorealisticSolarTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024; canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#1c2b3d';
  ctx.fillRect(0, 0, 1024, 1024);

  // Anodized aluminum frame
  const frameGrad = ctx.createLinearGradient(0, 0, 1024, 1024);
  frameGrad.addColorStop(0, '#a5b9ce');
  frameGrad.addColorStop(0.5, '#5c7692');
  frameGrad.addColorStop(1, '#9cb2c9');
  ctx.strokeStyle = frameGrad;
  ctx.lineWidth = 22;
  ctx.strokeRect(11, 11, 1002, 1002);

  ctx.strokeStyle = '#0a121b';
  ctx.lineWidth = 6;
  ctx.strokeRect(22, 22, 980, 980);

  ctx.fillStyle = '#dde8f2';
  ctx.fillRect(26, 26, 972, 972);

  // 6 columns x 10 rows monocrystalline PERC solar cells
  const cols = 6, rows = 10;
  const startX = 32, startY = 32;
  const totalW = 960, totalH = 960;
  const gap = 5;
  const cellW = (totalW - (cols - 1) * gap) / cols;
  const cellH = (totalH - (rows - 1) * gap) / rows;
  const chamfer = 14;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = startX + c * (cellW + gap);
      const y = startY + r * (cellH + gap);

      ctx.beginPath();
      ctx.moveTo(x + chamfer, y);
      ctx.lineTo(x + cellW - chamfer, y);
      ctx.lineTo(x + cellW, y + chamfer);
      ctx.lineTo(x + cellW, y + cellH - chamfer);
      ctx.lineTo(x + cellW - chamfer, y + cellH);
      ctx.lineTo(x + chamfer, y + cellH);
      ctx.lineTo(x, y + cellH - chamfer);
      ctx.lineTo(x, y + chamfer);
      ctx.closePath();

      const cellGrad = ctx.createLinearGradient(x, y, x + cellW, y + cellH);
      cellGrad.addColorStop(0, '#0a203a');
      cellGrad.addColorStop(0.35, '#0e2b4d');
      cellGrad.addColorStop(0.7, '#0b223d');
      cellGrad.addColorStop(1, '#071629');
      ctx.fillStyle = cellGrad;
      ctx.fill();

      ctx.fillStyle = 'rgba(56, 130, 204, 0.08)';
      ctx.fill();

      // Silver micro-fingers
      ctx.strokeStyle = 'rgba(215, 230, 250, 0.16)';
      ctx.lineWidth = 0.8;
      for (let f = y + 4; f < y + cellH - 3; f += 4) {
        ctx.beginPath();
        ctx.moveTo(x + 2, f);
        ctx.lineTo(x + cellW - 2, f);
        ctx.stroke();
      }

      // 5 silver busbars per cell
      const busbarSpacing = cellW / 6;
      for (let b = 1; b <= 5; b++) {
        const bx = x + b * busbarSpacing;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.moveTo(bx, y); ctx.lineTo(bx, y + cellH); ctx.stroke();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 0.7;
        ctx.beginPath(); ctx.moveTo(bx, y); ctx.lineTo(bx, y + cellH); ctx.stroke();
      }
    }
  }

  // Interconnection ribbons between columns
  ctx.strokeStyle = '#c5d5e5';
  ctx.lineWidth = 2.4;
  for (let c = 0; c < cols; c++) {
    const x = startX + c * (cellW + gap);
    const busbarSpacing = cellW / 6;
    for (let b = 1; b <= 5; b++) {
      const bx = x + b * busbarSpacing;
      ctx.beginPath();
      ctx.moveTo(bx, startY - 4); ctx.lineTo(bx, startY);
      ctx.moveTo(bx, startY + totalH); ctx.lineTo(bx, startY + totalH + 4);
      ctx.stroke();
    }
  }

  // Glass specular highlight
  const glassGrad = ctx.createLinearGradient(0, 0, 1024, 1024);
  glassGrad.addColorStop(0, 'rgba(255, 255, 255, 0.09)');
  glassGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.02)');
  glassGrad.addColorStop(0.5, 'rgba(110, 190, 255, 0.06)');
  glassGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.01)');
  glassGrad.addColorStop(1, 'rgba(255, 255, 255, 0.08)');
  ctx.fillStyle = glassGrad;
  ctx.fillRect(22, 22, 980, 980);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createBatteryRackTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0d1826';
  ctx.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 4; i++) {
    const y = 8 + i * 126;
    ctx.fillStyle = '#14263b';
    ctx.fillRect(8, y, 496, 118);
    ctx.strokeStyle = '#224466';
    ctx.lineWidth = 2;
    ctx.strokeRect(8, y, 496, 118);

    ctx.fillStyle = '#1c344e';
    ctx.fillRect(10, y + 2, 28, 114);
    ctx.fillRect(474, y + 2, 28, 114);
    ctx.fillStyle = '#8ca6c2';
    ctx.beginPath();
    ctx.arc(24, y + 25, 4, 0, Math.PI * 2); ctx.arc(24, y + 93, 4, 0, Math.PI * 2);
    ctx.arc(488, y + 25, 4, 0, Math.PI * 2); ctx.arc(488, y + 93, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#b8cde3';
    ctx.lineWidth = 4;
    ctx.strokeRect(44, y + 34, 12, 50);
    ctx.strokeRect(456, y + 34, 12, 50);

    ctx.fillStyle = '#4ae6b8';
    ctx.font = 'bold 12px monospace';
    ctx.fillText(`LiFePO4 48V 50Ah · RACK MODULE 0${i + 1}`, 72, y + 32);
    ctx.fillStyle = '#8eaac6';
    ctx.font = '10px monospace';
    ctx.fillText('2400 Wh · SMART BMS SYSTEM', 72, y + 48);

    ctx.fillStyle = '#e63956';
    ctx.beginPath(); ctx.arc(380, y + 40, 10, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('+', 376, y + 44);

    ctx.fillStyle = '#182430';
    ctx.beginPath(); ctx.arc(415, y + 40, 10, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillText('-', 412, y + 44);

    ctx.fillStyle = '#08121c';
    ctx.fillRect(72, y + 68, 36, 24);
    ctx.fillStyle = '#2cd89f';
    ctx.fillRect(76, y + 71, 28, 10);

    for (let l = 0; l < 5; l++) {
      ctx.fillStyle = l < 4 ? '#2cd89f' : '#1d483c';
      ctx.beginPath();
      ctx.arc(135 + l * 14, y + 80, 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = '#6e8ba8';
    ctx.font = '9px monospace';
    ctx.fillText('SOC', 135, y + 68);

    ctx.fillStyle = '#0b1622';
    for (let v = 0; v < 16; v++) ctx.fillRect(230 + v * 8, y + 68, 4, 30);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createMPPTTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0f2742';
  ctx.fillRect(0, 0, 512, 512);
  ctx.strokeStyle = '#285885';
  ctx.lineWidth = 8;
  ctx.strokeRect(4, 4, 504, 504);

  ctx.fillStyle = '#4ae6b8';
  ctx.font = 'bold 22px monospace';
  ctx.fillText('MPPT CHARGE CONTROLLER', 30, 48);
  ctx.fillStyle = '#91b0d0';
  ctx.font = '14px monospace';
  ctx.fillText('ULTRA-FAST TRACKING · EFFICIENCY 97%', 30, 75);

  ctx.fillStyle = '#061c2e';
  ctx.fillRect(30, 110, 452, 190);
  ctx.strokeStyle = '#18476d';
  ctx.lineWidth = 3;
  ctx.strokeRect(30, 110, 452, 190);

  ctx.fillStyle = '#4ae6b8';
  ctx.font = 'bold 28px monospace';
  ctx.fillText('PV: 94.2 V   25.4 A', 50, 160);
  ctx.fillStyle = '#ffb85c';
  ctx.fillText('OUT: 54.6 V  43.8 A', 50, 210);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px monospace';
  ctx.fillText('POWER: 2390 W', 50, 265);

  const leds = [
    { label: 'PV IN', color: '#2cd89f' },
    { label: 'BULK', color: '#2cd89f' },
    { label: 'FLOAT', color: '#5b8cff' },
    { label: 'FAULT', color: '#3a2028' }
  ];
  leds.forEach((l, idx) => {
    const lx = 50 + idx * 110;
    ctx.fillStyle = l.color;
    ctx.beginPath(); ctx.arc(lx + 20, 340, 10, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#a6c2de';
    ctx.font = 'bold 12px monospace';
    ctx.fillText(l.label, lx, 370);
  });

  ctx.fillStyle = '#081524';
  for (let i = 0; i < 6; i++) ctx.fillRect(40, 400 + i * 16, 432, 8);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createATSTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#182738';
  ctx.fillRect(0, 0, 512, 512);

  ctx.fillStyle = '#0d1926';
  ctx.fillRect(10, 10, 492, 70);
  ctx.fillStyle = '#e8f3ff';
  ctx.font = 'bold 20px monospace';
  ctx.fillText('AUTOMATIC TRANSFER SWITCH (ATS)', 30, 46);
  ctx.fillStyle = '#62deb7';
  ctx.font = '12px monospace';
  ctx.fillText('TRANSFER TIME: < 10ms · DUAL SOURCE', 30, 68);

  ctx.fillStyle = '#0e2033';
  ctx.fillRect(30, 110, 200, 180);
  ctx.strokeStyle = '#23496d';
  ctx.lineWidth = 2;
  ctx.strokeRect(30, 110, 200, 180);
  ctx.fillStyle = '#ffb85c';
  ctx.font = 'bold 16px monospace';
  ctx.fillText('SOURCE A: GRID', 46, 145);
  ctx.fillStyle = '#2cd89f';
  ctx.beginPath(); ctx.arc(130, 195, 18, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = '12px monospace';
  ctx.fillText('ONLINE', 110, 245);

  ctx.fillStyle = '#0e2033';
  ctx.fillRect(280, 110, 200, 180);
  ctx.strokeStyle = '#23496d';
  ctx.lineWidth = 2;
  ctx.strokeRect(280, 110, 200, 180);
  ctx.fillStyle = '#5b8cff';
  ctx.font = 'bold 16px monospace';
  ctx.fillText('SOURCE B: INVERTER', 290, 145);
  ctx.fillStyle = '#3a5068';
  ctx.beginPath(); ctx.arc(380, 195, 18, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = '12px monospace';
  ctx.fillText('STANDBY', 355, 245);

  ctx.fillStyle = '#08131e';
  ctx.beginPath(); ctx.arc(256, 360, 45, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#ffb85c';
  ctx.lineWidth = 6;
  ctx.beginPath(); ctx.moveTo(256, 360); ctx.lineTo(220, 330); ctx.stroke();
  ctx.fillStyle = '#e8f3ff';
  ctx.font = 'bold 13px monospace';
  ctx.fillText('AUTO MODE', 222, 435);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createUtilityMeterTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#13253b';
  ctx.fillRect(0, 0, 512, 512);
  ctx.strokeStyle = '#254b73';
  ctx.lineWidth = 6;
  ctx.strokeRect(6, 6, 500, 500);

  ctx.fillStyle = '#061320';
  ctx.fillRect(40, 60, 432, 140);
  ctx.strokeStyle = '#183c5e';
  ctx.lineWidth = 3;
  ctx.strokeRect(40, 60, 432, 140);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 44px monospace';
  ctx.fillText('0 4 8 2 1 . 6', 80, 145);
  ctx.fillStyle = '#ffb85c';
  ctx.font = 'bold 20px monospace';
  ctx.fillText('kWh', 380, 145);

  ctx.fillStyle = '#ffd15c';
  ctx.beginPath();
  ctx.moveTo(256, 260); ctx.lineTo(330, 390); ctx.lineTo(182, 390); ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#13253b';
  ctx.beginPath();
  ctx.moveTo(256, 285); ctx.lineTo(240, 335); ctx.lineTo(262, 335);
  ctx.lineTo(250, 375); ctx.lineTo(276, 325); ctx.lineTo(254, 325); ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#e8f3ff';
  ctx.font = 'bold 16px monospace';
  ctx.fillText('MAIN UTILITY FEED 220V/380V', 115, 430);
  ctx.fillStyle = '#6de4bf';
  ctx.font = '14px monospace';
  ctx.fillText('HOSPITAL DEDICATED FEEDER', 135, 460);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createMedicalConsoleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024; canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Background chassis
  ctx.fillStyle = '#0b1928';
  ctx.fillRect(0, 0, 1024, 512);
  ctx.strokeStyle = '#234b73';
  ctx.lineWidth = 8;
  ctx.strokeRect(6, 6, 1012, 500);

  // Top header banner
  ctx.fillStyle = '#061320';
  ctx.fillRect(16, 16, 992, 74);
  ctx.strokeStyle = '#183c5e';
  ctx.lineWidth = 2;
  ctx.strokeRect(16, 16, 992, 74);

  // Cross / medical emblem
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(36, 32, 12, 42);
  ctx.fillRect(21, 47, 42, 12);

  ctx.fillStyle = '#ffb85c';
  ctx.font = 'bold 22px monospace';
  ctx.fillText('ICU MEDICAL ISOLATED POWER DISTRIBUTION (IPS)', 84, 46);
  ctx.fillStyle = '#5eead4';
  ctx.font = '13px monospace';
  ctx.fillText('IEC 60364-7-710 MEDICAL SAFETY STANDARD · 230V 50Hz · UNINTERRUPTIBLE CLEAN POWER', 84, 72);

  // Digital Monitor Display
  ctx.fillStyle = '#03140e';
  ctx.fillRect(30, 106, 460, 140);
  ctx.strokeStyle = '#0e4a34';
  ctx.lineWidth = 3;
  ctx.strokeRect(30, 106, 460, 140);

  ctx.fillStyle = '#34d399';
  ctx.font = 'bold 15px monospace';
  ctx.fillText('LINE ISOLATION: > 999 kΩ  [SAFE]', 48, 138);
  ctx.fillText('LEAKAGE CURRENT: 14 µA    [NORMAL]', 48, 166);
  ctx.fillStyle = '#ffb85c';
  ctx.fillText('LINE VOLTAGE: 230.5 V · 50.0 Hz', 48, 194);
  ctx.fillStyle = '#38bdf8';
  ctx.fillText('UPS/INVERTER BUS: SYNCHRONIZED', 48, 222);

  // Status & Schematic Panel
  ctx.fillStyle = '#071626';
  ctx.fillRect(510, 106, 480, 140);
  ctx.strokeStyle = '#183e60';
  ctx.lineWidth = 2;
  ctx.strokeRect(510, 106, 480, 140);

  ctx.fillStyle = '#e8f3ff';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('نظام التغذية الكهربائية المعزولة لسرير العناية', 530, 140);
  ctx.fillStyle = '#34d399';
  ctx.font = '13px monospace';
  ctx.fillText('● SOURCE A (GRID): READY', 530, 172);
  ctx.fillText('● SOURCE B (INVERTER): ACTIVE', 530, 198);
  ctx.fillStyle = '#f59e0b';
  ctx.fillText('● EMERGENCY TRANSFER: < 10ms', 530, 224);

  // Socket Bay (7 Socket channels)
  const socketNames = [
    { label: 'VENTILATOR', sub: 'دعم الحياة', tag: 'CRITICAL', color: '#ef4444' },
    { label: 'MONITOR', sub: 'المؤشرات', tag: 'VITAL', color: '#10b981' },
    { label: 'INFUSION', sub: 'المحاليل', tag: 'PUMPS', color: '#10b981' },
    { label: 'SYRINGE', sub: 'الحقن', tag: 'PRECISION', color: '#10b981' },
    { label: 'DEFIB', sub: 'الصدمات', tag: 'EMERGENCY', color: '#ef4444' },
    { label: 'INCUBATOR', sub: 'الحاضنة', tag: 'NEONATAL', color: '#f59e0b' },
    { label: 'O2 CONC', sub: 'الأكسجين', tag: 'MEDICAL', color: '#3b82f6' }
  ];

  socketNames.forEach((s, idx) => {
    const sx = 30 + idx * 138;
    ctx.fillStyle = '#061320';
    ctx.fillRect(sx, 260, 128, 230);
    ctx.strokeStyle = s.color;
    ctx.lineWidth = 2;
    ctx.strokeRect(sx, 260, 128, 230);

    // Socket header
    ctx.fillStyle = s.color;
    ctx.fillRect(sx, 260, 128, 28);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`CH 0${idx + 1} · ${s.tag}`, sx + 64, 278);

    // Socket circle
    ctx.fillStyle = '#0b1a29';
    ctx.beginPath();
    ctx.arc(sx + 64, 345, 36, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#234a6e';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Pin holes
    ctx.fillStyle = '#02070c';
    ctx.beginPath(); ctx.arc(sx + 50, 345, 7, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(sx + 78, 345, 7, 0, Math.PI * 2); ctx.fill();

    // Earth clip
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(sx + 64, 316); ctx.lineTo(sx + 64, 324); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(sx + 64, 366); ctx.lineTo(sx + 64, 374); ctx.stroke();

    // Labels
    ctx.fillStyle = '#e8f3ff';
    ctx.font = 'bold 12px monospace';
    ctx.fillText(s.label, sx + 64, 415);
    ctx.fillStyle = '#8eaac6';
    ctx.font = '11px sans-serif';
    ctx.fillText(s.sub, sx + 64, 436);

    ctx.fillStyle = s.color;
    ctx.font = '10px monospace';
    ctx.fillText('230V 16A', sx + 64, 465);
  });
  ctx.textAlign = 'start';

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createCableGland(position, rotation = [0, 0, 0], scale = 1, isBrass = true) {
  const g = new THREE.Group();
  g.position.set(...position);
  g.rotation.set(...rotation);
  g.scale.setScalar(scale);

  const metalMat = isBrass
    ? new THREE.MeshStandardMaterial({ color: '#d4af37', roughness: 0.28, metalness: 0.88 })
    : new THREE.MeshStandardMaterial({ color: '#b8c9db', roughness: 0.22, metalness: 0.92 });
  const rubberMat = new THREE.MeshStandardMaterial({ color: '#161d26', roughness: 0.85 });

  const hex = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.048, 0.022, 6), metalMat);
  g.add(hex);
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.042, 0.032, 16), metalMat);
  collar.position.y = 0.024;
  g.add(collar);
  const rubber = new THREE.Mesh(new THREE.CylinderGeometry(0.034, 0.028, 0.026, 16), rubberMat);
  rubber.position.y = 0.048;
  g.add(rubber);

  return g;
}

function createHospitalPlug(position, rotation = [0, 0, 0], color = '#1a2634') {
  const g = new THREE.Group();
  g.position.set(...position);
  g.rotation.set(...rotation);

  const plugMat = new THREE.MeshStandardMaterial({ color, roughness: 0.6, metalness: 0.2 });
  const ledMat = new THREE.MeshStandardMaterial({ color: '#2cd89f', emissive: '#2cd89f', emissiveIntensity: 0.9 });

  const body = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.065, 0.042), plugMat);
  g.add(body);
  const boot = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.026, 0.038, 12), plugMat);
  boot.position.y = -0.045;
  g.add(boot);

  const led = new THREE.Mesh(new THREE.SphereGeometry(0.007, 8, 8), ledMat);
  led.position.set(0, 0.022, 0.022);
  g.add(led);

  return g;
}

function createCableClamp(position, rotation = [0, 0, 0]) {
  const g = new THREE.Group();
  g.position.set(...position);
  g.rotation.set(...rotation);
  const mat = new THREE.MeshStandardMaterial({ color: '#7e93a8', roughness: 0.35, metalness: 0.85 });
  const hoop = new THREE.Mesh(new THREE.TorusGeometry(0.042, 0.008, 8, 16, Math.PI), mat);
  hoop.rotation.z = Math.PI;
  g.add(hoop);
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.01, 0.028), mat);
  base.position.y = -0.042;
  g.add(base);
  return g;
}

function createIECInlet(position, rotation = [0, 0, 0]) {
  const g = new THREE.Group();
  g.position.set(...position);
  g.rotation.set(...rotation);

  const bezelMat = new THREE.MeshStandardMaterial({ color: '#161d26', roughness: 0.7 });
  const switchMat = new THREE.MeshStandardMaterial({ color: '#ef4444', emissive: '#ef4444', emissiveIntensity: 0.4 });

  const bezel = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.08, 0.015), bezelMat);
  g.add(bezel);
  const socketCavity = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.045, 0.02), new THREE.MeshBasicMaterial({ color: '#090d12' }));
  socketCavity.position.set(0, -0.012, 0.005);
  g.add(socketCavity);
  const rocker = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.028, 0.012), switchMat);
  rocker.position.set(0, 0.024, 0.006);
  g.add(rocker);

  return g;
}

// INDUSTRIAL GALVANIZED WIRE-MESH CABLE TRAY SYSTEM (حوامل كابلات صناعية مجلفنة)
function createCableTraySegment(startPos, endPos, width = 0.22, height = 0.045, rungSpacing = 0.28) {
  const g = new THREE.Group();
  const v1 = new THREE.Vector3(...startPos);
  const v2 = new THREE.Vector3(...endPos);
  const delta = new THREE.Vector3().subVectors(v2, v1);
  const len = delta.length();
  if (len < 0.05) return g;

  const mid = new THREE.Vector3().addVectors(v1, v2).multiplyScalar(0.5);
  g.position.copy(mid);

  const dir = delta.clone().normalize();
  const trayMat = new THREE.MeshStandardMaterial({
    color: '#8ea3ba',
    roughness: 0.32,
    metalness: 0.88,
  });

  const sub = new THREE.Group();

  // Left & right perforated side rails
  const railGeom = new THREE.BoxGeometry(0.012, height, len);
  const leftRail = new THREE.Mesh(railGeom, trayMat);
  leftRail.position.set(-width / 2, height / 2, 0);
  sub.add(leftRail);

  const rightRail = new THREE.Mesh(railGeom, trayMat);
  rightRail.position.set(width / 2, height / 2, 0);
  sub.add(rightRail);

  // Bottom mesh bed
  const baseGeom = new THREE.BoxGeometry(width - 0.01, 0.005, len);
  const baseMat = new THREE.MeshStandardMaterial({ color: '#52677d', roughness: 0.45, metalness: 0.78 });
  const base = new THREE.Mesh(baseGeom, baseMat);
  base.position.set(0, 0.003, 0);
  sub.add(base);

  // Heavy cross rungs along the length
  const numRungs = Math.max(2, Math.floor(len / rungSpacing));
  const rungGeom = new THREE.CylinderGeometry(0.005, 0.005, width - 0.01, 8);
  for (let i = 0; i <= numRungs; i++) {
    const zPos = -len / 2 + (i / numRungs) * len;
    const rung = new THREE.Mesh(rungGeom, trayMat);
    rung.rotation.z = Math.PI / 2;
    rung.position.set(0, 0.008, zPos);
    sub.add(rung);
  }

  // Heavy floor mounting stanchions down to y = 0
  const floorDist = Math.max(0.02, v1.y);
  const stanchionGeom = new THREE.BoxGeometry(width + 0.04, floorDist, 0.024);
  const stanchionMat = new THREE.MeshStandardMaterial({ color: '#3d5062', roughness: 0.45, metalness: 0.85 });
  const pCount = Math.max(2, Math.ceil(len / 1.5));
  for (let p = 0; p < pCount; p++) {
    const pz = -len / 2 + (p / (pCount - 1)) * len;
    const stanchion = new THREE.Mesh(stanchionGeom, stanchionMat);
    stanchion.position.set(0, -floorDist / 2, pz);
    sub.add(stanchion);

    // Stanchion floor footplate
    const footPlate = new THREE.Mesh(new THREE.BoxGeometry(width + 0.08, 0.008, 0.07), stanchionMat);
    footPlate.position.set(0, -floorDist + 0.004, pz);
    sub.add(footPlate);
  }

  sub.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir);
  g.add(sub);
  return g;
}

// SOLAR MC4 WEATHERPROOF CONNECTOR (موصلات طاقة شمسية MC4)
function createMC4Connector(position, rotation = [0, 0, 0], isPositive = true) {
  const g = new THREE.Group();
  g.position.set(...position);
  g.rotation.set(...rotation);

  const bodyMat = new THREE.MeshStandardMaterial({ color: '#141c26', roughness: 0.55 });
  const bandMat = new THREE.MeshStandardMaterial({
    color: isPositive ? '#ef4444' : '#1e3a8a',
    roughness: 0.35,
    metalness: 0.2
  });

  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.075, 12), bodyMat);
  g.add(body);
  const lock = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.026, 0.038), bodyMat);
  g.add(lock);
  const band = new THREE.Mesh(new THREE.CylinderGeometry(0.017, 0.017, 0.012, 12), bandMat);
  band.position.y = 0.022;
  g.add(band);

  return g;
}

// HEAVY-DUTY COPPER CRIMP TERMINAL LUG (أطراف توصيل نحاسية معزولة)
function createCableLug(position, rotation = [0, 0, 0], isPositive = true) {
  const g = new THREE.Group();
  g.position.set(...position);
  g.rotation.set(...rotation);

  const copperMat = new THREE.MeshStandardMaterial({ color: '#d97706', roughness: 0.25, metalness: 0.92 });
  const shrinkMat = new THREE.MeshStandardMaterial({
    color: isPositive ? '#dc2626' : '#0f172a',
    roughness: 0.75
  });

  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.045, 12), shrinkMat);
  g.add(barrel);

  const tongue = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.008, 16), copperMat);
  tongue.position.y = 0.028;
  g.add(tongue);

  const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.014, 6), MAT.steel);
  bolt.position.y = 0.032;
  g.add(bolt);

  return g;
}

// BILLBOARDED 3D CABLE IDENTIFICATION TAG (بطاقة تعريف كابل ثلاثية الأبعاد)
function createCableTagFlag(title, subtitle, position, color = '#38bdf8') {
  const g = new THREE.Group();
  g.position.set(...position);

  const canvas = document.createElement('canvas');
  canvas.width = 384;
  canvas.height = 96;
  const ctx = canvas.getContext('2d');

  // Background card
  ctx.fillStyle = 'rgba(7, 18, 32, 0.94)';
  ctx.beginPath();
  ctx.roundRect(4, 4, 376, 88, 14);
  ctx.fill();

  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.stroke();

  // Color accent tab
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(6, 6, 12, 84, 5);
  ctx.fill();

  // Arabic Title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px "Tajawal", system-ui, sans-serif';
  ctx.textAlign = 'right';
  ctx.direction = 'rtl';
  ctx.fillText(title, 360, 42);

  // Subtitle / Rating
  ctx.fillStyle = '#9cb8d9';
  ctx.font = '600 18px "JetBrains Mono", monospace';
  ctx.direction = 'ltr';
  ctx.textAlign = 'left';
  ctx.fillText(subtitle, 32, 74);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;

  const mat = new THREE.MeshBasicMaterial({
    map: tex,
    transparent: true,
    opacity: 0.95,
    side: THREE.DoubleSide
  });

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 0.06), mat);
  mesh.userData.isCableTag = true;
  g.add(mesh);

  // Metallic clip ring to wire
  const ringMat = new THREE.MeshStandardMaterial({ color: '#c4d3e2', roughness: 0.3, metalness: 0.85 });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.024, 0.005, 8, 16), ringMat);
  ring.position.set(-0.12, 0, 0);
  ring.rotation.y = Math.PI / 2;
  g.add(ring);

  return g;
}

const MAT = {
  dark: new THREE.MeshStandardMaterial({ color: '#142338', roughness: 0.45, metalness: 0.4 }),
  steel: new THREE.MeshStandardMaterial({ color: '#c4d3e2', roughness: 0.25, metalness: 0.8 }),
  white: new THREE.MeshStandardMaterial({ color: '#f2f6fa', roughness: 0.5 }),
  blue: new THREE.MeshStandardMaterial({ color: '#1a5ea6', roughness: 0.35, metalness: 0.3 }),
  glass: new THREE.MeshStandardMaterial({ color: '#113554', roughness: 0.12, metalness: 0.2, transparent: true, opacity: 0.82 }),
  rubber: new THREE.MeshStandardMaterial({ color: '#111a26', roughness: 0.9 }),
  green: new THREE.MeshStandardMaterial({ color: '#2cd89f', emissive: '#0c734e', emissiveIntensity: 0.45 }),
  orange: new THREE.MeshStandardMaterial({ color: '#ffb356', emissive: '#753b11', emissiveIntensity: 0.35 }),
  red: new THREE.MeshStandardMaterial({ color: '#f75670', emissive: '#781527', emissiveIntensity: 0.35 }),
};

// 8 Cinematic Tour Steps with Studio Human Voice files
export const TOUR_STEPS = [
  {
    id: 'overview',
    audioFile: './audio/step_0.mp3',
    title: 'نظرة شاملة على منظومة طاقة العناية المركزة',
    en: 'ICU Critical Power System Overview',
    camPos: new THREE.Vector3(12.5, 10.5, 13.5),
    lookAt: new THREE.Vector3(0.5, 0.8, -0.8),
    timeCode: '00:00 / 02:40',
    targetId: null,
    narration: 'مرحباً بكم في العرض التفاعلي لمختبر طاقة العناية المركزة. صُممت هذه المنظومة الهجينة لتأمين طاقة كهربائية مستمرة بنسبة مئة بالمئة لأجهزة دعم الحياة الحرجة. تدمج المنظومة بين الطاقة الشمسية الكهروضوئية، وبنك بطاريات الليثيوم، وتغذية الشبكة الكهربائية مع مفتاح تحويل تلقائي سريع لضمان عدم توقف أجهزة المريض نهائياً.',
  },
  {
    id: 'solar',
    audioFile: './audio/step_1.mp3',
    title: 'حقل الألواح الشمسية الكهروضوئية (PV Array)',
    en: 'Solar Photovoltaic Generation (2400 Wp)',
    camPos: new THREE.Vector3(-5.5, 4.4, 1.8),
    lookAt: new THREE.Vector3(-6.2, 1.3, -3.2),
    timeCode: '00:20 / 02:40',
    targetId: 'solar',
    narration: 'تتكون مصفوفة التوليد الشمسي من ستة ألواح كهروضوئية أحادية البلورة بقدرة إجمالية تبلغ ألفين وأربعمئة واط. الألواح مثبتة على هيكل معدني مجلفن مائل بزاوية ثلاثين درجة لامتصاص أقصى إشعاع، وتقوم بتحويل ضوء الشمس إلى تيار مستمر لتغذية الأحمال وشحن بنك البطاريات.',
  },
  {
    id: 'mppt',
    audioFile: './audio/step_2.mp3',
    title: 'منظم الشحن الذكي بتقنية MPPT',
    en: 'Maximum Power Point Tracking Controller',
    camPos: new THREE.Vector3(-2.6, 2.8, -0.5),
    lookAt: new THREE.Vector3(-3.2, 1.3, -3.2),
    timeCode: '00:40 / 02:40',
    targetId: 'mppt',
    narration: 'منظّم الشحن الذكي بتقنية إم بي بي تي يعمل بكفاءة تحويل فائقة تصل إلى سبعة وتسعين بالمئة. يتتبع باستمرار نقطة الاستطاعة العظمى للألواح الشمسية مع تغير شدة الإشعاع، ومزود بمشتت حراري متطور وزعانف تبريد لحماية بنك البطاريات من التيارات الزائدة.',
  },
  {
    id: 'battery',
    audioFile: './audio/step_3.mp3',
    title: 'كابينة بنك بطاريات الليثيوم (Rack Storage)',
    en: 'Lithium Battery Storage (9.6 kWh / 48V)',
    camPos: new THREE.Vector3(-2.2, 2.7, 3.5),
    lookAt: new THREE.Vector3(-3.2, 1.0, 0.5),
    timeCode: '01:00 / 02:40',
    targetId: 'battery',
    narration: 'كابينة بنك بطاريات الليثيوم بتصميم خوادم صناعي يضم أربع وحدات بسعة إجمالية تسعة فاصل ستة كيلوواط ساعي، بجهد ثمانية وأربعين فولت. تمثل خط الأمان الأساسي ضد انقطاعات الكهرباء ومزودة بنظام إدارة البطارية الذكي بي إم إس لمراقبة خلايا الطاقة.',
  },
  {
    id: 'inverter',
    audioFile: './audio/step_4.mp3',
    title: 'العاكس الهجين ذو الموجة الجيبية النقية',
    en: 'Hybrid Pure Sine Wave Inverter (2000 W)',
    camPos: new THREE.Vector3(0.1, 2.9, -0.3),
    lookAt: new THREE.Vector3(0.0, 1.3, -3.2),
    timeCode: '01:20 / 02:40',
    targetId: 'inverter',
    narration: 'العاكس الهجين بقدرة مستمرة ألفي واط وكفاءة أربعة وتسعين بالمئة. يقوم بتحويل التيار المستمر ثمانية وأربعين فولت إلى تيار متناوب مئتين وعشرين فولت بموجة جيبية نقية، وهو شرط أساسي لحماية الأجهزة الطبية الحساسة وأجهزة التنفس من التشوهات الكهربائية.',
  },
  {
    id: 'ats',
    audioFile: './audio/step_5.mp3',
    title: 'مفتاح التحويل التلقائي السريع (Static ATS)',
    en: 'Automatic Transfer Switch (< 10 ms)',
    camPos: new THREE.Vector3(3.2, 2.9, -0.3),
    lookAt: new THREE.Vector3(3.2, 1.3, -3.2),
    timeCode: '01:40 / 02:40',
    targetId: 'ats',
    narration: 'مفتاح التحويل التلقائي إي تي إس هو صمام الأمان والتحكم بين الشبكة والعاكس. في حال انقطاع الشبكة العمومية، يقوم بالتحويل إلى طاقة البطاريات في زمن قياسي يقل عن عشرة ميلي ثانية، وهي سرعة فائقة تمنع إعادة إقلاع الأجهزة أو انقطاع التغذية عن المريض.',
  },
  {
    id: 'icu',
    audioFile: './audio/step_6.mp3',
    title: 'سرير العناية المركزة والأجهزة الطبية الحيوية',
    en: 'ICU Bed & Critical Medical Equipment',
    camPos: new THREE.Vector3(6.5, 4.2, 5.2),
    lookAt: new THREE.Vector3(6.2, 1.4, 1.0),
    timeCode: '02:00 / 02:40',
    targetId: 'icu',
    narration: 'منطقة العناية المركزة تضم السرير الطبي الهيدروليكي، جهاز التنفس الاصطناعي مع أنابيب التنفس المرنة، شاشة مراقبة المؤشرات الحيوية بموجة تخطيط القلب الحية، وحامل المحاليل مع مضخات الحقن الدقيقة وأجهزة الصدمات الكهربائية.',
  },
  {
    id: 'outage-test',
    audioFile: './audio/step_7.mp3',
    title: 'محاكاة عملية: اختبار انقطاع مفاجئ للشبكة',
    en: 'Live Grid Outage & Battery Support Test',
    camPos: new THREE.Vector3(7.5, 6.2, 9.5),
    lookAt: new THREE.Vector3(0.5, 1.0, -0.5),
    timeCode: '02:20 / 02:40',
    targetId: null,
    action: 'grid-toggle',
    narration: 'نختبر الآن محاكاة انقطاع مفاجئ للشبكة الكهربائية. تلاحظون فوراً تحول مسار التغذية إلى البطارية والعاكس، وتستمر جميع الأجهزة الطبية ومؤشرات المريض الحيوية بالعمل باستقرار تام دون أدنى تأثر، محققة الهدف الهندسي والسريري للمنظومة.',
  }
];

export function getAudioCandidateUrls(relPath) {
  if (!relPath) return [];
  const clean = relPath.replace(/^(\.\/|\/)/, '');
  const fileName = clean.replace(/^.*[\/]/, '');

  if (typeof window === 'undefined') return [relPath];

  const loc = window.location;
  const origin = loc.origin || '';
  const pathname = loc.pathname || '/';
  const pathParts = pathname.split('/').filter(Boolean);
  const repoName = (pathParts.length > 0 && !pathParts[0].includes('.')) ? pathParts[0] : '';
  const repoBase = repoName ? ('/' + repoName + '/') : '/';

  const list = [
    origin + repoBase + 'audio/' + fileName,
    origin + repoBase + 'public/audio/' + fileName,
    './audio/' + fileName,
    './public/audio/' + fileName,
    '/audio/' + fileName,
    'audio/' + fileName,
    relPath
  ];

  return [...new Set(list.filter(Boolean))];
}

export function resolveAudioUrl(relPath) {
  const candidates = getAudioCandidateUrls(relPath);
  return candidates[0] || relPath;
}

export class EnergyWorld3D {
  constructor(container, { onSelect = () => {}, onTourChange = () => {}, onEvent = () => {} } = {}) {
    this.container = container;
    this.onSelect = onSelect;
    this.onTourChange = onTourChange;
    this.onEvent = onEvent;
    this.groups = new Map();
    this.deviceScreens = new Map();
    this.pathDots = [];
    this.pathMeshes = [];
    this.showConnections = true;
    this.selectedId = null;
    this.currentState = { irradiance: 70, soc: 71, gridAvailable: true, loadW: 695 };
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.atsSparkLight = null;
    this.atsSparkTime = null;

    this.tourIndex = 0;
    this.tourPlaying = false;
    this.tourTimer = null;
    this.voiceEnabled = true; // Natural studio voice enabled by default!
    this.currentAudio = null;

    // Lifelike ICU Patient Animation References
    this.patientChest = null;
    this.patientBlanket = null;
    this.spo2SensorLed = null;
    this.patientChestBaseY = 0.12;
    this.patientBlanketBaseY = 0;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#060e1a');
    this.scene.fog = new THREE.Fog('#060e1a', 28, 75);

    this.camera = new THREE.PerspectiveCamera(40, 1, 0.1, 150);
    this.camera.position.set(10.8, 9.2, 12.5);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;
    this.renderer.domElement.className = 'three-canvas';
    this.renderer.domElement.style.touchAction = 'none';
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 0.8, 0);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.075;
    this.controls.maxPolarAngle = Math.PI * 0.485;
    this.controls.minDistance = 2.5;
    this.controls.maxDistance = 32.0;
    this.controls.update();

    // Photorealistic Procedural Textures
    this.solarTexture = createPhotorealisticSolarTexture();
    this.batteryRackTexture = createBatteryRackTexture();
    this.mpptTexture = createMPPTTexture();
    this.atsTexture = createATSTexture();
    this.utilityMeterTexture = createUtilityMeterTexture();
    this.ecgTexture = this.createECGTexture();
    this.ventTexture = this.createVentilatorTexture();
    this.inverterTexture = this.createInverterTexture();
    this.medicalConsoleTexture = createMedicalConsoleTexture();

    this.setupLights();
    this.setupRoom();
    this.buildSystem();
    this.buildPowerPaths();
    this.attachEvents();

    // Fullscreen listeners & Escape key handler
    this.onFullscreenChange = () => {
      const isNativeFull = !!(document.fullscreenElement || document.webkitFullscreenElement);
      if (!isNativeFull && this.container.classList.contains('fake-fullscreen')) {
        // fake fullscreen active
      } else {
        this.updateFullscreenUI(isNativeFull);
      }
      this.triggerFullscreenResize();
    };
    document.addEventListener('fullscreenchange', this.onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', this.onFullscreenChange);

    this.onKeyDown = (e) => {
      if (e.key === 'Escape' && this.container.classList.contains('fake-fullscreen')) {
        this.exitFullscreen();
      }
    };
    window.addEventListener('keydown', this.onKeyDown);

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.container);
    this.resize();

    this.clock = new THREE.Clock();
    this.animate = this.animate.bind(this);
    this.frameId = requestAnimationFrame(this.animate);
  }

  createECGTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256; canvas.height = 160;
    const ctx = canvas.getContext('2d');
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return {
      texture,
      update: (elapsed) => {
        ctx.fillStyle = '#061320';
        ctx.fillRect(0, 0, 256, 160);
        ctx.strokeStyle = '#0e263d';
        ctx.lineWidth = 1;
        for (let x = 0; x < 256; x += 16) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 160); ctx.stroke(); }
        for (let y = 0; y < 160; y += 16) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(256, y); ctx.stroke(); }
        
        ctx.fillStyle = '#33d6a6';
        ctx.font = 'bold 15px monospace';
        ctx.fillText('HR: 75 bpm', 10, 22);
        ctx.fillStyle = '#5b8cff';
        ctx.fillText('SpO2: 98%', 135, 22);
        ctx.fillStyle = '#ffb85c';
        ctx.fillText('BP: 120/80', 10, 42);

        ctx.strokeStyle = '#33d6a6';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        const speed = elapsed * 105;
        for (let x = 0; x < 256; x++) {
          const pos = (x + speed) % 256;
          let y = 100;
          const cycle = pos % 80;
          if (cycle > 28 && cycle < 33) y -= 10;
          else if (cycle >= 33 && cycle < 36) y += 6;
          else if (cycle >= 36 && cycle < 42) y -= 44;
          else if (cycle >= 42 && cycle < 46) y += 14;
          else if (cycle >= 52 && cycle < 62) y -= 14;
          
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        const scanX = speed % 256;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(scanX, 52, 2.5, 96);
        texture.needsUpdate = true;
      }
    };
  }

  createVentilatorTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256; canvas.height = 160;
    const ctx = canvas.getContext('2d');
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return {
      texture,
      update: (elapsed) => {
        ctx.fillStyle = '#081729';
        ctx.fillRect(0, 0, 256, 160);
        ctx.fillStyle = '#64dcb8';
        ctx.font = 'bold 14px monospace';
        ctx.fillText('ICU VENTILATOR', 10, 22);
        ctx.fillStyle = '#a5c4e3';
        ctx.font = '12px monospace';
        ctx.fillText('SIMV · Vt: 480ml', 10, 44);
        ctx.fillText('P_peak: 21 cmH2O', 10, 64);
        ctx.fillText('RR: 15 /min · FiO2: 40%', 10, 84);

        ctx.strokeStyle = '#5b8cff';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        const t = elapsed * 3.2;
        for (let x = 0; x < 236; x++) {
          const wave = Math.sin((x * 0.05) - t);
          const y = 142 - Math.max(0, wave) * 26;
          if (x === 0) ctx.moveTo(x + 10, y);
          else ctx.lineTo(x + 10, y);
        }
        ctx.stroke();
        texture.needsUpdate = true;
      }
    };
  }

  createInverterTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256; canvas.height = 128;
    const ctx = canvas.getContext('2d');
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return {
      texture,
      update: (watts, soc) => {
        ctx.fillStyle = '#061713';
        ctx.fillRect(0, 0, 256, 128);
        ctx.strokeStyle = '#184f3c';
        ctx.lineWidth = 3;
        ctx.strokeRect(3, 3, 250, 122);

        ctx.fillStyle = '#33d6a6';
        ctx.font = 'bold 15px monospace';
        ctx.fillText('INVERTER 2000W PURE SINE', 14, 26);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 26px monospace';
        ctx.fillText(`${Math.round(watts)} W`, 14, 62);
        ctx.font = '13px monospace';
        ctx.fillStyle = '#78e5c4';
        ctx.fillText('AC 220V 50Hz · LOAD OK', 14, 88);
        ctx.fillText(`BAT 48V · SOC: ${Math.round(soc)}%`, 14, 110);
        texture.needsUpdate = true;
      }
    };
  }

  setupLights() {
    this.scene.add(new THREE.HemisphereLight('#d4ecff', '#142030', 2.2));
    const sun = new THREE.DirectionalLight('#fff2dc', 3.8);
    sun.position.set(6, 14, 8); sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.left = -14; sun.shadow.camera.right = 14;
    sun.shadow.camera.top = 14; sun.shadow.camera.bottom = -14;
    this.scene.add(sun);
    this.sunLight = sun;

    const medicalGlow = new THREE.PointLight('#5ce0bb', 22, 18);
    medicalGlow.position.set(6.2, 4.2, 1.2); this.scene.add(medicalGlow);

    const powerGlow = new THREE.PointLight('#3c96ff', 24, 22);
    powerGlow.position.set(-2.0, 4.2, -2.5); this.scene.add(powerGlow);

    // Dynamic ATS Contactor Spark Light
    const atsSpark = new THREE.PointLight('#8bf5ff', 0, 10);
    atsSpark.position.set(3.2, 1.15, -2.8);
    this.scene.add(atsSpark);
    this.atsSparkLight = atsSpark;
  }

  setupRoom() {
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(64, 52), new THREE.MeshStandardMaterial({ color: '#0b1624', roughness: 0.85, metalness: 0.15 }));
    floor.rotation.x = -Math.PI / 2; floor.position.set(0, -0.035, -3.0); floor.receiveShadow = true; this.scene.add(floor);

    const grid = new THREE.GridHelper(64, 64, '#1e3852', '#0f2338');
    grid.position.set(0, -0.02, -3.0); grid.material.opacity = 0.55; grid.material.transparent = true; this.scene.add(grid);

    // Deep back wall pushed far behind equipment to prevent camera penetration during 360° rotation
    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(64, 18), new THREE.MeshStandardMaterial({ color: '#0d1d30', roughness: 0.82, side: THREE.FrontSide }));
    backWall.position.set(0, 9.0, -22.0); backWall.receiveShadow = true; this.scene.add(backWall);

    const strip = new THREE.Mesh(new THREE.BoxGeometry(64, 0.18, 0.05), new THREE.MeshStandardMaterial({ color: '#258bc9', emissive: '#104566', emissiveIntensity: 0.85 }));
    strip.position.set(0, 4.2, -21.96); this.scene.add(strip);

    const baseboard = new THREE.Mesh(new THREE.BoxGeometry(64, 0.4, 0.06), new THREE.MeshStandardMaterial({ color: '#132438', roughness: 0.5 }));
    baseboard.position.set(0, 0.2, -21.96); this.scene.add(baseboard);

    // 1. Reinforced Power Station Concrete Plinth Pad (Spacious equipment pad)
    const plinth = new THREE.Mesh(new THREE.BoxGeometry(14.2, 0.16, 7.2), new THREE.MeshStandardMaterial({ color: '#122234', roughness: 0.70, metalness: 0.2 }));
    plinth.position.set(-1.8, 0.08, -1.8); plinth.receiveShadow = true; this.scene.add(plinth);

    const plinthAccent = new THREE.Mesh(new THREE.BoxGeometry(14.1, 0.03, 0.08), new THREE.MeshStandardMaterial({ color: '#f59e0b', roughness: 0.4 }));
    plinthAccent.position.set(-1.8, 0.165, 1.76); this.scene.add(plinthAccent);

    // 2. Sterile Medical ICU Raised Floor Plinth
    const medPlinth = new THREE.Mesh(new THREE.BoxGeometry(6.6, 0.10, 6.2), new THREE.MeshStandardMaterial({ color: '#0e1f30', roughness: 0.65, metalness: 0.25 }));
    medPlinth.position.set(6.2, 0.05, 1.3); medPlinth.receiveShadow = true; this.scene.add(medPlinth);

    const medAccent = new THREE.Mesh(new THREE.BoxGeometry(6.5, 0.02, 0.06), new THREE.MeshStandardMaterial({ color: '#38bdf8', emissive: '#0284c7', emissiveIntensity: 0.8 }));
    medAccent.position.set(6.2, 0.105, -1.76); this.scene.add(medAccent);
  }

  buildSystem() {
    this.makeSolar();
    this.makeController();
    this.makeBattery();
    this.makeInverter();
    this.makeAts();
    this.makeGridSource();
    this.makeIcu();

    this.addLabel('solar', 'مصفوفة الألواح', new THREE.Vector3(-6.2, 2.1, -3.2), 2.35);
    this.addLabel('mppt', 'منظّم MPPT', new THREE.Vector3(-3.2, 2.3, -3.2), 1.9);
    this.addLabel('battery', 'بطارية 48V', new THREE.Vector3(-3.2, 2.0, 0.5), 1.65);
    this.addLabel('inverter', 'العاكس الهجين', new THREE.Vector3(0.0, 2.5, -3.2), 1.9);
    this.addLabel('ats', 'مفتاح ATS', new THREE.Vector3(3.2, 2.4, -3.2), 2.15);
    this.addLabel('grid', 'الشبكة', new THREE.Vector3(3.2, 1.7, -6.2), 1.25);
    this.addLabel('icu', 'منطقة العناية المركزة', new THREE.Vector3(6.2, 3.0, 1.0), 2.45);
  }

  registerGroup(id, group, component = true) {
    group.userData.selectId = id;
    group.userData.selectType = component ? 'component' : 'device';
    group.traverse(obj => {
      if (obj.isMesh) {
        obj.castShadow = true; obj.receiveShadow = true;
        if (!obj.userData.selectId) obj.userData.selectId = id;
        if (!obj.userData.selectType) obj.userData.selectType = component ? 'component' : 'device';
      }
    });
    this.scene.add(group);
    this.groups.set(id, group);
    return group;
  }

  addBox(group, name, size, pos, material, opts = {}) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
    mesh.position.set(...pos); mesh.name = name;
    if (opts.rotation) mesh.rotation.set(...opts.rotation);
    group.add(mesh);
    return mesh;
  }

  addCylinder(group, name, radiusTop, radiusBottom, height, pos, material, segments = 20) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments), material);
    mesh.position.set(...pos); mesh.name = name; group.add(mesh); return mesh;
  }

  makeSolar() {
    const g = new THREE.Group(); g.position.set(-6.2, 0.16, -3.2);

    const rackMat = new THREE.MeshStandardMaterial({ color: '#8599ad', roughness: 0.3, metalness: 0.85 });
    const footingMat = MAT.dark;
    const tilt = 0.36; // ~20.6 degrees tilt

    // 3 Leg frames along X: -1.4, 0.0, 1.4
    const frameX = [-1.4, 0.0, 1.4];

    // Concrete Footings and Vertical Posts (calculated strictly below rails to eliminate intersection)
    for (const x of frameX) {
      // Concrete footings at floor level
      this.addBox(g, 'concrete footing front', [0.36, 0.12, 0.36], [x, 0.06, 0.72], footingMat);
      this.addBox(g, 'concrete footing rear', [0.36, 0.12, 0.36], [x, 0.06, -0.72], footingMat);

      // Front vertical leg (stops exactly at underside of front rail y = 0.46)
      this.addBox(g, 'rack leg front', [0.08, 0.34, 0.08], [x, 0.29, 0.72], rackMat);

      // Rear vertical leg (stops exactly at underside of rear rail y = 1.04)
      this.addBox(g, 'rack leg rear', [0.08, 0.92, 0.08], [x, 0.58, -0.72], rackMat);

      // Inclined transverse rafter underneath rails (connecting front and rear post tops)
      this.addBox(g, 'rack inclined rafter', [0.06, 0.08, 1.62], [x, 0.75, 0], rackMat, { rotation: [-tilt, 0, 0] });

      // Diagonal sway brace (connecting rear leg base to underside of front post)
      this.addBox(g, 'rack diagonal brace', [0.045, 0.045, 1.48], [x, 0.32, 0], rackMat, { rotation: [0.18, 0, 0] });
    }

    // Longitudinal Mounting Rails running across all 3 frames (beneath the panels)
    this.addBox(g, 'mounting rail front', [4.35, 0.06, 0.08], [0, 0.50, 0.72], rackMat, { rotation: [-tilt, 0, 0] });
    this.addBox(g, 'mounting rail rear', [4.35, 0.06, 0.08], [0, 1.08, -0.72], rackMat, { rotation: [-tilt, 0, 0] });

    // Solar PV Panels (Resting cleanly ON TOP of the mounting rails)
    const panelMaterial = new THREE.MeshStandardMaterial({
      map: this.solarTexture,
      roughness: 0.16,
      metalness: 0.32,
    });
    this.panelMaterial = panelMaterial;

    const frameMat = new THREE.MeshStandardMaterial({ color: '#c5d5e5', roughness: 0.22, metalness: 0.9 });

    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 3; c++) {
        const x = -1.40 + c * 1.40;
        const z = -0.72 + r * 1.44;
        const y = 0.82 - z * 0.376;

        const panel = this.addBox(g, 'PV panel', [1.34, 0.045, 1.34], [x, y, z], panelMaterial, { rotation: [-tilt, 0, 0] });
        panel.userData.selectId = 'solar';

        // Anodized aluminum edge frame
        this.addBox(g, 'panel frame top', [1.36, 0.05, 0.03], [x, y + 0.26, z - 0.67], frameMat, { rotation: [-tilt, 0, 0] });
        this.addBox(g, 'panel frame bottom', [1.36, 0.05, 0.03], [x, y - 0.26, z + 0.67], frameMat, { rotation: [-tilt, 0, 0] });
        this.addBox(g, 'panel frame left', [0.03, 0.05, 1.34], [x - 0.67, y, z], frameMat, { rotation: [-tilt, 0, 0] });
        this.addBox(g, 'panel frame right', [0.03, 0.05, 1.34], [x + 0.67, y, z], frameMat, { rotation: [-tilt, 0, 0] });

        // Underside junction box
        this.addBox(g, 'junction box', [0.15, 0.06, 0.15], [x, y - 0.05, z], MAT.rubber, { rotation: [-tilt, 0, 0] });
      }
    }

    // Mid-clamps and end-clamps securing panels to rails
    for (const x of [-0.70, 0.70]) {
      for (const z of [-0.72, 0.72]) {
        const y = 0.82 - z * 0.376 + 0.035;
        this.addBox(g, 'solar clamp', [0.05, 0.06, 0.08], [x, y, z], MAT.steel, { rotation: [-tilt, 0, 0] });
      }
    }

    // Weatherproof Solar Array Combiner Box (Mounted at rear of array)
    const combiner = this.addBox(g, 'solar combiner box', [0.36, 0.44, 0.18], [1.8, 0.80, -0.74], MAT.dark);
    this.addBox(combiner, 'dc isolator rotary switch', [0.08, 0.08, 0.06], [1.8, 0.84, -0.64], MAT.red);
    this.addBox(combiner, 'solar danger label', [0.18, 0.09, 0.01], [1.8, 0.72, -0.64], MAT.orange);

    this.registerGroup('solar', g);
  }

  makeController() {
    const g = new THREE.Group(); g.position.set(-3.2, 0.16, -3.2);
    this.addBox(g, 'MPPT cabinet', [1.2, 1.62, 0.62], [0, 0.92, 0], MAT.dark);

    const faceMat = new THREE.MeshStandardMaterial({ map: this.mpptTexture, roughness: 0.35, metalness: 0.3 });
    const face = new THREE.Mesh(new THREE.PlaneGeometry(1.12, 1.54), faceMat);
    face.position.set(0, 0.92, 0.32);
    g.add(face);

    const finMat = new THREE.MeshStandardMaterial({ color: '#7a8e9e', roughness: 0.28, metalness: 0.85 });
    for (let i = 0; i < 9; i++) {
      const y = 0.35 + i * 0.13;
      this.addBox(g, 'heat sink fin', [0.05, 0.025, 0.54], [-0.61, y, 0], finMat);
      this.addBox(g, 'heat sink fin', [0.05, 0.025, 0.54], [0.61, y, 0], finMat);
    }

    for (let c = 0; c < 4; c++) {
      this.addCylinder(g, 'cable gland', 0.035, 0.035, 0.08, [-0.3 + c * 0.2, 0.08, 0.1], MAT.dark, 14);
    }

    this.registerGroup('mppt', g);
  }

  makeBattery() {
    const g = new THREE.Group(); g.position.set(-3.2, 0.16, 0.5);

    this.addBox(g, 'rack base', [1.52, 0.14, 0.92], [0, 0.07, 0], MAT.dark);
    this.addBox(g, 'rack frame', [1.46, 1.35, 0.86], [0, 0.78, 0], MAT.dark);

    const rackFaceMat = new THREE.MeshStandardMaterial({ map: this.batteryRackTexture, roughness: 0.3, metalness: 0.4 });
    const rackMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.36, 1.22), rackFaceMat);
    rackMesh.position.set(0, 0.78, 0.44);
    g.add(rackMesh);

    this.addBox(g, 'dc isolator box', [0.08, 0.26, 0.22], [0.74, 1.05, 0], MAT.dark);
    this.addCylinder(g, 'isolator rotary handle', 0.045, 0.045, 0.06, [0.8, 1.05, 0], MAT.red, 16).rotation.z = Math.PI / 2;

    this.addBox(g, 'battery charge bar frame', [0.8, 0.09, 0.045], [0, 1.44, 0.45], MAT.rubber);
    this.batteryBar = this.addBox(g, 'battery charge bar', [0.74, 0.055, 0.02], [-0.02, 1.44, 0.48], MAT.green);

    this.registerGroup('battery', g);
  }

  makeInverter() {
    const g = new THREE.Group(); g.position.set(0.0, 0.16, -3.2);
    
    this.addBox(g, 'inverter body', [1.4, 1.78, 0.72], [0, 0.98, 0], MAT.white);
    this.addBox(g, 'inverter bezel', [1.25, 1.62, 0.05], [0, 0.98, 0.38], MAT.dark);

    const screenMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.72, 0.42),
      new THREE.MeshBasicMaterial({ map: this.inverterTexture.texture })
    );
    screenMesh.position.set(0, 1.35, 0.42);
    g.add(screenMesh);

    for (let k = 0; k < 4; k++) {
      this.addBox(g, 'keypad button', [0.08, 0.05, 0.02], [-0.22 + k * 0.15, 1.05, 0.42], MAT.steel);
    }
    this.addBox(g, 'power rocker', [0.12, 0.08, 0.03], [0.35, 1.05, 0.42], MAT.green);

    this.addCylinder(g, 'cooling fan 1', 0.16, 0.16, 0.04, [-0.3, 0.45, 0.42], MAT.dark, 20).rotation.x = Math.PI / 2;
    this.addCylinder(g, 'cooling fan 2', 0.16, 0.16, 0.04, [0.3, 0.45, 0.42], MAT.dark, 20).rotation.x = Math.PI / 2;
    this.addBox(g, 'warning sticker', [0.24, 0.1, 0.01], [0, 0.74, 0.42], MAT.orange);

    this.registerGroup('inverter', g);
  }

  makeAts() {
    const g = new THREE.Group(); g.position.set(3.2, 0.16, -3.2);
    this.addBox(g, 'ATS cabinet', [1.2, 1.7, 0.66], [0, 0.94, 0], MAT.white);

    const doorMat = new THREE.MeshStandardMaterial({ map: this.atsTexture, roughness: 0.35, metalness: 0.3 });
    const door = new THREE.Mesh(new THREE.PlaneGeometry(1.12, 1.6), doorMat);
    door.position.set(0, 0.94, 0.34);
    g.add(door);

    this.addCylinder(g, 'ATS rotary switch', 0.08, 0.08, 0.08, [0, 0.94, 0.38], MAT.dark, 18).rotation.x = Math.PI / 2;
    
    // Animated Contactor Switch Lever!
    this.atsSwitchLever = this.addBox(g, 'switch handle', [0.24, 0.05, 0.05], [0, 0.94, 0.43], MAT.orange);

    this.atsUtilityLed = this.addCylinder(g, 'ATS utility LED', 0.05, 0.05, 0.03, [-0.32, 1.15, 0.36], MAT.green, 16);
    this.atsUtilityLed.rotation.x = Math.PI / 2;
    this.atsInverterLed = this.addCylinder(g, 'ATS inverter LED', 0.05, 0.05, 0.03, [0.32, 1.15, 0.36], MAT.orange, 16);
    this.atsInverterLed.rotation.x = Math.PI / 2;

    this.registerGroup('ats', g);
  }

  makeGridSource() {
    const g = new THREE.Group(); g.position.set(3.2, 0.0, -6.2);
    this.addBox(g, 'utility plinth', [1.45, 0.15, 0.98], [0, 0.07, 0], MAT.dark);
    this.addBox(g, 'utility pedestal', [0.96, 1.2, 0.62], [0, 0.68, 0], MAT.blue);

    const meterMat = new THREE.MeshStandardMaterial({ map: this.utilityMeterTexture, roughness: 0.35, metalness: 0.3 });
    const meterFace = new THREE.Mesh(new THREE.PlaneGeometry(0.86, 1.05), meterMat);
    meterFace.position.set(0, 0.68, 0.32);
    g.add(meterFace);

    this.gridIndicator = this.addCylinder(g, 'utility indicator', 0.08, 0.08, 0.05, [0, 1.15, 0.36], MAT.green, 18);
    this.gridIndicator.rotation.x = Math.PI / 2;

    this.registerGroup('grid', g);
  }

  makeIcu() {
    const g = new THREE.Group(); g.position.set(6.2, 0.0, 1.0);
    const bed = new THREE.Group(); bed.position.set(0.2, 0, 1.45);
    
    this.addBox(bed, 'bed base', [2.2, 0.15, 1.1], [0, 0.18, 0], MAT.dark);
    this.addCylinder(bed, 'hydraulic column', 0.18, 0.18, 0.45, [0, 0.45, 0], MAT.steel, 20);
    this.addBox(bed, 'bed main frame', [3.18, 0.16, 1.38], [0, 0.74, 0], MAT.steel);
    this.addBox(bed, 'mattress base', [3.08, 0.16, 1.28], [0, 0.88, 0], MAT.dark);
    this.addBox(bed, 'mattress top', [3.05, 0.14, 1.26], [0, 1.02, 0], new THREE.MeshStandardMaterial({ color: '#c2dff2', roughness: 0.75 }));
    this.addBox(bed, 'bed linen', [2.1, 0.05, 1.24], [0.38, 1.08, 0], MAT.white);
    this.addBox(bed, 'ergonomic pillow', [0.58, 0.15, 0.78], [-1.08, 1.12, 0], MAT.white);

    for (const x of [-1.35, 1.35]) {
      for (const z of [-0.55, 0.55]) {
        this.addCylinder(bed, 'caster fork', 0.045, 0.045, 0.18, [x, 0.18, z], MAT.steel, 12);
        this.addCylinder(bed, 'caster wheel 1', 0.09, 0.09, 0.05, [x, 0.08, z - 0.04], MAT.rubber, 16).rotation.z = Math.PI / 2;
        this.addCylinder(bed, 'caster wheel 2', 0.09, 0.09, 0.05, [x, 0.08, z + 0.04], MAT.rubber, 16).rotation.z = Math.PI / 2;
        this.addBox(bed, 'brake pedal', [0.08, 0.03, 0.04], [x + 0.05, 0.12, z], MAT.red);
      }
    }

    for (const z of [-0.68, 0.68]) {
      this.addBox(bed, 'head rail', [1.3, 0.32, 0.05], [-0.6, 1.22, z], MAT.steel);
      this.addBox(bed, 'patient control keypad', [0.22, 0.12, 0.02], [-0.6, 1.22, z + (z > 0 ? 0.03 : -0.03)], MAT.blue);
      this.addBox(bed, 'foot rail', [1.3, 0.32, 0.05], [0.8, 1.22, z], MAT.steel);
    }

    const ivPole = new THREE.Group(); ivPole.position.set(-1.42, 0, -0.68);
    this.addCylinder(ivPole, 'iv base', 0.22, 0.22, 0.08, [0, 0.06, 0], MAT.dark, 16);
    this.addCylinder(ivPole, 'iv post', 0.025, 0.025, 2.1, [0, 1.1, 0], MAT.steel, 16);
    for (let b = 0; b < 2; b++) {
      const bx = -0.15 + b * 0.3;
      this.addBox(ivPole, 'saline bag', [0.12, 0.24, 0.06], [bx, 2.05, 0], MAT.glass);
      this.addCylinder(ivPole, 'drip chamber', 0.015, 0.015, 0.06, [bx, 1.88, 0], MAT.glass);
      this.addCylinder(ivPole, 'iv tube', 0.006, 0.006, 0.6, [bx, 1.55, 0.1], MAT.glass);
    }
    bed.add(ivPole);

    this.makePatient(bed);

    g.add(bed);

    this.makeDeviceUnit(g, 'vent', [-1.45, 0, -0.15], 'ventilator');
    this.makeDeviceUnit(g, 'monitor', [-0.1, 0, -0.28], 'monitor');
    this.makeDeviceUnit(g, 'infusion', [1.15, 0, -0.2], 'pumps');
    this.makeDeviceUnit(g, 'syringe', [2.15, 0, 0.45], 'syringe');
    this.makeDeviceUnit(g, 'defib', [-1.8, 0, 1.25], 'defib');
    this.makeDeviceUnit(g, 'incubator', [1.85, 0, 2.6], 'incubator');
    this.makeDeviceUnit(g, 'oxygen', [-2.1, 0, 2.8], 'oxygen');

    this.registerGroup('icu', g);
  }

  // Realistic Human Patient Character in ICU Bed
  makePatient(bed) {
    const patient = new THREE.Group();
    patient.name = 'icu patient character';
    patient.position.set(-0.1, 1.05, 0.02);

    // Anatomical & Medical Materials
    const skinMat = new THREE.MeshStandardMaterial({ color: '#dfb59c', roughness: 0.65, metalness: 0.04 });
    const skinFeatureMat = new THREE.MeshStandardMaterial({ color: '#c79275', roughness: 0.7 });
    const hairMat = new THREE.MeshStandardMaterial({ color: '#2b211a', roughness: 0.85 });
    const gownMat = new THREE.MeshStandardMaterial({ color: '#458599', roughness: 0.75 }); // Clinical teal gown
    const gownTrimMat = new THREE.MeshStandardMaterial({ color: '#e2e8f0', roughness: 0.8 });
    const blanketMat = new THREE.MeshStandardMaterial({ color: '#274b62', roughness: 0.85 }); // Hospital thermal quilt
    const sheetMat = new THREE.MeshStandardMaterial({ color: '#f8fafc', roughness: 0.9 }); // Crisp white turned sheet
    const sockMat = new THREE.MeshStandardMaterial({ color: '#e2e8f0', roughness: 0.85 }); // Anti-slip socks
    const treadMat = new THREE.MeshStandardMaterial({ color: '#facc15', roughness: 0.4 }); // Yellow skid dots
    const maskMat = new THREE.MeshPhysicalMaterial({ color: '#93c5fd', transmission: 0.85, opacity: 0.65, transparent: true, roughness: 0.25, ior: 1.45 });
    const strapMat = new THREE.MeshStandardMaterial({ color: '#64748b', roughness: 0.6 });
    const wristbandMat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.35 });
    const tegadermMat = new THREE.MeshStandardMaterial({ color: '#e0f2fe', transparent: true, opacity: 0.6, roughness: 0.3 });
    const ivPortMat = new THREE.MeshStandardMaterial({ color: '#0284c7', roughness: 0.4 });

    // 1. HEAD & FACIAL ANATOMY (Centered on the ergonomic pillow at X ≈ -0.98)
    const headGroup = new THREE.Group();
    headGroup.position.set(-0.98, 0.16, 0);

    // Cranium (Head shape)
    const cranium = new THREE.Mesh(new THREE.SphereGeometry(0.165, 24, 20), skinMat);
    cranium.scale.set(1.10, 0.98, 0.92);
    headGroup.add(cranium);

    // Jaw / Chin
    const jaw = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.08, 0.12, 16), skinMat);
    jaw.position.set(0.08, -0.06, 0);
    jaw.rotation.z = Math.PI / 6;
    headGroup.add(jaw);

    // Realistic Hair (Natural styled hair covering top and back of head)
    const hairCrown = new THREE.Mesh(new THREE.SphereGeometry(0.174, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.56), hairMat);
    hairCrown.rotation.z = -0.15;
    hairCrown.position.set(-0.02, 0.02, 0);
    headGroup.add(hairCrown);

    // Hair sides / back volume
    const hairBack = new THREE.Mesh(new THREE.SphereGeometry(0.170, 18, 14), hairMat);
    hairBack.scale.set(0.9, 0.8, 0.96);
    hairBack.position.set(-0.06, -0.01, 0);
    headGroup.add(hairBack);

    // Sideburns
    for (const sz of [-0.15, 0.15]) {
      const sideburn = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.08, 0.02), hairMat);
      sideburn.position.set(0.02, -0.01, sz);
      headGroup.add(sideburn);
    }

    // Nose
    const nose = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.04, 0.032), skinFeatureMat);
    nose.position.set(0.155, 0.035, 0);
    nose.rotation.z = -0.3;
    headGroup.add(nose);

    // Closed Resting Eyelids / Brows (Sedated / resting in ICU)
    for (const ez of [-0.055, 0.055]) {
      // Eyelid line
      const eyelid = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.032, 8), skinFeatureMat);
      eyelid.rotation.x = Math.PI / 2;
      eyelid.position.set(0.125, 0.075, ez);
      headGroup.add(eyelid);

      // Eyebrow
      const eyebrow = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.04, 8), hairMat);
      eyebrow.rotation.x = Math.PI / 2;
      eyebrow.position.set(0.13, 0.105, ez);
      headGroup.add(eyebrow);
    }

    // Lips
    const lips = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.018, 0.055), skinFeatureMat);
    lips.position.set(0.145, -0.045, 0);
    headGroup.add(lips);

    // Ears
    for (const ez of [-0.155, 0.155]) {
      const ear = new THREE.Mesh(new THREE.SphereGeometry(0.038, 12, 10), skinMat);
      ear.scale.set(0.6, 1.2, 0.4);
      ear.position.set(-0.01, 0.02, ez);
      headGroup.add(ear);
    }

    // Medical Oxygen Face Mask (Transparent blue-tinted ergonomic mask)
    const mask = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.12, 16), maskMat);
    mask.rotation.z = -Math.PI / 2 - 0.2;
    mask.scale.set(0.8, 1.0, 1.15);
    mask.position.set(0.17, -0.01, 0);
    headGroup.add(mask);

    // Mask swivel elbow adapter & supply port
    const maskPort = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.05, 12), MAT.steel);
    maskPort.rotation.z = Math.PI / 2;
    maskPort.position.set(0.24, -0.01, 0);
    headGroup.add(maskPort);

    // Mask elastic retaining strap around head
    const maskStrap = new THREE.Mesh(new THREE.TorusGeometry(0.165, 0.006, 8, 24), strapMat);
    maskStrap.rotation.y = Math.PI / 2;
    maskStrap.rotation.x = 0.2;
    maskStrap.position.set(0.02, 0.02, 0);
    headGroup.add(maskStrap);

    patient.add(headGroup);

    // 2. NECK
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.088, 0.10, 0.14, 16), skinMat);
    neck.position.set(-0.79, 0.11, 0);
    neck.rotation.z = Math.PI / 2;
    patient.add(neck);

    // 3. CHEST & HOSPITAL GOWN (Animated for natural breathing)
    const chestGroup = new THREE.Group();
    chestGroup.position.set(-0.48, 0.12, 0);

    // Upper Torso / Chest with Hospital Gown
    const chestMesh = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.22, 0.56), gownMat);
    chestMesh.position.set(0, 0, 0);
    chestGroup.add(chestMesh);

    // V-neck gown collar trim
    const collarLeft = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.015, 0.025), gownTrimMat);
    collarLeft.position.set(-0.16, 0.115, -0.08);
    collarLeft.rotation.y = -0.4;
    chestGroup.add(collarLeft);

    const collarRight = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.015, 0.025), gownTrimMat);
    collarRight.position.set(-0.16, 0.115, 0.08);
    collarRight.rotation.y = 0.4;
    chestGroup.add(collarRight);

    // Hospital Patient ID Lapel Tag
    const idBadge = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.008, 0.055), MAT.white);
    idBadge.position.set(-0.06, 0.115, -0.16);
    chestGroup.add(idBadge);
    const idBadgeStripe = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.009, 0.015), MAT.blue);
    idBadgeStripe.position.set(-0.06, 0.116, -0.16);
    chestGroup.add(idBadgeStripe);

    // 3 ECG Electrodes (Cardiac monitoring leads on chest)
    const ecgPositions = [
      { x: -0.10, z: -0.16, color: '#ef4444' }, // RA (Red)
      { x: -0.10, z: 0.16, color: '#eab308' },  // LA (Yellow)
      { x: 0.12, z: 0.18, color: '#22c55e' }    // LL (Green)
    ];
    ecgPositions.forEach(ecg => {
      // Patch
      const patch = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.008, 12), MAT.white);
      patch.position.set(ecg.x, 0.115, ecg.z);
      chestGroup.add(patch);
      // Snap button
      const snap = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.012, 8), MAT.steel);
      snap.position.set(ecg.x, 0.120, ecg.z);
      chestGroup.add(snap);
      // Lead wire
      const wire = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.006, 0.006), new THREE.MeshStandardMaterial({ color: ecg.color }));
      wire.position.set(ecg.x - 0.06, 0.122, ecg.z);
      wire.rotation.y = -0.3;
      chestGroup.add(wire);
    });

    patient.add(chestGroup);
    this.patientChest = chestGroup;
    this.patientChestBaseY = 0.12;

    // Abdomen / Lower Torso under gown
    const abdomen = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.20, 0.52), gownMat);
    abdomen.position.set(-0.12, 0.10, 0);
    patient.add(abdomen);

    // Pelvis & Hips
    const pelvis = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.19, 0.50), gownMat);
    pelvis.position.set(0.18, 0.09, 0);
    patient.add(pelvis);

    // 4. ARMS & HANDS
    // Gown Sleeves
    for (const sz of [-0.34, 0.34]) {
      const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.085, 0.22, 16), gownMat);
      sleeve.position.set(-0.48, 0.08, sz);
      sleeve.rotation.z = Math.PI / 2;
      patient.add(sleeve);
    }

    // --- LEFT ARM (Foreground / +Z side) ---
    // Upper Arm
    const leftUpperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.062, 0.055, 0.32, 12), skinMat);
    leftUpperArm.position.set(-0.35, 0.06, 0.34);
    leftUpperArm.rotation.z = Math.PI / 2;
    patient.add(leftUpperArm);

    // Left Forearm (Resting alongside bed)
    const leftForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.046, 0.38, 12), skinMat);
    leftForearm.position.set(-0.02, 0.055, 0.33);
    leftForearm.rotation.z = Math.PI / 2;
    patient.add(leftForearm);

    // Hospital Patient ID Bracelet (Wristband with barcode)
    const wristband = new THREE.Mesh(new THREE.CylinderGeometry(0.050, 0.050, 0.04, 16), wristbandMat);
    wristband.position.set(0.14, 0.055, 0.32);
    wristband.rotation.z = Math.PI / 2;
    patient.add(wristband);
    const barcodeStripe = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.045, 0.015), MAT.dark);
    barcodeStripe.position.set(0.14, 0.080, 0.32);
    patient.add(barcodeStripe);

    // Left Hand (Palm and resting fingers)
    const leftHand = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.038, 0.075), skinMat);
    leftHand.position.set(0.23, 0.05, 0.31);
    patient.add(leftHand);

    // Relaxed fingers
    const leftFingers = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.028, 0.068), skinMat);
    leftFingers.position.set(0.31, 0.042, 0.31);
    patient.add(leftFingers);

    // Intravenous (IV) Catheter on back of Left Hand (Tegaderm dressing & cannula hub)
    const tegaderm = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.006, 0.045), tegadermMat);
    tegaderm.position.set(0.23, 0.072, 0.31);
    patient.add(tegaderm);

    const ivHub = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.035, 8), ivPortMat);
    ivHub.position.set(0.23, 0.078, 0.31);
    ivHub.rotation.z = Math.PI / 2;
    patient.add(ivHub);

    // Flexible micro IV tube extending from hand towards the IV Pole
    const ivTubeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.22, 0.085, 0.31),
      new THREE.Vector3(0.05, 0.22, 0.38),
      new THREE.Vector3(-0.45, 0.45, 0.25),
      new THREE.Vector3(-1.10, 0.95, -0.40),
    ]);
    const patientIvTube = new THREE.Mesh(new THREE.TubeGeometry(ivTubeCurve, 28, 0.005, 6, false), MAT.glass);
    patient.add(patientIvTube);

    // --- RIGHT ARM (Far side / -Z side) ---
    // Upper Arm
    const rightUpperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.062, 0.055, 0.32, 12), skinMat);
    rightUpperArm.position.set(-0.35, 0.06, -0.34);
    rightUpperArm.rotation.z = Math.PI / 2;
    patient.add(rightUpperArm);

    // Right Forearm
    const rightForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.046, 0.38, 12), skinMat);
    rightForearm.position.set(-0.02, 0.055, -0.33);
    rightForearm.rotation.z = Math.PI / 2;
    patient.add(rightForearm);

    // Right Hand
    const rightHand = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.038, 0.075), skinMat);
    rightHand.position.set(0.23, 0.05, -0.31);
    patient.add(rightHand);

    const rightFingers = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.028, 0.068), skinMat);
    rightFingers.position.set(0.31, 0.042, -0.31);
    patient.add(rightFingers);

    // Pulse Oximeter Clip (SpO2 sensor on index finger with pulsing optical red LED)
    const spo2Clip = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.035, 0.022), MAT.dark);
    spo2Clip.position.set(0.31, 0.058, -0.325);
    patient.add(spo2Clip);

    const spo2Led = new THREE.Mesh(new THREE.SphereGeometry(0.008, 8, 8), new THREE.MeshStandardMaterial({
      color: '#ef4444',
      emissive: '#ef4444',
      emissiveIntensity: 0.8
    }));
    spo2Led.position.set(0.31, 0.074, -0.325);
    patient.add(spo2Led);
    this.spo2SensorLed = spo2Led;

    // SpO2 sensor cable leading toward patient monitor
    const spo2WireCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.31, 0.065, -0.325),
      new THREE.Vector3(0.25, 0.15, -0.36),
      new THREE.Vector3(0.05, 0.35, -0.34),
      new THREE.Vector3(-0.08, 0.70, -0.30),
    ]);
    const spo2Wire = new THREE.Mesh(new THREE.TubeGeometry(spo2WireCurve, 20, 0.004, 6, false), MAT.dark);
    patient.add(spo2Wire);

    // 5. HOSPITAL THERMAL BLANKET & FOLDED LINEN (Draped naturally over legs and lower body)
    const blanketGroup = new THREE.Group();
    blanketGroup.position.set(0, 0, 0);

    // Crisp white folded cuff sheet (Turned down at chest edge)
    const sheetTurn = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, 0.76), sheetMat);
    sheetTurn.position.set(-0.16, 0.18, 0);
    blanketGroup.add(sheetTurn);

    // Main thermal blanket body over abdomen and thighs
    const blanketMain = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.19, 0.78), blanketMat);
    blanketMain.position.set(0.24, 0.16, 0);
    blanketGroup.add(blanketMain);

    // Blanket drape over lower legs and shins
    const blanketLegs = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.16, 0.74), blanketMat);
    blanketLegs.position.set(0.85, 0.13, 0);
    blanketGroup.add(blanketLegs);

    // Gentle drape folds on sides of the bed
    for (const bz of [-0.41, 0.41]) {
      const drape = new THREE.Mesh(new THREE.BoxGeometry(1.36, 0.12, 0.06), blanketMat);
      drape.position.set(0.55, 0.08, bz);
      blanketGroup.add(drape);
    }

    patient.add(blanketGroup);
    this.patientBlanket = blanketGroup;
    this.patientBlanketBaseY = 0;

    // 6. FEET WITH HOSPITAL ANTI-SLIP SAFETY SOCKS
    // Peeking out at foot of the bed (X ≈ 1.22)
    for (const fz of [-0.15, 0.15]) {
      const footGroup = new THREE.Group();
      footGroup.position.set(1.22, 0.07, fz);
      footGroup.rotation.x = fz > 0 ? 0.22 : -0.22;

      // Ankle / Sock Cuff
      const ankle = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.044, 0.14, 12), sockMat);
      ankle.rotation.z = Math.PI / 2;
      footGroup.add(ankle);

      // Foot (Heel to toe)
      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.09, 0.082), sockMat);
      foot.position.set(0.06, 0.04, 0);
      footGroup.add(foot);

      // Yellow non-skid traction tread dots on soles (Classic hospital safety socks)
      for (let s = 0; s < 3; s++) {
        const tread = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.005, 0.06), treadMat);
        tread.position.set(0.01 + s * 0.045, -0.008, 0);
        footGroup.add(tread);
      }

      patient.add(footGroup);
    }

    // Cast shadows for all patient parts
    patient.traverse(obj => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });

    bed.add(patient);
  }

  makeDeviceUnit(parent, id, position, kind) {
    const g = new THREE.Group(); g.position.set(...position); g.userData.selectId = id; g.userData.selectType = 'device';
    let screen;

    if (kind === 'ventilator') {
      this.addBox(g, 'vent trolley base', [0.78, 0.16, 0.58], [0, 0.82, 0], MAT.dark);
      this.addBox(g, 'vent trolley body', [0.65, 0.82, 0.48], [0, 1.3, 0], MAT.white);
      this.addBox(g, 'vent front panel', [0.58, 0.7, 0.05], [0, 1.3, 0.25], MAT.blue);

      screen = new THREE.Mesh(new THREE.PlaneGeometry(0.48, 0.32), new THREE.MeshBasicMaterial({ map: this.ventTexture.texture }));
      screen.position.set(0, 1.58, 0.28);
      g.add(screen);

      this.addCylinder(g, 'humidifier chamber', 0.09, 0.09, 0.16, [0.22, 1.05, 0.28], MAT.glass, 16);
      
      const ventHoseMat = new THREE.MeshStandardMaterial({ color: '#5b98d6', roughness: 0.6 });
      const hoseCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.15, 1.15, 0.28),
        new THREE.Vector3(-0.25, 1.3, 0.5),
        new THREE.Vector3(0.2, 1.35, 0.9),
        new THREE.Vector3(0.5, 1.2, 1.3),
      ]);
      const hoseTube = new THREE.Mesh(new THREE.TubeGeometry(hoseCurve, 32, 0.022, 8, false), ventHoseMat);
      g.add(hoseTube);

      for (let i = 0; i < 3; i++) this.addBox(g, 'vent knob', [0.08, 0.08, 0.045], [-0.16 + i * 0.16, 1.13, 0.29], MAT.steel);
      this.addCylinder(g, 'vent caster', 0.07, 0.07, 0.09, [-0.22, 0.07, 0], MAT.rubber, 12).rotation.z = Math.PI / 2;
      this.addCylinder(g, 'vent caster', 0.07, 0.07, 0.09, [0.22, 0.07, 0], MAT.rubber, 12).rotation.z = Math.PI / 2;
    } else if (kind === 'monitor') {
      this.addBox(g, 'monitor stand', [0.56, 0.08, 0.38], [0, 0.82, 0], MAT.steel);
      this.addBox(g, 'monitor neck', [0.1, 0.44, 0.1], [0, 1.04, 0], MAT.steel);
      this.addBox(g, 'monitor casing', [0.88, 0.64, 0.18], [0, 1.48, 0], MAT.dark);
      this.addBox(g, 'alarm light bar', [0.65, 0.04, 0.08], [0, 1.82, 0], MAT.green);

      screen = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.54), new THREE.MeshBasicMaterial({ map: this.ecgTexture.texture }));
      screen.position.set(0, 1.48, 0.1);
      g.add(screen);
    } else if (kind === 'pumps') {
      for (let i = 0; i < 2; i++) {
        this.addBox(g, 'pump unit', [0.35, 0.66, 0.32], [-0.22 + i * 0.44, 1.06, 0], MAT.white);
        screen = this.addBox(g, 'pump screen', [0.24, 0.17, 0.035], [-0.22 + i * 0.44, 1.2, 0.18], MAT.glass);
        this.addBox(g, 'pump button', [0.12, 0.055, 0.025], [-0.22 + i * 0.44, 0.96, 0.18], MAT.green);
        this.addBox(g, 'pump clamp', [0.09, 0.09, 0.09], [-0.22 + i * 0.44, 1.43, -0.08], MAT.steel);
      }
      this.addBox(g, 'pole', [0.05, 1.85, 0.05], [0, 0.92, -0.22], MAT.steel);
      this.addCylinder(g, 'pump base', 0.45, 0.45, 0.09, [0, 0.08, -0.22], MAT.dark, 20);
    } else if (kind === 'syringe') {
      this.addBox(g, 'syringe body', [0.7, 0.29, 0.4], [0, 0.96, 0], MAT.white);
      screen = this.addBox(g, 'syringe screen', [0.28, 0.13, 0.035], [-0.08, 1.0, 0.22], MAT.glass);
      this.addCylinder(g, 'syringe barrel', 0.075, 0.075, 0.36, [0.12, 1.19, -0.04], MAT.steel, 16).rotation.z = Math.PI / 2;
      this.addBox(g, 'syringe plunger', [0.16, 0.04, 0.05], [0.36, 1.19, -0.04], MAT.steel);
      this.addBox(g, 'syringe stand', [0.1, 0.74, 0.1], [0, 0.45, -0.12], MAT.steel);
    } else if (kind === 'defib') {
      this.addBox(g, 'defib trolley', [0.75, 0.18, 0.58], [0, 0.88, 0], MAT.dark);
      this.addBox(g, 'defib case', [0.78, 0.76, 0.54], [0, 1.34, 0], MAT.white);
      screen = this.addBox(g, 'defib screen', [0.48, 0.3, 0.05], [0, 1.48, 0.3], MAT.glass);
      this.addBox(g, 'defib pads', [0.15, 0.14, 0.05], [-0.2, 1.13, 0.3], MAT.orange);
      this.addBox(g, 'defib pads', [0.15, 0.14, 0.05], [0.2, 1.13, 0.3], MAT.orange);
      this.addCylinder(g, 'defib wheel', 0.08, 0.08, 0.08, [-0.24, 0.07, 0], MAT.rubber, 12).rotation.z = Math.PI / 2;
      this.addCylinder(g, 'defib wheel', 0.08, 0.08, 0.08, [0.24, 0.07, 0], MAT.rubber, 12).rotation.z = Math.PI / 2;
    } else if (kind === 'incubator') {
      this.addBox(g, 'incubator base', [1.12, 0.28, 0.8], [0, 0.85, 0], MAT.white);
      this.addBox(g, 'incubator lower', [0.75, 0.56, 0.54], [0, 1.24, 0], MAT.blue);
      this.addBox(g, 'incubator transparent hood', [0.94, 0.62, 0.62], [0, 1.78, 0], MAT.glass);
      this.addBox(g, 'incubator mattress', [0.82, 0.06, 0.5], [0, 1.5, 0], MAT.white);
      screen = this.addBox(g, 'incubator display', [0.35, 0.16, 0.04], [0.3, 1.04, 0.29], MAT.glass);
    } else if (kind === 'oxygen') {
      this.addBox(g, 'oxygen body', [0.76, 1.2, 0.6], [0, 0.78, 0], MAT.white);
      this.addBox(g, 'oxygen front', [0.62, 1.0, 0.05], [0, 0.78, 0.32], MAT.blue);
      screen = this.addBox(g, 'oxygen screen', [0.35, 0.21, 0.04], [0, 1.06, 0.36], MAT.glass);
      this.addBox(g, 'oxygen vent', [0.4, 0.07, 0.025], [0, 0.65, 0.36], MAT.rubber);
      this.addCylinder(g, 'oxygen wheel', 0.07, 0.07, 0.08, [-0.22, 0.07, 0], MAT.rubber, 12).rotation.z = Math.PI / 2;
      this.addCylinder(g, 'oxygen wheel', 0.07, 0.07, 0.08, [0.22, 0.07, 0], MAT.rubber, 12).rotation.z = Math.PI / 2;
    }

    g.traverse(obj => { if (obj.isMesh) { obj.castShadow = true; obj.receiveShadow = true; obj.userData.selectId = id; obj.userData.selectType = 'device'; } });
    if (screen) this.deviceScreens.set(id, screen);
    this.groups.set(id, g);
    parent.add(g);
  }

  addLabel(id, text, position, width) {
    const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(7,17,31,0.88)';
    this.roundRect(ctx, 5, 5, 502, 118, 24); ctx.fill();
    ctx.strokeStyle = 'rgba(74,134,187,0.75)'; ctx.lineWidth = 3; ctx.stroke();
    ctx.fillStyle = '#e8f3ff'; ctx.font = '700 38px Tajawal, Arial, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.direction = 'rtl'; ctx.fillText(text, 256, 64, 470);
    const tex = new THREE.CanvasTexture(canvas); tex.colorSpace = THREE.SRGBColorSpace;
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
    sprite.position.copy(position); sprite.scale.set(width, width * 0.25, 1); sprite.userData.isLabel = true; sprite.userData.selectId = id;
    this.scene.add(sprite); const group = this.groups.get(id); if (group) group.userData.labelSprite = sprite;
  }

  roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath(); ctx.moveTo(x + radius, y); ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius); ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius); ctx.closePath();
  }

  // HIGH-FIDELITY INDUSTRIAL & MEDICAL CABLE INFRASTRUCTURE WITH ACTIVE PHOTON CLUSTERS
  buildPowerPaths() {
    this.pathDots = [];
    this.pathMeshes = [];
    this.socketLeds = new Map();
    this.cableGroup = new THREE.Group();
    this.scene.add(this.cableGroup);

    // 1. Hospital ICU Bedside Distribution Console (Isolated Power Supply - IPS Unit)
    const distBox = new THREE.Group();
    distBox.position.set(4.8, 0.72, 0.5);

    // Main console chassis (hospital antibacterial composite)
    const boxMat = new THREE.MeshStandardMaterial({ color: '#132337', roughness: 0.35, metalness: 0.55 });
    const boxBody = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.58, 0.16), boxMat);
    distBox.add(boxBody);

    // Anodized aluminum perimeter bezel
    const bezelMat = new THREE.MeshStandardMaterial({ color: '#8faec7', roughness: 0.25, metalness: 0.85 });
    const boxBezel = new THREE.Mesh(new THREE.BoxGeometry(0.98, 0.60, 0.03), bezelMat);
    boxBezel.position.set(0, 0, -0.065);
    distBox.add(boxBezel);

    // High-res graphical faceplate with IPS schematics and channel bays
    const faceMat = new THREE.MeshStandardMaterial({
      map: this.medicalConsoleTexture,
      roughness: 0.3,
      metalness: 0.2
    });
    const boxFace = new THREE.Mesh(new THREE.PlaneGeometry(0.92, 0.54), faceMat);
    boxFace.position.set(0, 0, 0.082);
    distBox.add(boxFace);

    // Stainless steel mounting column & floor pedestal
    const columnMat = new THREE.MeshStandardMaterial({ color: '#b0c4de', roughness: 0.2, metalness: 0.9 });
    const colMesh = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.68, 0.12), columnMat);
    colMesh.position.set(0, -0.38, 0);
    distBox.add(colMesh);
    const basePlate = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.03, 0.34), MAT.dark);
    basePlate.position.set(0, -0.71, 0);
    distBox.add(basePlate);

    // Main Emergency Feeder Incoming Cable Gland (at bottom of distribution console)
    const mainGland = createCableGland([0, -0.30, 0], [0, 0, 0], 1.1, true);
    distBox.add(mainGland);

    // Equipotential bonding grounding studs (hospital grounding bar)
    const earthMat = new THREE.MeshStandardMaterial({ color: '#ffd700', roughness: 0.3, metalness: 0.85 });
    for (let e = 0; e < 3; e++) {
      const stud = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.035, 12), earthMat);
      stud.rotation.z = Math.PI / 2;
      stud.position.set(0.485, -0.15 + e * 0.08, 0.02);
      distBox.add(stud);
    }

    // Master Emergency Power Status Indicator LED
    this.icuDistLed = new THREE.Mesh(
      new THREE.CylinderGeometry(0.026, 0.026, 0.028, 16),
      new THREE.MeshStandardMaterial({ color: '#33d6a6', emissive: '#33d6a6', emissiveIntensity: 0.95 })
    );
    this.icuDistLed.rotation.x = Math.PI / 2;
    this.icuDistLed.position.set(0.38, 0.21, 0.085);
    distBox.add(this.icuDistLed);

    // 7 Dedicated Medical Power Sockets with Status LEDs & Plugs
    const deviceIds = ['vent', 'monitor', 'infusion', 'syringe', 'defib', 'incubator', 'oxygen'];
    const socketXStart = -0.39;
    const socketSpacing = 0.13;

    deviceIds.forEach((devId, idx) => {
      const sx = socketXStart + idx * socketSpacing;

      // Socket ring bezel
      const ringMat = new THREE.MeshStandardMaterial({
        color: (devId === 'vent' || devId === 'defib') ? '#ef4444' : '#10b981',
        roughness: 0.3
      });
      const sRing = new THREE.Mesh(new THREE.TorusGeometry(0.028, 0.005, 8, 16), ringMat);
      sRing.position.set(sx, -0.14, 0.084);
      distBox.add(sRing);

      // Dedicated Socket Active Power LED
      const sLed = new THREE.Mesh(
        new THREE.CylinderGeometry(0.009, 0.009, 0.016, 12),
        new THREE.MeshStandardMaterial({ color: '#2cd89f', emissive: '#2cd89f', emissiveIntensity: 0.95 })
      );
      sLed.rotation.x = Math.PI / 2;
      sLed.position.set(sx, -0.09, 0.085);
      distBox.add(sLed);
      this.socketLeds.set(devId, sLed);

      // Molded Hospital Power Plug inserted into socket
      const plug = createHospitalPlug([sx, -0.14, 0.105], [0, 0, 0], '#182432');
      distBox.add(plug);
    });

    this.cableGroup.add(distBox);

    // Equipment Ingress Cable Glands
    this.cableGroup.add(createCableGland([-4.40, 0.70, -3.90], [0, 0, Math.PI / 2], 1.0, true)); // Solar junction
    this.cableGroup.add(createCableGland([-3.40, 0.28, -3.10], [0, 0, 0], 1.1, true)); // MPPT PV in
    this.cableGroup.add(createCableGland([-3.00, 0.28, -3.10], [0, 0, 0], 1.1, true)); // MPPT Bat out
    this.cableGroup.add(createCableGland([-2.50, 0.75, 0.50], [0, 0, Math.PI / 2], 1.2, true)); // Bat DC isolator
    this.cableGroup.add(createCableGland([-0.35, 0.28, -3.10], [0, 0, 0], 1.25, false)); // Inverter DC in
    this.cableGroup.add(createCableGland([0.35, 0.28, -3.10], [0, 0, 0], 1.25, false)); // Inverter AC out
    this.cableGroup.add(createCableGland([2.85, 0.28, -3.10], [0, 0, 0], 1.2, false)); // ATS Source B
    this.cableGroup.add(createCableGland([3.20, 0.28, -3.40], [0, 0, 0], 1.2, true)); // ATS Source A
    this.cableGroup.add(createCableGland([3.55, 0.28, -3.10], [0, 0, 0], 1.2, false)); // ATS Output
    this.cableGroup.add(createCableGland([3.20, 0.28, -5.90], [0, 0, 0], 1.2, true)); // Grid Pedestal

    // IEC C14 Power Inlets on the 7 Medical Devices
    this.cableGroup.add(createIECInlet([4.75, 0.65, 0.85], [0, 0, 0])); // Vent
    this.cableGroup.add(createIECInlet([6.10, 0.85, 0.72], [0, 0, 0])); // Monitor
    this.cableGroup.add(createIECInlet([7.35, 0.72, 0.80], [0, 0, 0])); // Infusion
    this.cableGroup.add(createIECInlet([8.35, 0.62, 1.45], [0, 0, 0])); // Syringe
    this.cableGroup.add(createIECInlet([4.40, 0.72, 2.25], [0, 0, 0])); // Defib
    this.cableGroup.add(createIECInlet([8.05, 0.68, 3.60], [0, 0, 0])); // Incubator
    this.cableGroup.add(createIECInlet([4.10, 0.65, 3.80], [0, 0, 0])); // Oxygen

    // 1b. Real Galvanized Metallic Cable Tray Network (Elevated at Y = 0.26 above ground & plinths)
    this.cableTrays = new THREE.Group();
    // Main Wall Tray along Solar -> MPPT -> Inverter -> ATS
    this.cableTrays.add(createCableTraySegment([-4.50, 0.26, -2.60], [3.60, 0.26, -2.60], 0.28, 0.05, 0.28));
    // Battery Branch Feeder Tray: from Main Tray to Battery storage rack
    this.cableTrays.add(createCableTraySegment([-3.00, 0.26, -2.60], [-3.00, 0.26, 0.45], 0.24, 0.05, 0.28));
    // Utility Grid Incomer Channel Tray: from Outdoor Grid Pedestal to ATS
    this.cableTrays.add(createCableTraySegment([3.20, 0.26, -5.90], [3.20, 0.26, -3.20], 0.22, 0.05, 0.28));
    // ICU Medical Feeder Elevated Channel
    this.cableTrays.add(createCableTraySegment([3.55, 0.26, -2.60], [4.15, 0.26, -1.20], 0.20, 0.045, 0.28));
    this.cableTrays.add(createCableTraySegment([4.15, 0.26, -1.20], [4.80, 0.26, 0.45], 0.20, 0.045, 0.28));
    this.cableGroup.add(this.cableTrays);

    // 1c. Industrial Metallic Cable Straps / Clamps along elevated trays
    const clampCoords = [
      [-4.10, 0.29, -2.60], [-3.40, 0.29, -2.60], [-1.80, 0.29, -2.60],
      [-3.00, 0.29, -2.00], [-3.00, 0.29, -1.10], [-3.00, 0.29, -0.20],
      [-1.80, 0.29, -1.00], [-1.00, 0.29, -1.80],
      [1.00, 0.29, -2.60], [1.80, 0.29, -2.60],
      [3.20, 0.29, -5.10], [3.20, 0.29, -4.20],
      [3.85, 0.29, -1.90], [4.45, 0.29, -0.40]
    ];
    clampCoords.forEach(pos => this.cableGroup.add(createCableClamp(pos)));

    // 1d. Solar MC4 Weatherproof Connectors
    this.cableGroup.add(createMC4Connector([-4.40, 0.50, -3.60], [0, 0, Math.PI / 4], true));
    this.cableGroup.add(createMC4Connector([-4.40, 0.50, -3.66], [0, 0, Math.PI / 4], false));

    // 1e. Heavy Copper Battery Terminal Lugs
    this.cableGroup.add(createCableLug([-2.50, 0.78, 0.52], [0, 0, Math.PI / 2], true));
    this.cableGroup.add(createCableLug([-2.50, 0.71, 0.52], [0, 0, Math.PI / 2], false));
    this.cableGroup.add(createCableLug([-0.38, 0.28, -3.10], [0, 0, 0], true));
    this.cableGroup.add(createCableLug([-0.32, 0.28, -3.10], [0, 0, 0], false));

    // 1f. Equipotential Medical Grounding Wire (Earth Bonding Bar)
    const earthPoints = [
      new THREE.Vector3(5.28, 0.57, 0.52),
      new THREE.Vector3(5.45, 0.35, 0.52),
      new THREE.Vector3(5.45, 0.18, 0.52),
      new THREE.Vector3(5.10, 0.14, 0.52),
      new THREE.Vector3(4.80, 0.12, 0.52)
    ];
    const earthCurve = new THREE.CatmullRomCurve3(earthPoints);
    const earthMesh = new THREE.Mesh(
      new THREE.TubeGeometry(earthCurve, 32, 0.012, 8, false),
      new THREE.MeshStandardMaterial({ color: '#16a34a', roughness: 0.5 })
    );
    this.cableGroup.add(earthMesh);

    // 1g. Billboarded 3D Cable Identification Tags
    this.cableTags = [];
    const addTag = (title, sub, pos, color) => {
      const tag = createCableTagFlag(title, sub, pos, color);
      this.cableGroup.add(tag);
      this.cableTags.push(tag);
    };

    addTag('سلسلة PV الشمسية · 94.2V', 'SOLAR PV · 2400 Wp', [-3.90, 0.45, -2.55], '#38bdf8');
    addTag('شحن البطارية · 48V DC', 'MPPT CHARGE BUS · 80A', [-3.00, 0.45, -1.30], '#10b981');
    addTag('ناقل البطارية للعاكس · 48V', 'BATTERY HEAVY BUS · 200A', [-1.70, 0.45, -1.20], '#f59e0b');
    addTag('خرج العاكس AC 230V', 'INVERTER PURE SINE · 2000W', [1.40, 0.45, -2.55], '#10b981');
    addTag('تغذية الشبكة العامة · 230V', 'UTILITY GRID FEEDER · 32A', [3.20, 0.45, -4.60], '#38bdf8');
    addTag('الخط الطبي الرئيسي IPS · 230V', 'ICU ISOLATED TRUNK · IT SYSTEM', [4.30, 0.45, -1.00], '#34d399');

    // 7 Medical Device 3D Tags
    addTag('جهاز التنفس · 350W', 'VENTILATOR · CRITICAL', [4.60, 0.75, 0.85], '#38bdf8');
    addTag('مراقب المؤشرات · 60W', 'PATIENT MONITOR · VITAL', [5.60, 0.88, 0.72], '#34d399');
    addTag('مضخات المحاليل · 60W', 'INFUSION PUMPS ×2', [6.80, 0.75, 0.80], '#38bdf8');
    addTag('مضخة الحقن · 25W', 'SYRINGE PUMP · 25W', [7.80, 0.68, 1.45], '#34d399');
    addTag('مزيل الرجفان · 200W', 'DEFIBRILLATOR · CRASH CART', [4.50, 0.75, 1.80], '#f59e0b');
    addTag('حاضنة الأطفال · 400W', 'INFANT INCUBATOR · 400W', [7.40, 0.72, 3.20], '#38bdf8');
    addTag('مركّز الأوكسجين · 300W', 'OXYGEN CONCENTRATOR · 300W', [4.20, 0.70, 3.40], '#60a5fa');

    // High-Fidelity Multi-Conductor Cable Path Constructor with Multi-Comet Stream
    const makeCablePath = (id, points, color, medium, particleCount = 7, deviceId = null, spec = {}) => {
      const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));

      // Solid Industrial Conduit / Flexible Sheath
      const isDualDC = (medium === 'dc' || medium === 'battery');
      const conduitRadius = deviceId ? 0.016 : (medium === 'battery' ? 0.034 : 0.026);
      
      let conduitColor = '#1e293b';
      let conduitRoughness = 0.45;
      let conduitMetalness = 0.65;

      if (deviceId) {
        // Medical grade antimicrobial silicone cords
        conduitRoughness = 0.8;
        conduitMetalness = 0.12;
        if (deviceId === 'vent') conduitColor = '#0f766e'; // Medical teal
        else if (deviceId === 'monitor') conduitColor = '#334155'; // Slate grey
        else if (deviceId === 'infusion' || deviceId === 'syringe') conduitColor = '#94a3b8'; // Arctic medical white
        else if (deviceId === 'defib') conduitColor = '#c2410c'; // High-flex orange
        else if (deviceId === 'incubator') conduitColor = '#1d4ed8'; // Royal blue
        else if (deviceId === 'oxygen') conduitColor = '#475569'; // Respiratory slate
      } else if (medium === 'dc') {
        conduitColor = '#0f172a'; // Solar UV-resistant black jacket
      } else if (medium === 'battery') {
        conduitColor = '#1e293b'; // Heavy battery bus
      } else if (medium === 'grid') {
        conduitColor = '#1e3a8a'; // Utility grid blue
      } else if (medium === 'ac') {
        conduitColor = (id === 'inverter-ats') ? '#c2410c' : '#0f766e'; // Orange corrugated flex or Medical Teal
      }

      // Main conduit mesh
      const conduitGeom = new THREE.TubeGeometry(curve, 72, conduitRadius, 10, false);
      const conduitMat = new THREE.MeshStandardMaterial({
        color: conduitColor,
        roughness: conduitRoughness,
        metalness: conduitMetalness,
      });
      const conduitMesh = new THREE.Mesh(conduitGeom, conduitMat);
      conduitMesh.receiveShadow = true;
      conduitMesh.castShadow = true;
      conduitMesh.userData.selectId = id;
      conduitMesh.userData.selectType = 'cable';
      conduitMesh.userData.cableSpec = spec;
      this.cableGroup.add(conduitMesh);

      // If DC: add parallel positive conductor (+ Red) alongside for visual realism!
      if (isDualDC && !deviceId) {
        const offsetPoints = points.map(p => [p[0], p[1] + 0.015, p[2] + 0.015]);
        const posCurve = new THREE.CatmullRomCurve3(offsetPoints.map(p => new THREE.Vector3(...p)));
        const posGeom = new THREE.TubeGeometry(posCurve, 72, conduitRadius * 0.75, 8, false);
        const posMat = new THREE.MeshStandardMaterial({ color: '#dc2626', roughness: 0.5, metalness: 0.2 });
        const posMesh = new THREE.Mesh(posGeom, posMat);
        posMesh.userData.selectId = id;
        posMesh.userData.selectType = 'cable';
        this.cableGroup.add(posMesh);
      }

      // Layer 2: Pulsating Radiant Neon Flow Tube (Aura)
      const auraRadius = conduitRadius * 1.35;
      const auraGeom = new THREE.TubeGeometry(curve, 72, auraRadius, 10, false);
      const auraMat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.85,
        transparent: true,
        opacity: 0.65,
        roughness: 0.15,
        metalness: 0.1,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const auraMesh = new THREE.Mesh(auraGeom, auraMat);
      auraMesh.userData.pathId = id;
      auraMesh.userData.medium = medium;
      auraMesh.userData.deviceId = deviceId;
      auraMesh.userData.selectId = id;
      auraMesh.userData.selectType = 'cable';
      auraMesh.userData.cableSpec = spec;
      this.cableGroup.add(auraMesh);
      this.pathMeshes.push(auraMesh);

      // Layer 3: Multi-Comet Photon Clusters with Trailing Dust (Laser comet clusters)
      for (let i = 0; i < particleCount; i++) {
        const basePhase = i / particleCount;

        // 3a. Ultra-Bright White-Hot Nucleus
        const coreSize = deviceId ? 0.030 : 0.044;
        const core = new THREE.Mesh(
          new THREE.SphereGeometry(coreSize, 12, 10),
          new THREE.MeshBasicMaterial({ color: '#ffffff' })
        );
        core.userData.curve = curve;
        core.userData.pathId = id;
        core.userData.medium = medium;
        core.userData.deviceId = deviceId;
        core.userData.phase = basePhase;
        this.cableGroup.add(core);
        this.pathDots.push(core);

        // 3b. Radiant Glowing Neon Corona (Additive Blending)
        const coronaSize = coreSize * 2.0;
        const corona = new THREE.Mesh(
          new THREE.SphereGeometry(coronaSize, 12, 10),
          new THREE.MeshBasicMaterial({
            color,
            transparent: true,
            opacity: 0.72,
            blending: THREE.AdditiveBlending,
            depthWrite: false
          })
        );
        corona.userData.curve = curve;
        corona.userData.pathId = id;
        corona.userData.medium = medium;
        corona.userData.deviceId = deviceId;
        corona.userData.phase = basePhase;
        corona.userData.isAura = true;
        this.cableGroup.add(corona);
        this.pathDots.push(corona);

        // 3c. Comet Tail 1
        const tail1 = new THREE.Mesh(
          new THREE.SphereGeometry(coreSize * 0.75, 8, 8),
          new THREE.MeshBasicMaterial({
            color,
            transparent: true,
            opacity: 0.48,
            blending: THREE.AdditiveBlending,
            depthWrite: false
          })
        );
        tail1.userData.curve = curve;
        tail1.userData.pathId = id;
        tail1.userData.medium = medium;
        tail1.userData.deviceId = deviceId;
        tail1.userData.phase = basePhase - 0.020;
        this.cableGroup.add(tail1);
        this.pathDots.push(tail1);

        // 3d. Comet Tail 2
        const tail2 = new THREE.Mesh(
          new THREE.SphereGeometry(coreSize * 0.50, 8, 8),
          new THREE.MeshBasicMaterial({
            color,
            transparent: true,
            opacity: 0.25,
            blending: THREE.AdditiveBlending,
            depthWrite: false
          })
        );
        tail2.userData.curve = curve;
        tail2.userData.pathId = id;
        tail2.userData.medium = medium;
        tail2.userData.deviceId = deviceId;
        tail2.userData.phase = basePhase - 0.038;
        this.cableGroup.add(tail2);
        this.pathDots.push(tail2);
      }

      return auraMesh;
    };

    // 2. High-Precision Transmission Routes (Elevated along elevated cable trays & raceways, zero floor intersection)
    this.cables = [
      // 1. Solar PV Array -> MPPT (High-Voltage Solar DC String)
      makeCablePath('pv-mppt', [
        [-4.40, 0.70, -3.90],
        [-4.40, 0.45, -3.40],
        [-4.40, 0.29, -2.60],
        [-3.80, 0.29, -2.60],
        [-3.40, 0.29, -2.85],
        [-3.40, 0.28, -3.10]
      ], '#38bdf8', 'dc', 8, null, {
        title: 'سلسلة الألواح الشمسية (DC PV String)',
        en: 'Solar PV String Feeder',
        voltage: '94.2 V DC (Vmp)',
        standard: 'EN 50618 (PV1-F 2x6mm²)',
        insulation: 'Double Insulated Cross-Linked Polyolefin (1000V DC / UV Resistant)',
        category: 'توليد شمسي DC',
        protection: 'قواطع تيار مستمر DC Breaker + مانع صواعق SPD Type II',
      }),

      // 2. MPPT -> Battery Storage Rack (48V Heavy DC Charge Bus)
      makeCablePath('mppt-battery', [
        [-3.00, 0.28, -3.10],
        [-3.00, 0.29, -2.60],
        [-3.00, 0.29, -1.30],
        [-3.00, 0.29, 0.10],
        [-2.80, 0.45, 0.45],
        [-2.50, 0.75, 0.50]
      ], '#10b981', 'dc', 8, null, {
        title: 'ناقل شحن بنك البطاريات (48V Heavy Charge Bus)',
        en: 'MPPT to Battery Charge Bus',
        voltage: '48.0 V - 54.6 V DC',
        standard: 'H07RN-F 2x35mm² Heavy Flexible',
        insulation: 'EPR Rubber / Heavy Duty Neoprene Sheath (80A Rating)',
        category: 'شحن البطارية DC',
        protection: 'فيوز حماية فائق السرعة DC Fuse 100A',
      }),

      // 3. Battery Storage -> Hybrid Inverter (Heavy 48V DC Feeders - 200A Bus)
      makeCablePath('battery-inverter', [
        [-2.50, 0.68, 0.50],
        [-2.75, 0.32, 0.30],
        [-2.75, 0.32, -1.10],
        [-2.75, 0.32, -2.52],
        [-1.40, 0.32, -2.52],
        [-0.35, 0.30, -2.80],
        [-0.35, 0.28, -3.10]
      ], '#f59e0b', 'battery', 9, null, {
        title: 'ناقل القدرة الرئيسي من البطارية للعاكس (48V Heavy DC Bus)',
        en: 'Battery to Hybrid Inverter Heavy Bus',
        voltage: '48.0 V DC Nominal (42V - 58.4V)',
        standard: 'BS 6883 / H01N2-D 2x70mm² Extra-Flex Copper',
        insulation: 'High-Current Welding Grade Synthetic Rubber (200A Continuous)',
        category: 'تغذية البطارية للعاكس DC',
        protection: 'قاطع عزل دوار DC Isolator + قاطع حراري مغناطيسي 250A',
      }),

      // 4. Inverter -> ATS (Pure Sine Wave 230V AC - Source B)
      makeCablePath('inverter-ats', [
        [0.35, 0.28, -3.10],
        [0.35, 0.29, -2.60],
        [1.60, 0.29, -2.60],
        [2.85, 0.29, -2.85],
        [2.85, 0.28, -3.10]
      ], '#10b981', 'ac', 7, null, {
        title: 'خرج العاكس لمفتاح التحويل (Source B - Emergency AC)',
        en: 'Hybrid Inverter Pure Sine AC Output',
        voltage: '230 V AC ±2% (50 Hz Pure Sine Wave)',
        standard: 'BS EN 50525 / H07VV-F 3G4mm² Armored Flex',
        insulation: 'Corrugated Steel Flex Shielded Conduit (THD < 3%)',
        category: 'طاقة العاكس الاحتياطية AC',
        protection: 'قاطع تفاضلي طبي Type B RCD + MCB 16A Curve C',
      }),

      // 5. Utility Grid Pedestal -> ATS (Grid Feeder 230V AC - Source A)
      makeCablePath('grid-ats', [
        [3.20, 0.28, -5.90],
        [3.20, 0.29, -5.00],
        [3.20, 0.29, -4.20],
        [3.20, 0.29, -3.60],
        [3.20, 0.28, -3.40]
      ], '#38bdf8', 'grid', 8, null, {
        title: 'تغذية الشبكة العامة لمفتاح التحويل (Source A - Utility Grid)',
        en: 'Utility Grid Main AC Feeder',
        voltage: '230 V AC Nominal (50 Hz Single Phase)',
        standard: 'IEC 60502-1 NYY-J 3G6mm² Industrial Heavy Duty',
        insulation: 'PVC Insulated Armored Surface Cable (32A Rating)',
        category: 'مصدر الشبكة العمومية AC',
        protection: 'قاطع رئيسي 32A + مانع صواعق الشبكة SPD Type I+II',
      }),

      // 6. ATS Output -> Hospital ICU Bedside Distribution Console (IPS Trunk)
      makeCablePath('ats-icu', [
        [3.55, 0.28, -3.10],
        [3.55, 0.29, -2.60],
        [4.15, 0.29, -1.20],
        [4.80, 0.29, -0.10],
        [4.80, 0.30, 0.45],
        [4.80, 0.42, 0.50]
      ], '#34d399', 'ac', 9, null, {
        title: 'الخط الرئيسي لوحدة التوزيع السريرية (Hospital IPS Trunk Feeder)',
        en: 'ICU Isolated Power Supply (IPS) Feeder Trunk',
        voltage: '230 V AC Isolated IT System (نظام عزل طبي)',
        standard: 'IEC 60364-7-710 / BS EN 50525-3-11 LSZH 3G6mm²',
        insulation: 'Low Smoke Zero Halogen (LSZH) + Medical Braided Shield',
        category: 'تغذية العناية المركزة المعزولة AC',
        protection: 'نظام مراقبة العزل الطبي Insulation Monitoring Device (IMD)',
      }),

      // 7 DEDICATED MEDICAL DEVICE BRANCH CABLES
      // Branch 1: Ventilator (جهاز التنفس الاصطناعي - Life Support Critical)
      makeCablePath('branch-vent', [
        [4.41, 0.58, 0.58],
        [4.48, 0.38, 0.68],
        [4.58, 0.26, 0.76],
        [4.68, 0.42, 0.82],
        [4.75, 0.65, 0.85]
      ], '#38bdf8', 'ac', 6, 'vent', {
        title: 'كابل تغذية جهاز التنفس الاصطناعي (Mechanical Ventilator)',
        en: 'Hospital-Grade Power Cord - Ventilator',
        voltage: '230 V AC / 350 W Load',
        standard: 'UL 817 / IEC 60320-1 SJT 3x1.5mm² Hospital Grade',
        insulation: 'Medical Antimicrobial Silicone Jacket with Green Dot Grounding',
        category: 'دعم حياة حرج (Life Support Critical)',
        protection: 'مقبس أحمر مخصص غير قابل للفصل العرضي',
      }),

      // Branch 2: Vital Signs Monitor (مراقبة المؤشرات الحيوية)
      makeCablePath('branch-monitor', [
        [4.54, 0.58, 0.58],
        [4.90, 0.45, 0.65],
        [5.45, 0.32, 0.70],
        [5.85, 0.55, 0.71],
        [6.10, 0.85, 0.72]
      ], '#34d399', 'ac', 5, 'monitor', {
        title: 'كابل شاشة مراقبة المؤشرات الحيوية (Patient Monitor)',
        en: 'Hospital-Grade Power Cord - Monitor',
        voltage: '230 V AC / 60 W Load',
        standard: 'SJT 3x1.0mm² Hospital Grade with Molded Strain Relief',
        insulation: 'Medical Grey Flexible PVC',
        category: 'مراقبة حيوية مستمرة',
        protection: 'مقبس عناية قياسي أخضر مع تأريض متساوي الجهد',
      }),

      // Branch 3: IV Infusion Pumps (مضخات المحاليل الوريدية)
      makeCablePath('branch-infusion', [
        [4.67, 0.58, 0.58],
        [5.30, 0.42, 0.66],
        [6.10, 0.28, 0.72],
        [6.80, 0.45, 0.76],
        [7.35, 0.72, 0.80]
      ], '#38bdf8', 'ac', 5, 'infusion', {
        title: 'كابل مضخات المحاليل الوريدية (Infusion Pumps ×2)',
        en: 'Hospital-Grade Power Cord - Infusion Pumps',
        voltage: '230 V AC / 60 W Load',
        standard: 'SJT 3x1.0mm² Medical Flex Cord',
        insulation: 'Clean White Hospital Grade Jacket',
        category: 'ضخ محاليل وريدية حرجة',
        protection: 'مقبس عناية قياسي أخضر',
      }),

      // Branch 4: Syringe Pump (مضخة الحقن الدقيق)
      makeCablePath('branch-syringe', [
        [4.80, 0.58, 0.58],
        [5.60, 0.40, 0.75],
        [6.60, 0.28, 0.95],
        [7.50, 0.30, 1.20],
        [8.05, 0.48, 1.35],
        [8.35, 0.62, 1.45]
      ], '#34d399', 'ac', 5, 'syringe', {
        title: 'كابل مضخة الحقن الدقيق (Precision Syringe Pump)',
        en: 'Hospital-Grade Power Cord - Syringe Pump',
        voltage: '230 V AC / 25 W Load',
        standard: 'SJT 3x0.75mm² Medical Grade Cord',
        insulation: 'Clean White Medical Flex',
        category: 'حقن دوائي ميكروي',
        protection: 'مقبس عناية قياسي أخضر',
      }),

      // Branch 5: Defibrillator Crash Cart (جهاز الصدمات الكهربائية)
      makeCablePath('branch-defib', [
        [4.93, 0.58, 0.58],
        [4.75, 0.40, 1.00],
        [4.55, 0.28, 1.50],
        [4.45, 0.45, 1.90],
        [4.40, 0.72, 2.25]
      ], '#f59e0b', 'ac', 6, 'defib', {
        title: 'كابل جهاز الصدمات والإنعاش القلبي (Defibrillator Crash Cart)',
        en: 'Hospital-Grade Power Cord - Defibrillator',
        voltage: '230 V AC / 200 W (شحن سريع للمكثفات)',
        standard: 'SJTW 3x1.5mm² High-Current Silicone Flex',
        insulation: 'Vivid Safety Orange Medical Rubber',
        category: 'إنعاش قلبي طارئ',
        protection: 'مقبس أحمر مخصص لطوارئ الإنعاش',
      }),

      // Branch 6: Infant Incubator (حاضنة الأطفال)
      makeCablePath('branch-incubator', [
        [5.06, 0.58, 0.58],
        [5.80, 0.42, 1.10],
        [6.70, 0.28, 1.90],
        [7.40, 0.30, 2.80],
        [7.85, 0.48, 3.30],
        [8.05, 0.68, 3.60]
      ], '#38bdf8', 'ac', 6, 'incubator', {
        title: 'كابل حاضنة الأطفال حديثي الولادة (Infant Incubator)',
        en: 'Hospital-Grade Power Cord - Incubator',
        voltage: '230 V AC / 400 W (تدفئة وتنظيم حراري)',
        standard: 'SJT 3x1.5mm² Thermal-Resistant Hospital Grade',
        insulation: 'Medical Royal Blue Heavy Flex',
        category: 'رعاية حديثي الولادة الحرجة',
        protection: 'مقبس أزرق مخصص مع مراقبة تسريب تيار فائقة الحساسية',
      }),

      // Branch 7: Oxygen Concentrator (مولد الأكسجين الطبي)
      makeCablePath('branch-oxygen', [
        [5.19, 0.58, 0.58],
        [4.85, 0.42, 1.20],
        [4.45, 0.28, 2.10],
        [4.25, 0.30, 3.10],
        [4.15, 0.45, 3.55],
        [4.10, 0.65, 3.80]
      ], '#60a5fa', 'ac', 6, 'oxygen', {
        title: 'كابل مركّز الأوكسجين الطبي (Oxygen Concentrator)',
        en: 'Hospital-Grade Power Cord - Oxygen Concentrator',
        voltage: '230 V AC / 300 W (محرك ضاغط طبي)',
        standard: 'Heavy-Duty SJT 3x1.5mm² Medical Grade',
        insulation: 'Medical Heavy Blue Flex',
        category: 'توليد أكسجين مستمر',
        protection: 'مقبس أزرق مع حماية ضد تيار البدء',
      })
    ];
  }

  attachEvents() {
    this.pointerDown = (event) => {
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      this.raycaster.setFromCamera(this.pointer, this.camera);
      const hits = this.raycaster.intersectObjects(this.scene.children, true).filter(h => !h.object.userData.isLabel && h.object.userData.selectId);
      if (!hits.length) return;
      const obj = hits[0].object;
      const id = obj.userData.selectId;
      const type = obj.userData.selectType || (DEVICES.some(d => d.id === id) ? 'device' : 'component');
      this.select(id);
      this.onSelect(id, type);
    };
    this.renderer.domElement.addEventListener('pointerdown', this.pointerDown);
    this.renderer.domElement.addEventListener('pointermove', (event) => {
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      this.raycaster.setFromCamera(this.pointer, this.camera);
      const hits = this.raycaster.intersectObjects(this.scene.children, true).filter(h => h.object.userData.selectId && !h.object.userData.isLabel);
      this.renderer.domElement.style.cursor = hits.length ? 'pointer' : 'grab';
    });
  }

  select(id) {
    this.selectedId = id;
    for (const [key, group] of this.groups) {
      const isSelected = key === id || (id === 'icu' && key === 'icu');
      group.traverse(obj => {
        if (!obj.isMesh) return;
        if (obj.material && obj.material.emissive) {
          if (!obj.userData.baseEmissive) obj.userData.baseEmissive = obj.material.emissive.clone();
          obj.material.emissive.copy(isSelected ? new THREE.Color('#2582bf') : obj.userData.baseEmissive);
          obj.material.emissiveIntensity = isSelected ? 0.55 : (obj.material.emissiveIntensity || 0.1);
        }
      });
    }
    // High-visibility pulse highlight for selected cable
    if (this.pathMeshes) {
      this.pathMeshes.forEach(mesh => {
        const isSelected = mesh.userData.pathId === id;
        if (isSelected) {
          mesh.scale.set(1.45, 1.45, 1);
          if (mesh.material && mesh.material.emissive) {
            mesh.material.emissiveIntensity = 1.4;
          }
        } else {
          mesh.scale.set(1, 1, 1);
        }
      });
    }
  }

  animateCameraTo(targetPos, targetLookAt, duration = 1200) {
    const startPos = this.camera.position.clone();
    const startTarget = this.controls.target.clone();
    const startTime = performance.now();

    if (this.cameraAnimation) cancelAnimationFrame(this.cameraAnimation);

    const step = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      this.camera.position.lerpVectors(startPos, targetPos, ease);
      this.controls.target.lerpVectors(startTarget, targetLookAt, ease);
      this.controls.update();

      if (progress < 1) {
        this.cameraAnimation = requestAnimationFrame(step);
      } else {
        this.cameraAnimation = null;
      }
    };
    this.cameraAnimation = requestAnimationFrame(step);
  }

  setView(view) {
    const isMobile = this.camera.aspect < 1.0;
    const views = {
      overview: {
        pos: isMobile ? new THREE.Vector3(15.5, 13.0, 16.5) : new THREE.Vector3(12.5, 10.5, 13.5),
        target: new THREE.Vector3(0.5, 0.8, -0.8)
      },
      power: {
        pos: isMobile ? new THREE.Vector3(-1.0, 7.8, 8.5) : new THREE.Vector3(-1.0, 6.2, 6.8),
        target: new THREE.Vector3(-2.2, 1.2, -2.5)
      },
      medical: {
        pos: isMobile ? new THREE.Vector3(10.8, 6.5, 7.0) : new THREE.Vector3(9.2, 5.0, 5.5),
        target: new THREE.Vector3(6.2, 1.3, 1.0)
      },
      top: {
        pos: isMobile ? new THREE.Vector3(0.1, 26.0, -0.5) : new THREE.Vector3(0.1, 19.5, -0.5),
        target: new THREE.Vector3(0, 0, -0.5)
      },
    };
    const v = views[view] || views.overview;
    this.animateCameraTo(v.pos, v.target, 1100);
  }

  // Guided Video Tour with Studio Human Audio
  goToTourStep(index) {
    if (index < 0 || index >= TOUR_STEPS.length) return;
    this.tourIndex = index;
    const step = TOUR_STEPS[index];
    let camPos = step.camPos.clone();
    if (this.camera.aspect < 1.0) {
      const dir = new THREE.Vector3().subVectors(camPos, step.lookAt).multiplyScalar(1.22);
      camPos = new THREE.Vector3().addVectors(step.lookAt, dir);
      camPos.y += 0.8;
    }
    this.animateCameraTo(camPos, step.lookAt, 1400);

    if (step.targetId) {
      this.select(step.targetId);
      this.onSelect(step.targetId, 'component');
    } else {
      this.select(null);
    }

    if (this.voiceEnabled) {
      this.playStepAudio(step);
    } else {
      this.stopAudio();
    }

    this.onTourChange(this.tourIndex, step, this.tourPlaying);
  }

  playStepAudio(step) {
    this.stopAudio();
    if (!this.voiceEnabled) return;

    const candidates = getAudioCandidateUrls(step.audioFile);
    let candidateIndex = 0;
    let hasStartedAudio = false;
    const narrationText = step.narration;

    const playFallbackTTS = () => {
      if (hasStartedAudio) return;
      hasStartedAudio = true;
      this.speakNarration(narrationText);
    };

    const tryCandidate = () => {
      if (hasStartedAudio || !this.voiceEnabled) return;
      if (candidateIndex >= candidates.length) {
        console.warn('All audio file candidates failed, trying Arabic SpeechSynthesis:', candidates);
        playFallbackTTS();
        return;
      }

      const audioUrl = candidates[candidateIndex++];
      const audio = new Audio();
      audio.preload = 'auto';
      audio.src = audioUrl;
      this.currentAudio = audio;

      const fallbackTimer = setTimeout(() => {
        if (!hasStartedAudio && this.voiceEnabled) {
          try { audio.pause(); } catch(e) {}
          tryCandidate();
        }
      }, 1500);

      audio.addEventListener('playing', () => {
        hasStartedAudio = true;
        clearTimeout(fallbackTimer);
      }, { once: true });

      audio.addEventListener('ended', () => {
        if (this.tourPlaying) {
          this.tourTimer = setTimeout(() => {
            if (this.tourPlaying) this.nextTourStep();
          }, 1400);
        }
      }, { once: true });

      audio.addEventListener('error', (err) => {
        console.warn('Audio candidate failed to load:', audioUrl, err);
        clearTimeout(fallbackTimer);
        tryCandidate();
      }, { once: true });

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn('Audio play() rejected on candidate:', audioUrl, err);
          clearTimeout(fallbackTimer);
          tryCandidate();
        });
      }
    };

    tryCandidate();
  }

  speakNarration(text) {
    if (!this.voiceEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      setTimeout(() => {
        try {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'ar-SA';
          utterance.rate = 0.95;
          utterance.pitch = 1.0;

          const voices = window.speechSynthesis.getVoices();
          const arabicVoice = voices.find(v => v.lang && (v.lang.startsWith('ar') || v.lang.includes('ar')));
          if (arabicVoice) {
            utterance.voice = arabicVoice;
          }

          utterance.onend = () => {
            if (this.tourPlaying) {
              this.tourTimer = setTimeout(() => {
                if (this.tourPlaying) this.nextTourStep();
              }, 1400);
            }
          };

          utterance.onerror = (e) => {
            console.warn('SpeechSynthesis error:', e);
            if (this.tourPlaying) {
              this.tourTimer = setTimeout(() => {
                if (this.tourPlaying) this.nextTourStep();
              }, 4000);
            }
          };

          window.speechSynthesis.speak(utterance);
        } catch (e2) {}
      }, 50);
    } catch (e) {
      console.warn('SpeechSynthesis failed:', e);
    }
  }

  stopAudio() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) {}
      this.currentAudio = null;
    }
    if (this.tourTimer) {
      clearTimeout(this.tourTimer);
      this.tourTimer = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
  }

  nextTourStep() {
    const next = (this.tourIndex + 1) % TOUR_STEPS.length;
    this.goToTourStep(next);
  }

  prevTourStep() {
    const prev = (this.tourIndex - 1 + TOUR_STEPS.length) % TOUR_STEPS.length;
    this.goToTourStep(prev);
  }

  startTour() {
    this.tourPlaying = true;
    this.voiceEnabled = true;
    this.goToTourStep(this.tourIndex);
    this.onTourChange(this.tourIndex, TOUR_STEPS[this.tourIndex], true);
  }

  pauseTour() {
    this.tourPlaying = false;
    this.stopAudio();
    this.onTourChange(this.tourIndex, TOUR_STEPS[this.tourIndex], false);
  }

  setVoiceEnabled(enabled) {
    this.voiceEnabled = enabled;
    if (!enabled) {
      this.stopAudio();
    } else if (TOUR_STEPS[this.tourIndex]) {
      this.playStepAudio(TOUR_STEPS[this.tourIndex]);
    }
  }

  toggleFullscreen() {
    const isFull = !!(
      document.fullscreenElement || 
      document.webkitFullscreenElement || 
      this.container.classList.contains('fake-fullscreen')
    );
    if (isFull) {
      this.exitFullscreen();
    } else {
      this.enterFullscreen();
    }
  }

  enterFullscreen() {
    const el = this.container;
    const req = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;

    if (req) {
      try {
        const p = req.call(el);
        if (p && p.catch) {
          p.catch(() => {
            this.enableFakeFullscreen();
          });
        }
      } catch (e) {
        this.enableFakeFullscreen();
      }
    } else {
      // Mobile Safari / iOS fallback
      this.enableFakeFullscreen();
    }
    this.updateFullscreenUI(true);
  }

  exitFullscreen() {
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      try {
        const exit = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
        exit?.call(document);
      } catch (e) {}
    }
    this.disableFakeFullscreen();
    this.updateFullscreenUI(false);
  }

  enableFakeFullscreen() {
    this.container.classList.add('fake-fullscreen');
    document.body.classList.add('has-fullscreen-canvas');
    this.triggerFullscreenResize();
  }

  disableFakeFullscreen() {
    this.container.classList.remove('fake-fullscreen');
    document.body.classList.remove('has-fullscreen-canvas');
    this.triggerFullscreenResize();
  }

  triggerFullscreenResize() {
    setTimeout(() => this.resize(), 60);
    setTimeout(() => this.resize(), 200);
    setTimeout(() => this.resize(), 450);
  }

  updateFullscreenUI(isFullscreen) {
    const btns = document.querySelectorAll('[data-action="fullscreen"]');
    btns.forEach(btn => {
      if (btn.classList.contains('mobile-fab-btn')) {
        const icon = btn.querySelector('.fab-icon');
        const label = btn.querySelector('.fab-label');
        if (icon) icon.textContent = isFullscreen ? '✕' : '⛶';
        if (label) label.textContent = isFullscreen ? 'تصغير' : 'شاشة';
        btn.title = isFullscreen ? 'إلغاء ملء الشاشة' : 'ملء الشاشة';
      } else {
        btn.textContent = isFullscreen ? '✕' : '⛶';
        btn.title = isFullscreen ? 'إلغاء ملء الشاشة' : 'ملء الشاشة';
      }
    });
  }

  triggerAtsSpark() {
    if (!this.atsSparkLight) return;
    this.atsSparkLight.intensity = 8.5;
    this.atsSparkLight.color.set('#8bf5ff');
    this.atsSparkTime = performance.now();
    if (this.onEvent) {
      this.onEvent('grid-cut', {
        title: '⚡ تفعيل مفتاح التحويل التلقائي ATS',
        message: 'انقطعت الشبكة الكهربائية العامة! قام نظام ATS بالتحويل اللحظي إلى عاكس الطاقة وبنك البطاريات خلال أقل من 10ms دون انقطاع التغذية عن أجهزة دعم الحياة.'
      });
    }
  }

  triggerGridRestore() {
    if (!this.atsSparkLight) return;
    this.atsSparkLight.intensity = 4.5;
    this.atsSparkLight.color.set('#33d6a6');
    this.atsSparkTime = performance.now();
    if (this.onEvent) {
      this.onEvent('grid-restore', {
        title: '↻ عودة الشبكة الكهربائية وتزامن المنظومة',
        message: 'عادت الشبكة الكهربائية للعمل! يقوم نظام ATS بإعادة ربط التغذية الرئيسية وشحن بنك البطاريات مع استمرار تغذية أحمال العناية المركزة.'
      });
    }
  }

  // Animate state changes in the 3D world
  updateState(state) {
    const prevGrid = this.currentState.gridAvailable;
    this.currentState = { ...this.currentState, ...state };

    // Dynamic ATS contactor event trigger
    if (prevGrid === true && state.gridAvailable === false) {
      this.triggerAtsSpark();
    } else if (prevGrid === false && state.gridAvailable === true) {
      this.triggerGridRestore();
    }

    // 1. Solar irradiance sunlight intensity & panel reflectivity
    if (this.sunLight) {
      const irrRatio = Math.max(0.1, (state.irradiance ?? 70) / 100);
      this.sunLight.intensity = 0.5 + irrRatio * 3.5;
    }

    // 2. Battery SOC Status Bar
    if (this.batteryBar) {
      const ratio = Math.max(0, Math.min(1, (state.soc ?? 71) / 100));
      this.batteryBar.scale.x = Math.max(0.03, ratio);
      this.batteryBar.position.x = -0.37 + ratio * 0.35;
      this.batteryBar.material = ratio < 0.15 ? MAT.red : ratio < 0.35 ? MAT.orange : MAT.green;
    }

    // 3. Grid Status Indicator & ATS LEDs
    if (this.gridIndicator) {
      this.gridIndicator.material = state.gridAvailable ? MAT.green : MAT.red;
    }
    if (this.atsUtilityLed) this.atsUtilityLed.material = state.gridAvailable ? MAT.green : MAT.red;
    if (this.atsInverterLed) this.atsInverterLed.material = !state.gridAvailable ? MAT.green : MAT.orange;

    // ICU Bedside Distribution Status LED
    if (this.icuDistLed) {
      const hasPower = (state.solarDcW > 0 || state.gridSupplyW > 0 || state.batterySupplyW > 0);
      this.icuDistLed.material.emissiveIntensity = hasPower ? 0.9 : 0.1;
      this.icuDistLed.material.color.set(state.unmetLoadW > 1 ? '#ff6d81' : '#33d6a6');
    }

    // 4. Device Screen Power states
    for (const device of (state.devices || DEVICES)) {
      const screen = this.deviceScreens.get(device.id);
      if (screen && screen.isMesh && screen.material && !screen.material.map) {
        screen.material = device.on ? MAT.glass : new THREE.MeshStandardMaterial({ color: '#1c2430', roughness: 0.6 });
      }
    }

    // 5. Inverter LCD Screen Update
    if (this.inverterTexture) {
      this.inverterTexture.update(state.loadW || 695, state.soc || 71);
    }
  }

  setConnectionsVisible(value) {
    this.showConnections = Boolean(value);
    if (this.cableGroup) this.cableGroup.visible = this.showConnections;
    if (this.pathMeshes) this.pathMeshes.forEach(mesh => mesh.visible = this.showConnections);
    if (this.pathDots) this.pathDots.forEach(dot => dot.visible = this.showConnections);
  }

  resize() {
    const width = Math.max(this.container.clientWidth, 1);
    const height = Math.max(this.container.clientHeight, 1);
    const aspect = width / height;
    this.camera.aspect = aspect;
    if (aspect < 1.0) {
      // Mobile portrait view: broaden FOV so whole ICU system is in comfortable view
      this.camera.fov = Math.min(64, Math.max(46, 38 / aspect));
    } else {
      this.camera.fov = 40;
    }
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  animate() {
    this.frameId = requestAnimationFrame(this.animate);
    const elapsed = this.clock.getElapsedTime();

    // Update live animated textures
    this.ecgTexture.update(elapsed);
    this.ventTexture.update(elapsed);

    // ATS Lever Smooth Rotation Animation
    if (this.atsSwitchLever) {
      const targetRot = this.currentState.gridAvailable ? 0 : Math.PI / 4;
      this.atsSwitchLever.rotation.z += (targetRot - this.atsSwitchLever.rotation.z) * 0.18;
    }

    // ATS Spark Light decay
    if (this.atsSparkTime && this.atsSparkLight) {
      const dt = performance.now() - this.atsSparkTime;
      if (dt < 400) {
        this.atsSparkLight.intensity = Math.max(0, 8.5 * (1 - dt / 400));
      } else {
        this.atsSparkLight.intensity = 0;
        this.atsSparkTime = null;
      }
    }

    const gridOn = this.currentState.gridAvailable;
    const devices = this.currentState.devices || [];

    // Real-time Bedside Distribution Console Socket LEDs
    if (this.socketLeds) {
      for (const dev of devices) {
        const led = this.socketLeds.get(dev.id);
        if (led) {
          const on = dev.on && (this.currentState.loadW > 0);
          led.material.color.set(on ? '#2cd89f' : '#ff9f43');
          led.material.emissive.set(on ? '#2cd89f' : '#ff9f43');
          led.material.emissiveIntensity = on ? 0.95 : 0.12;
        }
      }
    }

    // Billboard 3D Cable Identification Tags toward camera
    if (this.cableTags && this.cableTags.length) {
      for (let i = 0; i < this.cableTags.length; i++) {
        this.cableTags[i].quaternion.copy(this.camera.quaternion);
      }
    }

    // Multi-Particle animated energy flow on every cable and branch
    this.pathDots.forEach(dot => {
      const medium = dot.userData.medium;
      const devId = dot.userData.deviceId;
      let active = true;
      let flowSpeed = 0.14;

      if (devId) {
        const dev = devices.find(d => d.id === devId);
        active = dev ? dev.on : true;
        flowSpeed = 0.10 + ((dev?.watts || 50) / 400) * 0.12;
      } else if (medium === 'dc') {
        active = (this.currentState.solarDcW > 0);
        flowSpeed = 0.06 + Math.min(0.24, (this.currentState.solarDcW / 2400) * 0.22);
      } else if (medium === 'grid') {
        active = gridOn;
        flowSpeed = 0.16;
      } else if (medium === 'battery') {
        // When grid is OFF, battery discharges intensely into inverter!
        active = (!gridOn || this.currentState.batterySupplyW > 0);
        flowSpeed = (!gridOn) ? 0.28 : 0.12;
      } else if (medium === 'ac') {
        active = (this.currentState.loadW > 0);
        flowSpeed = 0.13 + Math.min(0.12, (this.currentState.loadW / 2000) * 0.10);
      }

      dot.visible = this.showConnections && active;

      if (dot.visible && dot.userData.curve) {
        let t = (elapsed * flowSpeed + (dot.userData.phase || 0)) % 1;
        if (t < 0) t += 1;
        t = Math.max(0.0001, Math.min(0.9999, t));
        if (Number.isFinite(t)) {
          dot.position.copy(dot.userData.curve.getPoint(t));
        }

        if (dot.userData.isAura) {
          dot.scale.setScalar(1 + Math.sin(elapsed * 6.0 + (dot.userData.phase || 0) * 14.0) * 0.20);
        }
      }
    });

    // Cable tube glow animations
    this.pathMeshes.forEach(mesh => {
      const medium = mesh.userData.medium;
      const devId = mesh.userData.deviceId;
      let active = true;

      if (devId) {
        const dev = devices.find(d => d.id === devId);
        active = dev ? dev.on : true;
      } else if (medium === 'dc') {
        active = (this.currentState.solarDcW > 0);
      } else if (medium === 'grid') {
        active = gridOn;
      } else if (medium === 'battery') {
        active = (!gridOn || this.currentState.batterySupplyW > 0);
      } else if (medium === 'ac') {
        active = (this.currentState.loadW > 0);
      }
      
      mesh.visible = this.showConnections;
      if (mesh.material && mesh.material.emissive) {
        mesh.material.opacity = active ? 0.88 : 0.14;
        mesh.material.emissiveIntensity = active ? (0.72 + Math.sin(elapsed * 3.8) * 0.24) : 0.02;

        if (medium === 'ac' && active && this.currentState.unmetLoadW > 1) {
          mesh.material.color.set('#ff2255');
          mesh.material.emissive.set('#ff1144');
          mesh.material.emissiveIntensity = 0.95 + Math.sin(elapsed * 10.0) * 0.45;
        } else if (medium === 'ac' && active) {
          mesh.material.color.set('#00f5b8');
          mesh.material.emissive.set('#00d69e');
        }
      }
    });

    // Grid status lamp pulse
    if (this.gridIndicator) {
      if (gridOn) {
        this.gridIndicator.material.emissiveIntensity = 0.35 + Math.sin(elapsed * 2.5) * 0.15;
      } else {
        this.gridIndicator.material.emissiveIntensity = 0.75; // steady warning red
      }
    }

    // Lifelike ICU Patient Vitals (Chest breathing & SpO2 pulse sensor)
    if (this.patientChest) {
      const breath = Math.sin(elapsed * 1.57); // 15 breaths per minute respiratory cycle
      this.patientChest.scale.y = 1.0 + breath * 0.06;
      this.patientChest.scale.z = 1.0 + breath * 0.03;
      this.patientChest.position.y = (this.patientChestBaseY || 0.12) + breath * 0.005;
    }
    if (this.patientBlanket) {
      const breath = Math.sin(elapsed * 1.57);
      this.patientBlanket.scale.y = 1.0 + breath * 0.035;
      this.patientBlanket.position.y = (this.patientBlanketBaseY || 0) + breath * 0.004;
    }
    if (this.spo2SensorLed) {
      const pulse = Math.pow(Math.max(0, Math.sin(elapsed * 7.54)), 4); // 72 BPM pulse oximeter heartbeat
      this.spo2SensorLed.material.emissiveIntensity = 0.3 + pulse * 1.4;
    }

    this.controls.update();

    // Prevent camera from entering or penetrating through the back wall when orbiting
    if (this.camera.position.z < -21.2) {
      this.camera.position.z = -21.2;
    }

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    cancelAnimationFrame(this.frameId);
    if (this.cameraAnimation) cancelAnimationFrame(this.cameraAnimation);
    this.stopAudio();
    if (this.onFullscreenChange) {
      document.removeEventListener('fullscreenchange', this.onFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', this.onFullscreenChange);
    }
    if (this.onKeyDown) {
      window.removeEventListener('keydown', this.onKeyDown);
    }
    this.disableFakeFullscreen();
    this.resizeObserver?.disconnect();
    this.renderer.domElement.removeEventListener('pointerdown', this.pointerDown);
    this.controls.dispose();
    this.renderer.dispose();
    this.container.innerHTML = '';
  }
}
