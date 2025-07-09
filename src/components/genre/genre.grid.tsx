import { GenreCard } from '@/components/genre/genre.card';
import { Genre } from '@/types/genre.type';

interface Props {
  genres: Genre[];
}

export function GenreGrid({ genres }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {genres.map((genre) => (
        <GenreCard key={genre.id} genre={genre} />
      ))}
    </div>
  );
}
