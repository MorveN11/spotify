import { useCallback, useEffect, useState } from 'react';

import { songRepository } from '@/repositories/song.repository';
import type { Song } from '@/types/song.type';

interface UseSongsReturn {
  songs: Song[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createSong: (song: Song) => Promise<boolean>;
  updateSong: (id: string, song: Partial<Song>) => Promise<boolean>;
  deleteSong: (id: string) => Promise<boolean>;
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

  const createSong = useCallback(async (song: Song): Promise<boolean> => {
    try {
      const result = await songRepository.createSong(song);

      if (result.success) {
        setSongs((prev) => [...prev, song]);
        return true;
      } else {
        setError(result.error);
        return false;
      }
    } catch (_err) {
      setError('Error inesperado al crear la canción');
      return false;
    }
  }, []);

  const updateSong = useCallback(async (id: string, songData: Partial<Song>): Promise<boolean> => {
    try {
      const result = await songRepository.updateSong(id, songData);

      if (result.success) {
        setSongs((prev) => prev.map((song) => (song.id === id ? { ...song, ...songData } : song)));
        return true;
      } else {
        setError(result.error);
        return false;
      }
    } catch (_err) {
      setError('Error inesperado al actualizar la canción');
      return false;
    }
  }, []);

  const deleteSong = useCallback(async (id: string): Promise<boolean> => {
    try {
      const result = await songRepository.deleteSong(id);

      if (result.success) {
        setSongs((prev) => prev.filter((song) => song.id !== id));
        return true;
      } else {
        setError(result.error);
        return false;
      }
    } catch (_err) {
      setError('Error inesperado al eliminar la canción');
      return false;
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
    createSong,
    updateSong,
    deleteSong,
  };
};
