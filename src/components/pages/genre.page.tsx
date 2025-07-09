'use client';

import { useRouter } from 'next/navigation';

import { ArtistGrid } from '@/components/artist/artist.grid';
import { Button } from '@/components/ui/button';
import { mockArtists } from '@/types/artist.type';
import { mockGenres } from '@/types/genre.type';

interface Props {
  genreId: string;
}

export function GenrePage({ genreId }: Props) {
  const router = useRouter();
  const genre = mockGenres.find((g) => g.id === genreId);
  const artists = mockArtists.filter((a) => a.genreId === genreId);

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
          <p className="text-gray-400">{artists.length} artistas disponibles</p>
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
        {artists.length > 0 ? (
          <ArtistGrid artists={artists} />
        ) : (
          <div className="rounded-lg border border-gray-700 bg-gray-800/30 p-8 text-center">
            <p className="text-gray-400">No hay artistas disponibles en este género aún.</p>
          </div>
        )}
      </section>
    </div>
  );
}
