'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { SongList } from '@/components/song/song.list';
import { Button } from '@/components/ui/button';
import { Error } from '@/components/ui/error';
import { Loading } from '@/components/ui/loading';
import { useMusic } from '@/contexts/music.context';
import { useArtists } from '@/hooks/data/use-artists';
import { useSongs } from '@/hooks/data/use-songs';

import { Pause, Play } from 'lucide-react';

interface Props {
  artistId: string;
}

export function ArtistPage({ artistId }: Props) {
  const router = useRouter();

  const { playSong, currentSong, isPlaying, togglePlayPause } = useMusic();

  const { artists, isLoading: isLoadingArtists, error: errorArtists, refetch: refetchArtists } = useArtists();

  const { songs, isLoading: isLoadingSongs, error: errorSongs, refetch: refetchSongs } = useSongs();

  if (isLoadingArtists || isLoadingSongs) {
    return <Loading message="Cargando artistas y canciones..." />;
  }

  if (errorArtists) {
    return (
      <Error
        title="Error al cargar artistas"
        message={errorArtists}
        showRetry={true}
        onRetry={refetchArtists}
        icon="circle"
      />
    );
  }

  if (errorSongs) {
    return (
      <Error
        title="Error al cargar canciones"
        message={errorSongs}
        showRetry={true}
        onRetry={refetchSongs}
        icon="circle"
      />
    );
  }

  const artist = artists.find((a) => a.id === artistId);
  const artistSongs = songs.filter((s) => s.artistId === artistId);

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
            <div className="relative h-48 w-48">
              <Image
                src={artist.image}
                alt={artist.name}
                fill
                className="rounded-full object-cover shadow-2xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
            if (currentSong && artistSongs.some((song) => song.id === currentSong.id)) {
              togglePlayPause();
            } else {
              playSong(artistSongs[0]);
            }
          }}
        >
          {currentSong && artistSongs.some((song) => song.id === currentSong.id) && isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>
      </div>

      <div className="px-6">
        <h2 className="mb-4 text-xl font-semibold text-white">Populares</h2>
        <SongList songs={artistSongs} />
      </div>
    </div>
  );
}
