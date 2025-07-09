import { ArtistCard } from '@/components/artist/artist.card';
import { Artist } from '@/types/artist.type';

interface Props {
  artists: Artist[];
}

export function ArtistGrid({ artists }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {artists.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
    </div>
  );
}
