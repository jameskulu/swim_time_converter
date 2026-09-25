import type { Locale } from './config';
import type { Course, EventDef, Stroke } from '../lib/swimming/events';
import type { IntensityKey, StrokeKey } from '../lib/swimming/calories';
import type { DistanceUnit } from '../lib/swimming/speed';
import { calculatorDe } from './calculator.de';
import { calculatorEn } from './calculator.en';
import { calculatorEs } from './calculator.es';
import { calculatorFr } from './calculator.fr';
import { calculatorIt } from './calculator.it';
import { calculatorJa } from './calculator.ja';
import { calculatorKo } from './calculator.ko';
import { calculatorPt } from './calculator.pt';

export type { Locale };

export type ConversionErrorCode = 'INVALID_INPUT' | 'UNSUPPORTED_PAIR' | 'UNREASONABLE_TIME';
export type CssZoneKey = 'recovery' | 'aerobic' | 'tempo' | 'threshold' | 'vo2';
export type PoolId = 'scy-25' | 'scm-25' | 'lcm-50';

export interface PoolTranslation {
  label: string;
  shortLabel: string;
  description: string;
}

export interface CalculatorMessages {
  time: {
    label: string;
    format: string;
    minutes: string;
    seconds: string;
    hundredths: string;
    increase: string;
    decrease: string;
  };
  units: {
    meters: string;
    yards: string;
    meter: string;
    yard: string;
    kilograms: string;
    pounds: string;
    minutes: string;
    seconds: string;
    secondsShort: string;
    mps: string;
    kmh: string;
    mph: string;
    kcal: string;
    kcalPerHour: string;
    distanceShort: Record<DistanceUnit, string>;
    pace100: Record<DistanceUnit, string>;
  };
  courses: {
    label: string;
    convertFrom: string;
    convertTo: string;
    convertFromCourse: string;
    convertToCourse: string;
    courseLegend: string;
    equivalentTime: string;
    convertedFrom: string;
    source: string;
    compare: string;
    resultActions: string;
    comparisonCaption: string;
    comparisonCourse: string;
    comparisonEquivalent: string;
    resultHeading: string;
    resultEmptyBefore: string;
    resultEmptyAction: string;
    resultEmptyAfter: string;
    values: Record<Course, { name: string; poolLength: string }>;
  };
  events: {
    label: string;
    strokes: Record<Stroke, string>;
    eventName: (distance: string, stroke: string) => string;
  };
  gender: {
    label: string;
    note: string;
    men: string;
    women: string;
  };
  conversion: {
    button: string;
    methodNote: string;
    copied: string;
    copyBlocked: string;
    linkCopied: string;
    shareTitle: string;
    resultTitle: string;
    invalidTime: string;
    genericError: string;
    copy: string;
    share: string;
    reset: string;
  };
  pace: {
    customPhase: string;
    totalDistance: string;
    distanceUnit: string;
    pacePer: string;
    paceInterval: string;
    customPaceDistance: string;
    calculate: string;
    empty: string;
    results: string;
    per: string;
    standard: string;
    errors: {
      distance: string;
      time: string;
      phase: string;
    };
  };
  split: {
    perOption: string;
    commonRaceDistances: string;
    raceDistance: string;
    distanceUnit: string;
    splitLength: string;
    generate: string;
    empty: string;
    results: string;
    splitSummary: string;
    after: string;
    errors: {
      distance: string;
      time: string;
      divisibility: string;
    };
  };
  css: {
    test: string;
    testMethod: string;
    testTime: string;
    distanceUnit: string;
    calculate: string;
    cssPace: string;
    cssSpeed: string;
    speedUnit: string;
    trainingZones: string;
    tableCaption: string;
    zone: string;
    pace: string;
    perception: string;
    pacing: string;
    projected: string;
    empty: string;
    errors: {
      longTime: string;
      shortTime: string;
      plausible: string;
      relationship: string;
    };
    zones: Record<CssZoneKey, { label: string; purpose: string }>;
  };
  interval: {
    setBuilder: string;
    whatToCalculate: string;
    restToSendOff: string;
    restToSendOffDescription: string;
    sendOffToRest: string;
    sendOffToRestDescription: string;
    repeats: string;
    distancePerRepeat: string;
    distanceUnit: string;
    restPerRepeat: string;
    seconds: string;
    sendOff: string;
    pacePer100: string;
    planSet: string;
    empty: string;
    repeatTime: string;
    rest: string;
    useOnClock: string;
    totalSetDistance: string;
    swimTime: string;
    elapsed: string;
    paceResult: string;
    leaveTimes: string;
    rep: string;
    onHorn: string;
    showing: string;
    errors: {
      repeats: string;
      distance: string;
      pace: string;
      rest: string;
      sendOff: string;
      sendOffShorter: string;
    };
  };
  speed: {
    benchmark: string;
    benchmarkDescription: string;
    distanceUnit: string;
    distance: string;
    calculate: string;
    empty: string;
    paceM: string;
    paceYd: string;
    speed: string;
    projected: string;
    projectedRow: string;
    poolMileRow: string;
    keyMilestones: string;
    oneKm: string;
    poolMile: string;
    trueMile: string;
    errors: {
      distance: string;
      time: string;
      plausible: string;
      compute: string;
    };
  };
  calories: {
    bodyWeight: string;
    weightUnit: string;
    swimTime: string;
    minutes: string;
    stroke: string;
    intensity: string;
    estimate: string;
    empty: string;
    estimatedCalories: string;
    perHour: string;
    estimateOnly: string;
    strokeLabels: Record<StrokeKey, string>;
    intensityLabels: Record<IntensityKey, string>;
    errors: {
      weight: string;
      duration: string;
      compute: string;
    };
  };
  lengths: {
    poolLength: string;
    whatDoYouWant: string;
    direction: string;
    distanceToLengths: string;
    lengthsToDistance: string;
    yardsMeters: string;
    swimDistance: string;
    distanceUnit: string;
    numberOfLengths: string;
    lengthDefinition: string;
    yards: string;
    meters: string;
    convert: string;
    emptyDistance: string;
    emptyLengths: string;
    conversionFacts: string;
    compareTimesBefore: string;
    compareTimesEmphasis: string;
    compareTimesAfter: string;
    timeConverterLink: string;
    lengthsUnit: string;
    lengthSummary: string;
    partial: string;
    equivalent: string;
    preset: string;
    pools: Record<PoolId, PoolTranslation>;
    errors: {
      lengths: string;
      distance: string;
      computeDistance: string;
      computeLengths: string;
    };
  };
  conversionErrors: Record<ConversionErrorCode, string>;
}

const messages: Record<Locale, CalculatorMessages> = {
  en: calculatorEn,
  es: calculatorEs,
  ja: calculatorJa,
  fr: calculatorFr,
  pt: calculatorPt,
  de: calculatorDe,
  ko: calculatorKo,
  it: calculatorIt,
};

export type CalculatorMessageValues = Record<string, string | number>;

export function getCalculatorMessages(locale: Locale = 'en'): CalculatorMessages {
  return messages[locale];
}

export function formatCalculatorMessage(template: string, values: CalculatorMessageValues): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => {
    const value = values[key];
    return value === undefined ? match : String(value);
  });
}

export function getEventLabel(event: Pick<EventDef, 'name' | 'stroke'>, course: Course, locale: Locale = 'en'): string {
  if (locale === 'en') return event.name[course];
  const distance = /^(\d+)/.exec(event.name[course])?.[1] ?? event.name[course];
  const stroke = getCalculatorMessages(locale).events.strokes[event.stroke];
  return getCalculatorMessages(locale).events.eventName(distance, stroke);
}

export function getStrokeLabel(stroke: Stroke, locale: Locale = 'en'): string {
  return getCalculatorMessages(locale).events.strokes[stroke];
}

export function getCalorieStrokeLabel(stroke: StrokeKey, locale: Locale = 'en'): string {
  return getCalculatorMessages(locale).calories.strokeLabels[stroke];
}

export function getIntensityLabel(intensity: IntensityKey, locale: Locale = 'en'): string {
  return getCalculatorMessages(locale).calories.intensityLabels[intensity];
}

export function getCssZoneLabel(key: CssZoneKey, locale: Locale = 'en'): string {
  return getCalculatorMessages(locale).css.zones[key].label;
}

export function getCssZonePurpose(key: CssZoneKey, locale: Locale = 'en'): string {
  return getCalculatorMessages(locale).css.zones[key].purpose;
}

export function getPoolTranslation(pool: PoolId, locale: Locale = 'en'): PoolTranslation {
  return getCalculatorMessages(locale).lengths.pools[pool];
}

export function getCourseTranslation(course: Course, locale: Locale = 'en'): { name: string; poolLength: string } {
  return getCalculatorMessages(locale).courses.values[course];
}

export function getConversionErrorMessage(code: ConversionErrorCode, locale: Locale = 'en'): string {
  return getCalculatorMessages(locale).conversionErrors[code];
}

export function localizeConversionError(error: { code: ConversionErrorCode; message: string }, locale: Locale = 'en'): string {
  return locale === 'en' ? error.message : getConversionErrorMessage(error.code, locale);
}
