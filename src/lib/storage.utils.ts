export function generateFileId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export function generateImageId(): string {
  return generateFileId('img');
}

export function generateAudioId(): string {
  return generateFileId('audio');
}
