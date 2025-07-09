import z from 'zod';

export const createSongFormSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  album: z.string().min(1, 'El álbum es requerido'),
  artist: z.string().min(1, 'El artista es requerido'),
  artistId: z.string().min(1, 'El ID del artista es requerido'),
  duration: z.number().min(1, 'La duración debe ser mayor a 0'),
  image: z.instanceof(File, { message: 'La imagen del álbum es requerida' }),
  audioFile: z.instanceof(File, { message: 'El archivo de audio es requerido' }),
});

export const createArtistFormSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  bio: z.string().min(1, 'La biografía es requerida'),
  genre: z.string().min(1, 'El género es requerido'),
  genreId: z.string().min(1, 'El ID del género es requerido'),
  image: z.instanceof(File, { message: 'La imagen es requerida' }),
});

export const createGenreFormSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  color: z.string().min(1, 'El color es requerido'),
  image: z.instanceof(File, { message: 'La imagen es requerida' }),
});

export type CreateSongFormData = z.infer<typeof createSongFormSchema>;
export type CreateArtistFormData = z.infer<typeof createArtistFormSchema>;
export type CreateGenreFormData = z.infer<typeof createGenreFormSchema>;
