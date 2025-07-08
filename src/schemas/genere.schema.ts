import z from 'zod';

export const genreSchema = z.object({
  id: z.string({
    message: 'El ID del género es requerido',
  }),
  name: z.string({
    message: 'El nombre del género es requerido',
  }),
  image: z.string({
    message: 'La imagen del género es requerida',
  }),
  color: z.string({
    message: 'El color del género es requerido',
  }),
});
