import { songSchema } from '@/schemas/song.schema';

import z from 'zod';

export type Song = z.infer<typeof songSchema>;

export const mockSongs: Song[] = [
  {
    id: '1',
    title: 'tengo mucho ruido.',
    album: 'TODOS LOS DÍAS TODO EL DÍA',
    artist: 'Latin Mafia',
    artistId: '1',
    duration: 201,
    image: '/images/songs/todos-los-dias-todo-el-dia.jpeg',
    url: '/audio/tengo-mucho-ruido.opus',
  },
];
