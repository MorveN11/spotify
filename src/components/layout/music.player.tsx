'use client';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useMusic } from '@/contexts/music.context';

import { Music, Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';

export function MusicPlayer() {
  const {
    currentSong,
    isPlaying,
    currentTime,
    volume,
    isMuted,
    togglePlayPause,
    nextSong,
    previousSong,
    updateCurrentTime,
    setVolume,
    toggleMute,
  } = useMusic();

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimeChange = (value: number[]) => {
    const newTime = value[0];
    updateCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
  };

  if (!currentSong) {
    return null;
  }

  return (
    <footer className="flex items-center justify-between border-t border-gray-800 bg-gray-900 px-4 py-3">
      <div className="flex w-1/4 min-w-0 items-center space-x-3">
        <div className="h-12 w-12 flex-shrink-0 rounded bg-gray-700">
          {currentSong.image ? (
            <Image
              src={currentSong.image}
              alt={currentSong.title}
              width={48}
              height={48}
              className="h-full w-full rounded object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Music className="h-6 w-6 text-gray-400" />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">{currentSong.title}</p>
          <p className="truncate text-xs text-gray-400">{currentSong.artist}</p>
        </div>
      </div>

      <div className="flex w-1/2 flex-col items-center space-y-2">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white" onClick={previousSong}>
            <SkipBack className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-white text-black hover:bg-gray-200"
            onClick={togglePlayPause}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>

          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white" onClick={nextSong}>
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex w-full max-w-md items-center space-x-2">
          <span className="w-10 text-right text-xs text-gray-400">{formatTime(currentTime)}</span>
          <Slider
            value={[currentTime]}
            max={currentSong.duration}
            step={1}
            className="flex-1"
            onValueChange={handleTimeChange}
          />
          <span className="w-10 text-xs text-gray-400">{formatTime(currentSong.duration)}</span>
        </div>
      </div>

      <div className="flex w-1/4 items-center justify-end space-x-2">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white" onClick={toggleMute}>
          {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
        <Slider
          value={[isMuted ? 0 : volume]}
          max={1}
          step={0.01}
          className="w-24"
          onValueChange={handleVolumeChange}
        />
      </div>
    </footer>
  );
}
