'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

import { Disc3, Home, Music, Users } from 'lucide-react';

const navigation = [{ name: 'Inicio', href: '/', icon: Home }];

const admin = [
  { name: 'Géneros', href: '/admin/genres', icon: Disc3 },
  { name: 'Artistas', href: '/admin/artists', icon: Users },
  { name: 'Canciones', href: '/admin/songs', icon: Music },
];

interface Props {
  isAdmin: boolean;
}

export function MainSidebar({ isAdmin }: Props) {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-60 flex-col bg-black">
      <div className="flex items-center px-6 py-8">
        <div className="flex items-center space-x-2">
          <div className="relative h-8 w-8">
            <Image
              src="/logo.webp"
              alt="Logo de Spotify"
              fill
              className="rounded-full object-contain"
              sizes="(max-width: 768px) 50px, (max-width: 1200px) 60px, 70px"
            />
          </div>
          <span className="text-xl font-bold text-white">Spotify</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    'w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white',
                    isActive && 'bg-gray-800 text-white',
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </div>

        {isAdmin && (
          <>
            <Separator className="my-4 bg-gray-800" />

            <div className="space-y-1">
              <div className="px-3 py-2">
                <h3 className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Panel de Admin</h3>
              </div>
              {admin.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant="ghost"
                      className={cn(
                        'w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white',
                        isActive && 'bg-gray-800 text-white',
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </nav>
    </div>
  );
}
