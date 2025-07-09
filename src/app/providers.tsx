'use client';

import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/auth.context';
import { MusicProvider } from '@/contexts/music.context';
import { AnalyticsProvider } from '@/providers/analytics.provider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <MusicProvider>
        <AnalyticsProvider>
          {children}
          <Toaster />
        </AnalyticsProvider>
      </MusicProvider>
    </AuthProvider>
  );
};
