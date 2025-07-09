import { GenreGrid } from '@/components/genre/genre.grid';
import { mockGenres } from '@/types/genre.type';

export function HomePage() {
  const currentHour = new Date().getHours();
  let greeting = 'Buenos días';

  if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Buenas tardes';
  } else if (currentHour >= 18) {
    greeting = 'Buenas noches';
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-white">{greeting}</h1>
        <p className="text-gray-400">Descubre nuevos géneros musicales</p>
      </div>

      <section>
        <h2 className="mb-6 text-2xl font-semibold text-white">Explorar géneros</h2>
        <GenreGrid genres={mockGenres} />
      </section>
    </div>
  );
}
