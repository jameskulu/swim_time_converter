/** Tiny analytics bridge. Pushes to Google Analytics (gtag/dataLayer) when the
 *  snippet is present; otherwise no-ops. Fire-and-forget, never async-blocking. */

export type EventName =
  | 'calculator_used'
  | 'conversion_completed'
  | 'copy_result'
  | 'share_result'
  | 'pace_calculator_used'
  | 'split_calculator_used'
  | 'css_calculator_used'
  | 'interval_calculator_used'
  | 'speed_calculator_used'
  | 'calories_calculator_used'
  | 'lengths_calculator_used'
  | 'theme_toggled'
  | 'navigation';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(name: EventName, params: Record<string, unknown> = {}): void {
  try {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...params });
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params);
    }
  } catch {
    // Analytics must never break the calculator.
  }
}