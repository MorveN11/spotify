import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';
import { Artist } from '@/types/artist.type';

interface ArtistCardProps {
  artist: Artist;
}

export function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Link href={`/artist/${artist.id}`}>
      <Card className="group cursor-pointer border-none bg-gray-800/40 p-4 transition-all hover:bg-gray-700/50">
        <CardContent className="p-0">
          <div className="mb-4 aspect-square overflow-hidden rounded-full">
            <Image
              src={artist.image}
              alt={artist.name}
              width={200}
              height={200}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <div className="text-center">
            <h3 className="mb-1 font-semibold text-white">{artist.name}</h3>
            <p className="text-sm text-gray-400">{artist.genre}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

interface ArtistGridProps {
  artists: Artist[];
}

export function ArtistGrid({ artists }: ArtistGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {artists.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
    </div>
  );
}
