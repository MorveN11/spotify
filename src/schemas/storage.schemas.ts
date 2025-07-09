import z from 'zod';

export const fileUploadResultSchema = z.object({
  name: z.string({
    required_error: 'El nombre del archivo es obligatorio',
  }),
  url: z
    .string({
      required_error: 'La URL del archivo es obligatoria',
    })
    .url({
      message: 'La URL del archivo debe ser válida',
    }),
  fileSize: z
    .number({
      required_error: 'El tamaño del archivo es obligatorio',
    })
    .int({
      message: 'El tamaño del archivo debe ser un número entero',
    })
    .positive({
      message: 'El tamaño del archivo debe ser un número positivo',
    }),
  uploadedAt: z
    .date({
      required_error: 'La fecha de subida es obligatoria',
    })
    .refine((date) => date <= new Date(), {
      message: 'La fecha de subida no puede ser futura',
    }),
  type: z.enum(['image', 'audio'], {
    required_error: 'El tipo de archivo es obligatorio',
  }),
});

export type FileUploadResult = z.infer<typeof fileUploadResultSchema>;
