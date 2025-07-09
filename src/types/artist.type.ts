import { MOCK_IDS } from '@/lib/mock-ids';
import { artistSchema } from '@/schemas/artist.schema';

import z from 'zod';

export type Artist = z.infer<typeof artistSchema>;

export const mockArtists: Artist[] = [
  {
    id: MOCK_IDS.ARTISTS.LATIN_MAFIA,
    name: 'Latin Mafia',
    bio: 'Latin Mafia es un grupo musical que fusiona ritmos latinos con toques urbanos, creando un sonido único y pegajoso.',
    image: '/images/artists/latin-mafia.webp',
    genre: 'Pop',
    genreId: MOCK_IDS.GENRES.POP,
  },
  {
    id: MOCK_IDS.ARTISTS.MICHAEL_JACKSON,
    name: 'Michael Jackson',
    bio: 'Michael Jackson, conocido como el Rey del Pop, es uno de los artistas más influyentes y exitosos de la historia de la música.',
    image: '/images/artists/michael-jackson.webp',
    genre: 'Pop',
    genreId: MOCK_IDS.GENRES.POP,
  },
  {
    id: MOCK_IDS.ARTISTS.PINK_FLOYD,
    name: 'Pink Floyd',
    bio: 'Pink Floyd fue una banda británica de rock progresivo formada en Londres en 1965, conocida por sus complejas composiciones y letras profundas.',
    image: '/images/artists/pink-floyd.webp',
    genre: 'Rock',
    genreId: MOCK_IDS.GENRES.ROCK,
  },
  {
    id: MOCK_IDS.ARTISTS.SODA_STEREO,
    name: 'Soda Stereo',
    bio: 'Soda Stereo fue una influyente banda de rock argentina formada en 1982, considerada una de las más importantes de América Latina.',
    image: '/images/artists/soda-stereo.webp',
    genre: 'Rock',
    genreId: MOCK_IDS.GENRES.ROCK,
  },
  {
    id: MOCK_IDS.ARTISTS.KENDRICK_LAMAR,
    name: 'Kendrick Lamar',
    bio: 'Kendrick Lamar es un rapero y compositor estadounidense, conocido por sus letras profundas y su innovador estilo musical.',
    image: '/images/artists/kendrick-lamar.webp',
    genre: 'Hip Hop',
    genreId: MOCK_IDS.GENRES.HIP_HOP,
  },
  {
    id: MOCK_IDS.ARTISTS.CHARLES_ANS,
    name: 'Charles Ans',
    bio: 'Charles Ans es un rapero mexicano que ha ganado popularidad por sus letras introspectivas y su estilo único dentro del género.',
    image: '/images/artists/charles-ans.webp',
    genre: 'Hip Hop',
    genreId: MOCK_IDS.GENRES.HIP_HOP,
  },
  {
    id: MOCK_IDS.ARTISTS.CAPITAL_CITIES,
    name: 'Capital Cities',
    bio: 'Capital Cities es una banda de pop alternativo estadounidense, conocida por su sonido pegajoso y su estilo visual distintivo.',
    image: '/images/artists/capital-cities.webp',
    genre: 'Indie',
    genreId: MOCK_IDS.GENRES.INDIE,
  },
  {
    id: MOCK_IDS.ARTISTS.SIDDHARTHA,
    name: 'Siddhartha',
    bio: 'Siddhartha es un cantautor mexicano que combina elementos de rock y pop en su música, creando un sonido fresco y contemporáneo.',
    image: '/images/artists/siddhartha.webp',
    genre: 'Indie',
    genreId: MOCK_IDS.GENRES.INDIE,
  },
  {
    id: MOCK_IDS.ARTISTS.BOBBY_CALDWELL,
    name: 'Bobby Caldwell',
    bio: 'Bobby Caldwell fue un cantante y compositor estadounidense, conocido por su estilo de música soul y R&B.',
    image: '/images/artists/bobby-caldwell.webp',
    genre: 'Jazz',
    genreId: MOCK_IDS.GENRES.JAZZ,
  },
  {
    id: MOCK_IDS.ARTISTS.STEVIE_WONDER,
    name: 'Stevie Wonder',
    bio: 'Stevie Wonder es un legendario músico estadounidense, conocido por su virtuosismo en el piano y su influencia en la música soul y R&B.',
    image: '/images/artists/stevie-wonder.webp',
    genre: 'Jazz',
    genreId: MOCK_IDS.GENRES.JAZZ,
  },
];
