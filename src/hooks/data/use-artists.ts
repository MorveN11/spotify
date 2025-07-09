import { useCallback, useEffect, useState } from 'react';

import { artistRepository } from '@/repositories/artist.repository';
import type { Artist } from '@/types/artist.type';

interface UseArtistsReturn {
  artists: Artist[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createArtist: (artist: Artist) => Promise<boolean>;
  updateArtist: (id: string, artist: Partial<Artist>) => Promise<boolean>;
  deleteArtist: (id: string) => Promise<boolean>;
}

export const useArtists = (autofetch: boolean = true): UseArtistsReturn => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArtists = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await artistRepository.getAllArtists();

      if (result.success) {
        setArtists(result.data);
      } else {
        setError(result.error);
      }
    } catch (_err) {
      setError('Error inesperado al obtener los artistas');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createArtist = useCallback(async (artist: Artist): Promise<boolean> => {
    try {
      const result = await artistRepository.createArtist(artist);

      if (result.success) {
        setArtists((prev) => [...prev, artist]);
        return true;
      } else {
        setError(result.error);
        return false;
      }
    } catch (_err) {
      setError('Error inesperado al crear el artista');
      return false;
    }
  }, []);

  const updateArtist = useCallback(async (id: string, artistData: Partial<Artist>): Promise<boolean> => {
    try {
      const result = await artistRepository.updateArtist(id, artistData);

      if (result.success) {
        setArtists((prev) => prev.map((artist) => (artist.id === id ? { ...artist, ...artistData } : artist)));
        return true;
      } else {
        setError(result.error);
        return false;
      }
    } catch (_err) {
      setError('Error inesperado al actualizar el artista');
      return false;
    }
  }, []);

  const deleteArtist = useCallback(async (id: string): Promise<boolean> => {
    try {
      const result = await artistRepository.deleteArtist(id);

      if (result.success) {
        setArtists((prev) => prev.filter((artist) => artist.id !== id));
        return true;
      } else {
        setError(result.error);
        return false;
      }
    } catch (_err) {
      setError('Error inesperado al eliminar el artista');
      return false;
    }
  }, []);

  useEffect(() => {
    if (autofetch) {
      fetchArtists();
    }
  }, [fetchArtists, autofetch]);

  return {
    artists,
    isLoading,
    error,
    refetch: fetchArtists,
    createArtist,
    updateArtist,
    deleteArtist,
  };
};
