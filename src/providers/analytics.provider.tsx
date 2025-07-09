'use client';

import { usePageTracking } from '@/hooks/analytics/use-analytics';

export const AnalyticsProvider = ({ children }: { children: React.ReactNode }) => {
  usePageTracking();

  return <>{children}</>;
};
