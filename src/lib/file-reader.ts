import { readFile } from 'fs/promises';
import { join } from 'path';

export class FileReader {
  private readonly publicPath = join(process.cwd(), 'public');

  public async readImageFile(imagePath: string): Promise<File> {
    const fullPath = join(this.publicPath, imagePath);
    const buffer = await readFile(fullPath);

    const mimeType = this.getMimeType(imagePath);

    const file = new File([buffer], imagePath.split('/').pop() || 'image', {
      type: mimeType,
    });

    return file;
  }

  public async readAudioFile(audioPath: string): Promise<File> {
    const fullPath = join(this.publicPath, audioPath);
    const buffer = await readFile(fullPath);

    const mimeType = this.getMimeType(audioPath);

    const file = new File([buffer], audioPath.split('/').pop() || 'audio', {
      type: mimeType,
    });

    return file;
  }

  private getMimeType(filePath: string): string {
    const extension = filePath.split('.').pop()?.toLowerCase();

    const mimeTypes: Record<string, string> = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      webp: 'image/webp',
      mp3: 'audio/mpeg',
      wav: 'audio/wav',
      ogg: 'audio/ogg',
      opus: 'audio/opus',
      m4a: 'audio/m4a',
    };

    return mimeTypes[extension || ''] || 'application/octet-stream';
  }

  public async fileExists(filePath: string): Promise<boolean> {
    try {
      const fullPath = join(this.publicPath, filePath);
      await readFile(fullPath);
      return true;
    } catch {
      return false;
    }
  }
}

export const fileReader = new FileReader();
