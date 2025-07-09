import { logEvent } from 'firebase/analytics';

import { analytics } from './firebase.app';

export const logCustomEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (analytics) {
    logEvent(analytics, eventName, parameters);
  }
};

export const trackPageView = (pageName: string) => {
  logCustomEvent('page_view', {
    page_name: pageName,
  });
};
