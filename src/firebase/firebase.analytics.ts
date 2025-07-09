import { analytics } from '@/firebase/firebase.app';

import { logEvent } from 'firebase/analytics';

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
