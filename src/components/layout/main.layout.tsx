'use client';

import { ReactNode } from 'react';

import { MainHeader } from '@/components/layout/main.header';
import { MainSidebar } from '@/components/layout/main.sidebar';
import { MusicPlayer } from '@/components/layout/music.player';
import { User } from '@/types/user.type';

interface Props {
  children: ReactNode;
  user: User;
}

export function MainLayout({ children, user }: Props) {
  return (
    <div className="flex h-screen bg-black text-white">
      <MainSidebar isAdmin={user.isAdmin} />

      <div className="flex w-full flex-1 flex-col">
        <MainHeader user={user} />

        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-900 via-gray-900 to-black">{children}</main>

        <MusicPlayer />
      </div>
    </div>
  );
}
