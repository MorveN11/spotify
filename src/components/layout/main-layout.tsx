'use client';

import { ReactNode } from 'react';

import { Song } from '@/types/song.type';
import { User } from '@/types/user.type';

import { Header } from './header';
import { MusicPlayer } from './music-player';
import { Sidebar } from './sidebar';

interface Props {
  children: ReactNode;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  user?: User;
  currentSong?: Song;
  isPlaying?: boolean;
  onPlayPause?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onLogout?: () => void;
}

export function MainLayout({
  children,
  user,
  audioRef,
  currentSong,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  onLogout,
}: Props) {
  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar isAdmin={user?.isAdmin} />

      <div className="flex flex-1 flex-col">
        <Header user={user} onLogout={onLogout} />

        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-900 via-gray-900 to-black">{children}</main>

        <MusicPlayer
          audioRef={audioRef}
          currentSong={currentSong}
          isPlaying={isPlaying}
          onPlayPause={onPlayPause}
          onNext={onNext}
          onPrevious={onPrevious}
        />
      </div>
    </div>
  );
}
