import { artistSchema } from '@/schemas/artist.schema';

import z from 'zod';

export type Artist = z.infer<typeof artistSchema>;

export const mockArtists: Artist[] = [
  {
    id: '1',
    name: 'Latin Mafia',
    bio: 'Latin Mafia es un grupo musical que fusiona ritmos latinos con toques urbanos, creando un sonido único y pegajoso.',
    image: '/images/artists/latin-mafia.webp',
    genre: 'Pop',
    genreId: '1',
  },
  {
    id: '2',
    name: 'Michael Jackson',
    bio: 'Michael Jackson, conocido como el Rey del Pop, es uno de los artistas más influyentes y exitosos de la historia de la música.',
    image: '/images/artists/michael-jackson.webp',
    genre: 'Pop',
    genreId: '1',
  },
  {
    id: '3',
    name: 'Pink Floyd',
    bio: 'Pink Floyd fue una banda británica de rock progresivo formada en Londres en 1965, conocida por sus complejas composiciones y letras profundas.',
    image: '/images/artists/pink-floyd.webp',
    genre: 'Rock',
    genreId: '2',
  },
  {
    id: '4',
    name: 'Soda Stereo',
    bio: 'Soda Stereo fue una influyente banda de rock argentina formada en 1982, considerada una de las más importantes de América Latina.',
    image: '/images/artists/soda-stereo.webp',
    genre: 'Rock',
    genreId: '2',
  },
  {
    id: '5',
    name: 'Kendrick Lamar',
    bio: 'Kendrick Lamar es un rapero y compositor estadounidense, conocido por sus letras profundas y su innovador estilo musical.',
    image: '/images/artists/kendrick-lamar.webp',
    genre: 'Hip Hop',
    genreId: '3',
  },
  {
    id: '6',
    name: 'Charles Ans',
    bio: 'Charles Ans es un rapero mexicano que ha ganado popularidad por sus letras introspectivas y su estilo único dentro del género.',
    image: '/images/artists/charles-ans.webp',
    genre: 'Hip Hop',
    genreId: '3',
  },
  {
    id: '7',
    name: 'Capital Cities',
    bio: 'Capital Cities es una banda de pop alternativo estadounidense, conocida por su sonido pegajoso y su estilo visual distintivo.',
    image: '/images/artists/capital-cities.webp',
    genre: 'Indie',
    genreId: '4',
  },
  {
    id: '8',
    name: 'Siddhartha',
    bio: 'Siddhartha es un cantautor mexicano que combina elementos de rock y pop en su música, creando un sonido fresco y contemporáneo.',
    image: '/images/artists/siddhartha.webp',
    genre: 'Indie',
    genreId: '4',
  },
  {
    id: '9',
    name: 'Bobby Caldwell',
    bio: 'Bobby Caldwell fue un cantante y compositor estadounidense, conocido por su estilo de música soul y R&B.',
    image: '/images/artists/bobby-caldwell.webp',
    genre: 'Jazz',
    genreId: '5',
  },
  {
    id: '10',
    name: 'Stevie Wonder',
    bio: 'Stevie Wonder es un legendario músico estadounidense, conocido por su virtuosismo en el piano y su influencia en la música soul y R&B.',
    image: '/images/artists/stevie-wonder.webp',
    genre: 'Jazz',
    genreId: '5',
  },
];
