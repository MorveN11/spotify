import { fileUploadResultSchema } from '@/schemas/storage.schemas';

import z from 'zod';

export type FileUploadResult = z.infer<typeof fileUploadResultSchema>;

export type FileType = 'image' | 'audio';

export interface FileValidationConfig {
  maxSize: number;
  allowedTypes: string[];
  storagePath: string;
}
