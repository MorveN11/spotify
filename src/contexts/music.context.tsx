'use client';

import { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';

import { Song } from '@/types/song.type';

interface MusicContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  isMuted: boolean;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  playSong: (song: Song) => void;
  togglePlayPause: () => void;
  nextSong: () => void;
  previousSong: () => void;
  setCurrentTime: (time: number) => void;
  updateCurrentTime: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function useMusic() {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolumeState] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = 'metadata';
      audioRef.current.volume = volume;
    }
  }, [volume]);

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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const playSong = (song: Song) => {
    const isSameSong = currentSong?.id === song.id;

    if (isSameSong) {
      togglePlayPause();
    } else {
      setCurrentSong(song);
      setCurrentTime(0);
      setIsPlaying(true);

      if (audioRef.current) {
        audioRef.current.src = song.url;
      }
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

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const nextSong = () => {};

  const previousSong = () => {};

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        isPlaying,
        currentTime,
        volume,
        isMuted,
        audioRef,
        playSong,
        togglePlayPause,
        nextSong,
        previousSong,
        setCurrentTime,
        updateCurrentTime,
        setVolume,
        toggleMute,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}
