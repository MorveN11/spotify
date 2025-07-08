import z from 'zod';

export const artistSchema = z.object({
  id: z.string({
    message: 'El ID del artista es requerido',
  }),
  name: z.string({
    message: 'El nombre del artista es requerido',
  }),
  bio: z.string({
    message: 'La biografía del artista es requerida',
  }),
  image: z.string({
    message: 'La imagen del artista es requerida',
  }),
  genre: z.string({
    message: 'El género del artista es requerido',
  }),
  genreId: z.string({
    message: 'El ID del género del artista es requerido',
  }),
});
