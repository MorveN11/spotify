'use client';

import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/auth.context';
import { MusicProvider } from '@/contexts/music.context';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <MusicProvider>
        {children}
        <Toaster />
      </MusicProvider>
    </AuthProvider>
  );
};
