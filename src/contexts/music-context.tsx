'use client';

import { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number;
  url: string;
  image?: string;
  isLiked?: boolean;
}

interface MusicContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  playSong: (song: Song) => void;
  togglePlayPause: () => void;
  nextSong: () => void;
  previousSong: () => void;
  toggleLike: (songId: string) => void;
  setCurrentTime: (time: number) => void;
  updateCurrentTime: (time: number) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handleLoadedMetadata = () => {
      if (currentTime > 0 && Math.abs(audio.currentTime - currentTime) > 0.5) {
        audio.currentTime = currentTime;
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [currentSong, currentTime]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          setIsPlaying(false);
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong]);

  const playSong = (song: Song) => {
    const isSameSong = currentSong?.id === song.id;

    if (isSameSong) {
      togglePlayPause();
    } else {
      setCurrentSong(song);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    if (currentSong) {
      setIsPlaying(!isPlaying);
    }
  };

  const updateCurrentTime = (time: number) => {
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const nextSong = () => {
    // Implementar lógica para siguiente canción
  };

  const previousSong = () => {
    // Implementar lógica para canción anterior
  };

  const toggleLike = (songId: string) => {
    if (currentSong && currentSong.id === songId) {
      setCurrentSong({ ...currentSong, isLiked: !currentSong.isLiked });
    }
  };

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        isPlaying,
        currentTime,
        audioRef,
        playSong,
        togglePlayPause,
        nextSong,
        previousSong,
        toggleLike,
        setCurrentTime,
        updateCurrentTime,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}
