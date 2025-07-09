import { MOCK_IDS } from '@/lib/mock-ids';
import { genreSchema } from '@/schemas/genere.schema';

import z from 'zod';

export type Genre = z.infer<typeof genreSchema>;

export const mockGenres: Genre[] = [
  {
    id: MOCK_IDS.GENRES.POP,
    name: 'Pop',
    image: '/images/genres/pop.webp',
    color: '#5DCA5E',
  },
  {
    id: MOCK_IDS.GENRES.ROCK,
    name: 'Rock',
    image: '/images/genres/rock.webp',
    color: '#FA474E',
  },
  {
    id: MOCK_IDS.GENRES.HIP_HOP,
    name: 'Hip Hop',
    image: '/images/genres/hiphop.webp',
    color: '#014E36',
  },
  {
    id: MOCK_IDS.GENRES.INDIE,
    name: 'Indie',
    image: '/images/genres/indie.webp',
    color: '#09B45D',
  },
  {
    id: MOCK_IDS.GENRES.JAZZ,
    name: 'Jazz',
    image: '/images/genres/jazz.webp',
    color: '#047886',
  },
];
