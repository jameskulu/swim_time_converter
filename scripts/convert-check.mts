import { EVENTS } from '../src/lib/swimming/events';
import type { Course } from '../src/lib/swimming/events';
import { formatSwimTime, parseSwimTime } from '../src/lib/swimming/time';
import { convertToAllCourses, convertTime, tryConvertTime } from '../src/lib/conversions/index';
import { cssPacePer100, cssProjectedTimes, cssSpeed, cssZones } from '../src/lib/swimming/css';
import { planInterval, roundSendOff } from '../src/lib/swimming/interval';
import { speedResult } from '../src/lib/swimming/speed';
import { caloriesBurned } from '../src/lib/swimming/calories';
import { distanceForLengths, lengthsForDistance } from '../src/lib/swimming/lengths';

let failures = 0;
function check(name: string, cond: boolean, detail = '') {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${cond ? '' : '  -> ' + detail}`);
  if (!cond) failures++;
}

// --- time parsing ---
const parse = (raw: string): number => parseSwimTime(raw) ?? -1;
check('parse 52.43', parse('52.43') === 52.43);
check('parse 1:52.37', Math.abs(parse('1:52.37') - 112.37) < 1e-9);
check('parse 0:52', parse('0:52') === 52);
check('parse 4:32.15', Math.abs(parse('4:32.15') - 272.15) < 1e-9);
check('reject bad seconds >=60', parse('1:75.00') < 0);
check('reject empty', parse('') < 0);
check('reject negative-ish', parse('-5') < 0);
check('format 112.37', formatSwimTime(112.37) === '1:52.37');
check('format 52.43', formatSwimTime(52.43) === '52.43');

// --- conversion sanity (100 Free, SCY) ---
const ev = EVENTS.find((e) => e.id === '100-free')!;
const res = convertToAllCourses({ courseFrom: 'SCY', event: ev, seconds: 52.43, gender: 'Men', method: 'standard' });
// Results are ordered SCY, SCM, LCM.
const scm = res[1].seconds;
const lcm = res[2].seconds;
check('100 Free SCY->SCM 58.20', Math.abs(scm - 58.2) < 0.01, String(scm));
check('100 Free SCY->LCM 59.80', Math.abs(lcm - 59.8) < 0.01, String(lcm));

// --- round trip: LCM -> SCY should invert ---
const lcm2scy = convertTime({ courseFrom: 'LCM', courseTo: 'SCY', event: ev, seconds: 59.8, gender: 'Men', method: 'standard' }).seconds;
check('roundtrip LCM->SCY ~52.43', Math.abs(lcm2scy - 52.43) < 0.05, String(lcm2scy));

// --- distance pairings ---
const ev500 = EVENTS.find((e) => e.pairing === 'long400')!;
const d = convertTime({ courseFrom: 'SCY', courseTo: 'LCM', event: ev500, seconds: 300, gender: 'Men', method: 'standard' }).seconds;
check('500y -> 400m LCM = 267.75', Math.abs(d - 300 * 0.8925) < 0.01, String(d));
const d2 = convertTime({ courseFrom: 'SCY', courseTo: 'SCM', event: ev500, seconds: 300, gender: 'Men', method: 'standard' }).seconds;
check('500y -> 400m SCM = 261.35', Math.abs(d2 - (300 * 0.8925 - 6.4)) < 0.01, String(d2));
const d3 = convertTime({ courseFrom: 'SCM', courseTo: 'LCM', event: ev500, seconds: 400, gender: 'Men', method: 'standard' }).seconds;
check('400m SCM -> LCM = 406.4', Math.abs(d3 - 406.4) < 0.01, String(d3));

// --- unsupported / unreasonable ---
const tryRes = tryConvertTime({ courseFrom: 'SCY', courseTo: 'LCM', event: ev, seconds: 3, gender: 'Men', method: 'standard' });
check('unreasonable time rejected', 'error' in tryRes);

// --- IM increment ---
const im400 = EVENTS.find((e) => e.id === '400-im')!;
const im = convertTime({ courseFrom: 'SCM', courseTo: 'LCM', event: im400, seconds: 300, gender: 'Men', method: 'standard' }).seconds;
check('400 IM SCM->LCM +6.4', Math.abs(im - 306.4) < 0.01, String(im));

// --- all events convert without error with a plausible time ---
for (const event of EVENTS) {
  // pick ~2x the plausible-minimum pace so every event is a valid input
  const dist = event.distance['LCM'];
  const seconds = dist * 0.7;
  for (const from of ['SCY', 'SCM', 'LCM'] as Course[]) {
    for (const to of ['SCY', 'SCM', 'LCM'] as Course[]) {
      const r = tryConvertTime({ courseFrom: from, courseTo: to, event, seconds, gender: 'Women', method: 'standard' });
      check(`all ev pairs ok ${event.id} ${from}->${to}`, !('error' in r), 'error' in r ? r.error : '');
    }
  }
}

// --- CSS ---
const cssSpeedVal = cssSpeed({ distanceLong: 400, timeLong: 270, distanceShort: 200, timeShort: 125 });
check('CSS speed (400@4:30, 200@2:05) = 1.379', Math.abs(cssSpeedVal - 1.3793103448) < 1e-6, String(cssSpeedVal));
const cssPace = cssPacePer100(cssSpeedVal);
check('CSS pace per 100 = 72.5s', Math.abs(cssPace - 72.5) < 0.02, String(cssPace));
const zones = cssZones(cssPace);
check('CSS five zones', zones.length === 5);
check('CSS zones descending', zones.every((z, i) => i === 0 || zones[i - 1].toPace > z.toPace));
const proj = cssProjectedTimes(cssPace, [50, 100, 400]);
check('CSS projected 400 = 290s', Math.abs(proj[2].seconds - 290) < 0.1, String(proj[2].seconds));

// --- interval / send-off ---
const plan = planInterval(10, 100, 75, 15);
check('interval repeat = 75s', Math.abs(plan.repeatSeconds - 75) < 1e-9, String(plan.repeatSeconds));
check('interval send-off = 90s', Math.abs(plan.sendOffSeconds - 90) < 1e-9, String(plan.sendOffSeconds));
check('interval total distance = 1000', plan.totalDistance === 1000);
check('interval elapsed = 885', Math.abs(plan.elapsedSeconds - 885) < 1e-9, String(plan.elapsedSeconds));
check('interval leave times count', plan.leaveTimes.length === 10);
check('roundSendOff 92 -> 95', roundSendOff(92) === 95);
check('roundSendOff 90 -> 90', roundSendOff(90) === 90);
check('roundSendOff 92 to 10 -> 100', roundSendOff(92, 10) === 100);

// --- speed ---
const sp = speedResult(320, 800, 'm');
if (sp) {
  check('speed 800m in 5:20 -> 2.5 m/s', Math.abs(sp.speedMps - 2.5) < 1e-9, String(sp.speedMps));
  check('speed kph = 9', Math.abs(sp.speedKmph - 9.0) < 1e-9, String(sp.speedKmph));
  check('speed 100m pace = 40s', Math.abs(sp.pacePer100M - 40) < 1e-9);
  check('speed 100yd pace = 36.576s', Math.abs(sp.pacePer100Yd - 36.576) < 0.02, String(sp.pacePer100Yd));
  check('speed 1km = 400s', Math.abs(sp.oneKmSeconds - 400) < 1e-9, String(sp.oneKmSeconds));
  check('speed pool mile ~ 603.5s', Math.abs(sp.poolMileSeconds - 1650 / (2.5 * 1.09361)) < 0.02, String(sp.poolMileSeconds));
}

// --- calories ---
const kcal = caloriesBurned(68, 60, 'fly', 'vigorous');
check('calories 68kg 60min fly vigorous ~ 985', kcal !== null && Math.abs(kcal - 13.8 * 3.5 * 68 * 60 / 200) < 1e-9, String(kcal));
check('calories invalid weight null', caloriesBurned(0, 30, 'free', 'moderate') === null);

// --- lengths ---
const lf = lengthsForDistance(1500, 25);
check('lengths 1500m/25m pool = 60', lf !== null && lf.fullLengths === 60, String(lf?.fullLengths));
const lf2 = lengthsForDistance(1250, 25);
check('lengths 1250m/25m = 50 full + remainder', lf2 !== null && lf2.fullLengths === 50 && lf2.remainder === 0);
const df = distanceForLengths(66, 25);
check('distance 66 lengths x 25m = 1650m', df !== null && Math.abs(df - 1650) < 1e-9, String(df));

console.log(failures === 0 ? '\nAll checks passed.' : `\n${failures} failures.`);
process.exit(failures === 0 ? 0 : 1);