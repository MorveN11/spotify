import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';

import { Providers } from '@/app/providers';
import { env } from '@/config/env/client.env';
import { cn } from '@/lib/utils';

import '@/app/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
  title: {
    default: 'Spotify',
    template: '%s | Spotify',
  },
  description: 'Spotify es una plataforma de música en streaming que ofrece acceso a millones de canciones y podcasts.',
};

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={cn(outfit.variable, process.env.NODE_ENV === 'development' && 'debug-screens')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
