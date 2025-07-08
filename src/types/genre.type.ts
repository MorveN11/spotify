import { genreSchema } from '@/schemas/genere.schema';

import z from 'zod';

export type Genre = z.infer<typeof genreSchema>;

export const mockGenres: Genre[] = [
  {
    id: '1',
    name: 'Pop',
    image: '/images/genres/pop.webp',
    color: '#5DCA5E',
  },
  {
    id: '2',
    name: 'Rock',
    image: '/images/genres/rock.webp',
    color: '#FA474E',
  },
  {
    id: '3',
    name: 'Hip Hop',
    image: '/images/genres/hiphop.webp',
    color: '#014E36',
  },
  {
    id: '4',
    name: 'Indie',
    image: '/images/genres/indie.webp',
    color: '#09B45D',
  },
  {
    id: '5',
    name: 'Jazz',
    image: '/images/genres/jazz.webp',
    color: '#047886',
  },
];
