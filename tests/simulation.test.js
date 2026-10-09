import test from 'node:test';
import assert from 'node:assert/strict';
import { calculatePower, advanceBatterySoc } from '../src/simulation.js';
import { DEVICES } from '../src/data.js';

test('initial device load matches source file: 695 W', () => {
  const state = calculatePower({ irradiance: 70, soc: 71, gridAvailable: true, devices: DEVICES });
  assert.equal(state.loadW, 695);
});

test('solar generation becomes zero when irradiance is zero', () => {
  const state = calculatePower({ irradiance: 0, soc: 71, gridAvailable: true, devices: DEVICES });
  assert.equal(state.solarDcW, 0);
});

test('grid outage exposes battery support and unmet load', () => {
  const state = calculatePower({ irradiance: 0, soc: 71, gridAvailable: false, devices: DEVICES });
  assert.equal(state.gridSupplyW, 0);
  assert.ok(state.batterySupplyW > 0);
  assert.ok(state.unmetLoadW >= 0);
});

test('battery below minimum SOC cannot supply power in outage mode', () => {
  const state = calculatePower({ irradiance: 0, soc: 2, gridAvailable: false, devices: DEVICES });
  assert.equal(state.batterySupplyW, 0);
  assert.equal(state.unmetLoadW, state.loadW);
});

test('full emergency load totals 1395 W', () => {
  const allOn = DEVICES.map(device => ({ ...device, on: true }));
  const state = calculatePower({ irradiance: 50, soc: 71, gridAvailable: true, devices: allOn });
  assert.equal(state.loadW, 1395);
});

test('battery state of charge is clamped to valid percentage range', () => {
  assert.ok(advanceBatterySoc({ soc: 100, hours: 10, irradiance: 100, gridAvailable: true }) <= 100);
  assert.ok(advanceBatterySoc({ soc: 0, hours: 10, irradiance: 0, gridAvailable: false }) >= 0);
});
