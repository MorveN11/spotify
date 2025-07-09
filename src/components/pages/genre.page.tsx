'use client';

import { useRouter } from 'next/navigation';

import { ArtistGrid } from '@/components/artist/artist.grid';
import { Button } from '@/components/ui/button';
import { Error } from '@/components/ui/error';
import { Loading } from '@/components/ui/loading';
import { useArtists } from '@/hooks/data/use-artists';
import { useGenres } from '@/hooks/data/use-genres';

interface Props {
  genreId: string;
}

export function GenrePage({ genreId }: Props) {
  const router = useRouter();

  const { genres, isLoading: isLoadingGenres, error: errorGenres, refetch: refetchGenres } = useGenres();

  const { artists, isLoading: isLoadingArtists, error: errorArtists, refetch: refetchArtists } = useArtists();

  if (isLoadingGenres || isLoadingArtists) {
    return <Loading message="Cargando géneros y artistas musicales..." />;
  }

  if (errorGenres) {
    return (
      <Error
        title="Error al cargar géneros"
        message={errorGenres}
        showRetry={true}
        onRetry={refetchGenres}
        icon="circle"
      />
    );
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

  const genre = genres.find((g) => g.id === genreId);
  const genreArtists = artists.filter((a) => a.genreId === genreId);

  if (!genre) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-white">Género no encontrado</h1>
          <Button onClick={() => router.back()}>Volver</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">{genre.name}</h1>
          <p className="text-gray-400">{genreArtists.length} artistas disponibles</p>
        </div>
      </div>

      <div
        className="mb-8 h-64 rounded-lg bg-gradient-to-br p-8"
        style={{
          background: `linear-gradient(to bottom right, ${genre.color}, ${genre.color}0D)`,
        }}
      >
        <div className="flex h-full items-end">
          <div>
            <p className="text-sm font-medium text-gray-300">GÉNERO</p>
            <h2 className="text-6xl font-bold text-white">{genre.name}</h2>
          </div>
        </div>
      </div>

      <section>
        <h3 className="mb-6 text-xl font-semibold text-white">Artistas populares</h3>
        {genreArtists.length > 0 ? (
          <ArtistGrid artists={genreArtists} />
        ) : (
          <div className="rounded-lg border border-gray-700 bg-gray-800/30 p-8 text-center">
            <p className="text-gray-400">No hay artistas disponibles en este género aún.</p>
          </div>
        )}
      </section>
    </div>
  );
}
