'use client';

import { useRef, useState } from 'react';

import { useParams } from 'next/navigation';

import { MainLayout } from '@/components/layout/main-layout';
import { ArtistPage } from '@/components/pages/artist-page';

export default function ArtistDetailPage() {
  const params = useParams();
  const artistId = params.id as string;
  const audioRef = useRef<HTMLAudioElement>(null);

  const [user] = useState({
    id: 'demo-user',
    name: 'Usuario Demo',
    email: 'demo@spotify.com',
    isAdmin: true,
  });

  const [currentSong, setCurrentSong] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlaySong = (song: any) => {
    audioRef.current?.play();
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <MainLayout
      user={user}
      currentSong={currentSong}
      isPlaying={isPlaying}
      onPlayPause={handlePlayPause}
      audioRef={audioRef}
    >
      <ArtistPage artistId={artistId} currentSongId={currentSong?.id} onPlaySong={handlePlaySong} />
    </MainLayout>
  );
}
