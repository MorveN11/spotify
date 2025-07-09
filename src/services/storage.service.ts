import { CustomStorageError, StorageErrorCode, handleStorageError } from '@/errors/storage.errors';
import { storage } from '@/firebase/firebase.app';
import { generateAudioId, generateImageId } from '@/lib/storage.utils';
import { fileUploadResultSchema } from '@/schemas/storage.schemas';
import { errorResponse, successResponse, type ApiResponse } from '@/types/api.type';
import type { FileType, FileUploadResult, FileValidationConfig } from '@/types/storage.types';

import { deleteObject, getDownloadURL, ref, uploadBytes, type UploadResult } from 'firebase/storage';

class StorageService {
  private readonly fileConfigs: Record<FileType, FileValidationConfig> = {
    image: {
      maxSize: 5 * 1024 * 1024, // 5MB
      allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'],
      storagePath: 'images',
    },
    audio: {
      maxSize: 50 * 1024 * 1024, // 50MB
      allowedTypes: ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/opus', 'audio/m4a'],
      storagePath: 'audio',
    },
  };

  private validateFile(file: File, type: FileType): void {
    const config = this.fileConfigs[type];

    if (!config.allowedTypes.includes(file.type)) {
      throw new CustomStorageError(
        StorageErrorCode.INVALID_FILE_TYPE,
        `Tipo de archivo no válido para ${type}. Tipos permitidos: ${config.allowedTypes.join(', ')}`,
      );
    }

    if (file.size > config.maxSize) {
      const maxSizeMB = config.maxSize / (1024 * 1024);
      throw new CustomStorageError(
        StorageErrorCode.FILE_TOO_LARGE,
        `El archivo es demasiado grande. Tamaño máximo: ${maxSizeMB}MB`,
      );
    }
  }

  private generateFileName(file: File, type: FileType): string {
    const idGenerator = type === 'image' ? generateImageId : generateAudioId;
    return `${idGenerator()}_${file.name}`;
  }

  public async uploadFile(file: File, type: FileType): Promise<ApiResponse<FileUploadResult>> {
    try {
      this.validateFile(file, type);

      const config = this.fileConfigs[type];
      const fileName = this.generateFileName(file, type);

      const fileRef = ref(storage, `${config.storagePath}/${fileName}`);

      const uploadResult: UploadResult = await uploadBytes(fileRef, file);

      const downloadURL = await getDownloadURL(uploadResult.ref);

      const result = fileUploadResultSchema.safeParse({
        name: fileName,
        url: downloadURL,
        fileSize: file.size,
        uploadedAt: new Date(),
        type,
      });

      if (!result.success) {
        await deleteObject(fileRef);
        throw new CustomStorageError(StorageErrorCode.UPLOAD_FAILED);
      }

      return successResponse(result.data);
    } catch (error) {
      return errorResponse(handleStorageError(error));
    }
  }

  public async uploadImage(file: File): Promise<ApiResponse<FileUploadResult>> {
    return this.uploadFile(file, 'image');
  }

  public async uploadAudio(file: File): Promise<ApiResponse<FileUploadResult>> {
    return this.uploadFile(file, 'audio');
  }

  public async deleteFile(fileName: string, type: FileType): Promise<ApiResponse<boolean>> {
    try {
      const config = this.fileConfigs[type];
      const fileRef = ref(storage, `${config.storagePath}/${fileName}`);

      await deleteObject(fileRef);

      return successResponse(true);
    } catch (error) {
      return errorResponse(handleStorageError(error));
    }
  }

  public async deleteImage(imageName: string): Promise<ApiResponse<boolean>> {
    return this.deleteFile(imageName, 'image');
  }

  public async deleteAudio(audioName: string): Promise<ApiResponse<boolean>> {
    return this.deleteFile(audioName, 'audio');
  }

  public async getFileUrl(fileName: string, type: FileType): Promise<ApiResponse<string>> {
    try {
      const config = this.fileConfigs[type];
      const fileRef = ref(storage, `${config.storagePath}/${fileName}`);

      const downloadURL = await getDownloadURL(fileRef);

      return successResponse(downloadURL);
    } catch (error) {
      return errorResponse(handleStorageError(error));
    }
  }
}

export const storageService = new StorageService();
