'use client';

import { useRef, useState } from 'react';

import { AuthForm } from '@/components/auth/auth-form';
import { MainLayout } from '@/components/layout/main-layout';
import { HomePage } from '@/components/pages/home-page';

export default function Page() {
  const [user, setUser] = useState<any>(null);
  const [currentSong, setCurrentSong] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const mockUser = {
    name: 'Usuario Demo',
    email: 'demo@spotify.com',
    isAdmin: true,
  };

  const handleLogin = (email: string, password: string) => {
    console.log('Login:', { email, password });
    setUser(mockUser);
  };

  const handleRegister = (email: string, password: string, name: string) => {
    console.log('Register:', { email, password, name });
    setUser({ ...mockUser, name, email });
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentSong(null);
    setIsPlaying(false);
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

  const handleNext = () => {
    console.log('Next song');
  };

  const handlePrevious = () => {
    console.log('Previous song');
  };

  if (user) {
    return <AuthForm onLogin={handleLogin} onRegister={handleRegister} />;
  }

  return (
    <MainLayout
      user={user}
      audioRef={audioRef}
      currentSong={currentSong}
      isPlaying={isPlaying}
      onPlayPause={handlePlayPause}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onLogout={handleLogout}
    >
      <HomePage />
    </MainLayout>
  );
}
