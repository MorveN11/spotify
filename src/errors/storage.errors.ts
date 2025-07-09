export const StorageErrorCode = {
  UPLOAD_FAILED: 'storage/upload-failed',
  DELETE_FAILED: 'storage/delete-failed',
  FILE_NOT_FOUND: 'storage/file-not-found',
  INVALID_FILE_TYPE: 'storage/invalid-file-type',
  FILE_TOO_LARGE: 'storage/file-too-large',
  NETWORK_ERROR: 'storage/network-error',
  STORAGE_ERROR: 'storage/storage-error',
  PERMISSION_DENIED: 'storage/permission-denied',
  UNKNOWN_ERROR: 'storage/unknown-error',
  INVALID_FILE_FORMAT: 'storage/invalid-file-format',
} as const;

export type StorageErrorCode = (typeof StorageErrorCode)[keyof typeof StorageErrorCode];

const errorMessages: Record<StorageErrorCode, string> = {
  [StorageErrorCode.UPLOAD_FAILED]: 'Error al subir el archivo. Inténtalo de nuevo.',
  [StorageErrorCode.DELETE_FAILED]: 'Error al eliminar el archivo. Inténtalo de nuevo.',
  [StorageErrorCode.FILE_NOT_FOUND]: 'El archivo no fue encontrado.',
  [StorageErrorCode.INVALID_FILE_TYPE]: 'Tipo de archivo no válido.',
  [StorageErrorCode.FILE_TOO_LARGE]: 'El archivo es demasiado grande.',
  [StorageErrorCode.NETWORK_ERROR]: 'Error de red. Verifica tu conexión a internet.',
  [StorageErrorCode.STORAGE_ERROR]: 'Error en el almacenamiento. Inténtalo más tarde.',
  [StorageErrorCode.PERMISSION_DENIED]: 'No tienes permisos para realizar esta acción.',
  [StorageErrorCode.UNKNOWN_ERROR]: 'Error desconocido. Inténtalo de nuevo.',
  [StorageErrorCode.INVALID_FILE_FORMAT]: 'Formato de archivo no válido.',
};

export interface CustomStorageErrorInterface extends Error {
  code: StorageErrorCode | string;
  message: string;
}

export class CustomStorageError extends Error implements CustomStorageErrorInterface {
  public code: StorageErrorCode;

  constructor(code: StorageErrorCode, customMessage?: string) {
    const message = customMessage || errorMessages[code];
    super(message);
    this.name = 'CustomStorageError';
    this.code = code;
    this.message = message;
  }
}

export function handleStorageError(error: unknown): string {
  if (!(error instanceof CustomStorageError)) {
    return errorMessages[StorageErrorCode.UNKNOWN_ERROR];
  }

  if (error instanceof CustomStorageError) {
    return error.message;
  }

  const errorCode = (error as CustomStorageErrorInterface).code;

  const mappedErrorCode = Object.values(StorageErrorCode).find((code) => code === errorCode);

  if (mappedErrorCode && errorMessages[mappedErrorCode]) {
    return errorMessages[mappedErrorCode];
  }

  return errorMessages[StorageErrorCode.UNKNOWN_ERROR];
}
