'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { SongList } from '@/components/song/song.list';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMusic } from '@/contexts/music.context';
import { mockArtists } from '@/types/artist.type';
import { mockSongs } from '@/types/song.type';

import { MoreHorizontal, Pause, Play, Shuffle } from 'lucide-react';

interface Props {
  artistId: string;
}

export function ArtistPage({ artistId }: Props) {
  const router = useRouter();
  const { playSong, currentSong, isPlaying, togglePlayPause } = useMusic();
  const artist = mockArtists.find((a) => a.id === artistId);
  const songs = mockSongs.filter((s) => s.artistId === artistId);

  if (!artist) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-white">Artista no encontrado</h1>
          <Button onClick={() => router.back()}>Volver</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="relative h-72 bg-gradient-to-b from-primary/30 to-gray-900/50">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50" />
        <div className="flex h-full items-end p-6">
          <div className="flex items-end space-x-6">
            <div className="h-48 w-48 overflow-hidden rounded-full shadow-2xl">
              <Image
                src={artist.image}
                alt={artist.name}
                width={192}
                height={192}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div className="pb-4">
              <p className="mb-2 text-sm font-medium text-gray-300">ARTISTA</p>
              <h1 className="mb-2 text-5xl font-bold text-white">{artist.name}</h1>
              <p className="max-w-2xl text-sm text-gray-400">{artist.bio}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4 px-6 py-6">
        <Button
          size="lg"
          className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90"
          onClick={() => {
            if (currentSong && songs.some((song) => song.id === currentSong.id)) {
              togglePlayPause();
            } else {
              playSong(songs[0]);
            }
          }}
        >
          {currentSong && songs.some((song) => song.id === currentSong.id) && isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>

        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
          <Shuffle className="h-6 w-6" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
              <MoreHorizontal className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="border-gray-700 bg-gray-800">
            <DropdownMenuItem className="text-gray-300 focus:bg-gray-700 focus:text-white">
              Seguir artista
            </DropdownMenuItem>
            <DropdownMenuItem className="text-gray-300 focus:bg-gray-700 focus:text-white">
              Ir a radio del artista
            </DropdownMenuItem>
            <DropdownMenuItem className="text-gray-300 focus:bg-gray-700 focus:text-white">Compartir</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="px-6">
        <h2 className="mb-4 text-xl font-semibold text-white">Populares</h2>
        <SongList songs={songs} />
      </div>
    </div>
  );
}
