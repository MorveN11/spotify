'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Song } from '@/types/song.type';

import { Pause, Play } from 'lucide-react';

interface SongItemProps {
  song: Song;
  index: number;
  isPlaying?: boolean;
  onPlay?: (song: Song) => void;
}

export function SongItem({ song, index, isPlaying, onPlay }: SongItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className="group grid grid-cols-[16px_1fr_1fr_1fr] items-center gap-4 rounded-md px-4 py-2 text-sm hover:bg-white/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-center">
        {isHovered || isPlaying ? (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-white hover:bg-transparent hover:text-primary"
            onClick={() => onPlay?.(song)}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        ) : (
          <span className="text-gray-400">{index + 1}</span>
        )}
      </div>

      <div className="min-w-0">
        <p className="truncate font-medium text-white">{song.title}</p>
        <p className="truncate text-sm text-gray-400">{song.artist}</p>
      </div>

      <div className="hidden text-gray-400 md:block">{song.album}</div>

      <div className="text-right text-gray-400">{formatDuration(song.duration)}</div>
    </div>
  );
}

interface SongListProps {
  songs: Song[];
  currentSongId?: string;
  onPlaySong?: (song: Song) => void;
}

export function SongList({ songs, currentSongId, onPlaySong }: SongListProps) {
  return (
    <div className="space-y-1">
      <div className="grid grid-cols-[16px_1fr_1fr_1fr] items-center gap-4 border-b border-gray-800 px-4 py-2 text-sm text-gray-400">
        <span>#</span>
        <span>Título</span>
        <span className="hidden md:block">Álbum</span>
        <span className="text-right">Duración</span>
      </div>

      {songs.map((song, index) => (
        <SongItem key={song.id} song={song} index={index} isPlaying={currentSongId === song.id} onPlay={onPlaySong} />
      ))}
    </div>
  );
}
