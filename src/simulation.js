import { SYSTEM, DEVICES } from './data.js';

export function calculatePower({ irradiance = 70, soc = 71, gridAvailable = true, devices = DEVICES } = {}) {
  const safeIrradiance = clamp(Number(irradiance) || 0, 0, 100);
  const safeSoc = clamp(Number(soc) || 0, 0, 100);
  const loadW = devices.reduce((sum, device) => sum + (device.on ? device.watts : 0), 0);
  const solarDcW = safeIrradiance / 100 * SYSTEM.panelWp * SYSTEM.mpptEfficiency;
  const potentialSolarAcW = Math.min(solarDcW * SYSTEM.inverterEfficiency, SYSTEM.inverterLimitW);
  const solarToLoadW = Math.min(loadW, potentialSolarAcW);
  const remainingAfterSolarW = Math.max(0, loadW - solarToLoadW);
  let gridSupplyW = 0;
  let batterySupplyW = 0;
  let unmetLoadW = 0;
  let batteryChargeW = 0;

  if (gridAvailable) {
    gridSupplyW = remainingAfterSolarW;
    const solarSurplusDcW = Math.max(0, solarDcW - loadW / SYSTEM.inverterEfficiency);
    const roomW = (100 - safeSoc) / 100 * SYSTEM.batteryWh;
    batteryChargeW = Math.min(solarSurplusDcW, SYSTEM.batteryMaxChargeW, roomW);
  } else {
    const batteryAllowed = safeSoc > SYSTEM.minimumSoc;
    const remainingInverterCapacityW = Math.max(0, SYSTEM.inverterLimitW - solarToLoadW);
    batterySupplyW = batteryAllowed
      ? Math.min(remainingAfterSolarW, remainingInverterCapacityW, SYSTEM.batteryMaxDischargeW)
      : 0;
    unmetLoadW = Math.max(0, remainingAfterSolarW - batterySupplyW);
  }

  const dcBatteryDischargeW = batterySupplyW / SYSTEM.inverterEfficiency;
  const autonomyHours = (() => {
    if (gridAvailable) return null;
    const remainingDcW = Math.max(0, loadW / SYSTEM.inverterEfficiency - solarDcW);
    const usableWh = Math.max(0, safeSoc - SYSTEM.minimumSoc) / 100 * SYSTEM.batteryWh;
    if (remainingDcW <= 1) return null;
    return usableWh / remainingDcW;
  })();

  return {
    loadW,
    irradiance: safeIrradiance,
    soc: safeSoc,
    gridAvailable: Boolean(gridAvailable),
    solarDcW,
    potentialSolarAcW,
    solarToLoadW,
    gridSupplyW,
    batterySupplyW,
    batteryChargeW,
    dcBatteryDischargeW,
    unmetLoadW,
    autonomyHours,
    sourceTotalW: solarToLoadW + gridSupplyW + batterySupplyW,
    inverterLimitW: SYSTEM.inverterLimitW,
    overload: loadW > SYSTEM.inverterLimitW,
  };
}

export function advanceBatterySoc({ soc, hours = 1 / 60, irradiance = 70, gridAvailable = true, devices = DEVICES } = {}) {
  const state = calculatePower({ irradiance, soc, gridAvailable, devices });
  const capacityWh = SYSTEM.batteryWh;
  // هذا التكامل مبسّط لأغراض التعليم؛ لا يحاكي خصائص الخلايا أو BMS.
  let deltaWh = state.batteryChargeW * hours * 0.95 - state.dcBatteryDischargeW * hours;
  if (gridAvailable && state.batteryChargeW <= 0) deltaWh = 0;
  const next = clamp((Number(soc) || 0) + deltaWh / capacityWh * 100, 0, 100);
  return Math.max(0, Math.min(100, next));
}

export function formatPower(value) {
  return `${Math.round(value || 0).toLocaleString('en-US')} W`;
}

export function formatDuration(hours) {
  if (hours == null || !Number.isFinite(hours)) return 'يعتمد على توفر الشمس';
  if (hours <= 0) return 'لا توجد طاقة قابلة للاستخدام';
  if (hours >= 24) return `${(hours / 24).toFixed(1)} يوم`;
  if (hours >= 1) return `${hours.toFixed(1)} ساعة`;
  return `${Math.max(1, Math.round(hours * 60))} دقيقة`;
}

function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }
