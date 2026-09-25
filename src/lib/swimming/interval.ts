/** Interval / send-off planning helpers for swim training sets. */

export interface IntervalPlan {
  /** Seconds per single repeat. */
  repeatSeconds: number;
  /** Leave time (repeat time + rest) in seconds. */
  sendOffSeconds: number;
  /** Rest between repeats in seconds. */
  restSeconds: number;
  /** Total distance of the set in the chosen units. */
  totalDistance: number;
  /** Pure swimming time for the whole set in seconds. */
  totalSwimSeconds: number;
  /** Elapsed time including rest between repeats (scheduled send-offs) in seconds. */
  elapsedSeconds: number;
  /** CSS-style "leave the wall every X seconds" marks for each repeat, in seconds. */
  leaveTimes: number[];
}

export function planInterval(
  repeats: number,
  distancePerRepeat: number,
  pacePer100Seconds: number,
  restSeconds: number,
): IntervalPlan {
  const safety = {
    repeats: Math.max(1, Math.floor(repeats)),
    distancePerRepeat: Math.max(1, distancePerRepeat),
    pacePer100Seconds: Math.max(0.01, pacePer100Seconds),
    restSeconds: Math.max(0, restSeconds),
  };
  const repeatSeconds = (safety.distancePerRepeat / 100) * safety.pacePer100Seconds;
  const sendOffSeconds = repeatSeconds + safety.restSeconds;
  const totalDistance = safety.repeats * safety.distancePerRepeat;
  const totalSwimSeconds = repeatSeconds * safety.repeats;
  const elapsedSeconds = repeatSeconds * safety.repeats + safety.restSeconds * (safety.repeats - 1);
  const leaveTimes: number[] = [];
  for (let i = 0; i < safety.repeats; i += 1) {
    leaveTimes.push(sendOffSeconds * i);
  }
  return {
    repeatSeconds,
    sendOffSeconds,
    restSeconds: safety.restSeconds,
    totalDistance,
    totalSwimSeconds,
    elapsedSeconds,
    leaveTimes,
  };
}

/** Round a send-off up to the nearest multiple of `roundTo` (e.g. 5 or 10 seconds). */
export function roundSendOff(sendOffSeconds: number, roundTo = 5): number {
  return Math.ceil(sendOffSeconds / roundTo) * roundTo;
}