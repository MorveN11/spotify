import { useEffect } from 'react';

import { usePathname } from 'next/navigation';

import { trackPageView } from '@/firebase/firebase.analytics';

export const usePageTracking = () => {
  const pathname = usePathname();

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);
};

export const useAnalytics = () => {
  return {
    trackPageView,
  };
};
