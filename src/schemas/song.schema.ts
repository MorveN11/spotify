import z from 'zod';

export const songSchema = z.object({
  id: z.string({
    message: 'El ID de la canción es requerido',
  }),
  title: z.string({
    message: 'El título de la canción es requerido',
  }),
  album: z.string({
    message: 'El álbum de la canción es requerido',
  }),
  artist: z.string({
    message: 'El artista de la canción es requerido',
  }),
  artistId: z.string({
    message: 'El ID del artista es requerido',
  }),
  duration: z.number({
    message: 'La duración de la canción es requerida',
  }),
  image: z.string({
    message: 'La imagen de la canción es requerida',
  }),
  url: z.string({
    message: 'La URL de la canción es requerida',
  }),
});
