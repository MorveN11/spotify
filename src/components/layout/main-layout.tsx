'use client';

import { ReactNode } from 'react';

import { User } from '@/types/user.type';

import { Header } from './header';
import { MusicPlayer } from './music-player';
import { Sidebar } from './sidebar';

interface Props {
  children: ReactNode;
  user?: User;
  onLogout?: () => void;
}

export function MainLayout({ children, user, onLogout }: Props) {
  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar isAdmin={user?.isAdmin} />

      <div className="flex flex-1 flex-col">
        <Header user={user} onLogout={onLogout} />

        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-900 via-gray-900 to-black">{children}</main>

        <MusicPlayer />
      </div>
    </div>
  );
}
