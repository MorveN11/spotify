import { useCallback, useEffect, useState } from 'react';

import { songRepository } from '@/repositories/song.repository';
import type { Song } from '@/types/song.type';

interface UseSongsReturn {
  songs: Song[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useSongs = (autofetch: boolean = true): UseSongsReturn => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSongs = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await songRepository.getAllSongs();

      if (result.success) {
        setSongs(result.data);
      } else {
        setError(result.error);
      }
    } catch (_err) {
      setError('Error inesperado al obtener las canciones');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autofetch) {
      fetchSongs();
    }
  }, [fetchSongs, autofetch]);

  return {
    songs,
    isLoading,
    error,
    refetch: fetchSongs,
  };
};
