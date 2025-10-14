'use client';

type AnalyticsEvent = {
  event: string;
  props?: Record<string, unknown>;
};

type AnalyticsProvider = {
  track: (event: AnalyticsEvent) => void;
};

let provider: AnalyticsProvider | null = null;

export function registerAnalytics(customProvider: AnalyticsProvider) {
  provider = customProvider;
}

export function track(event: string, props?: Record<string, unknown>) {
  if (provider) {
    provider.track({ event, props });
    return;
  }

  if (process.env.NODE_ENV !== 'production') {
    console.info('[analytics]', event, props);
  }
}
