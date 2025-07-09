import { useCallback, useEffect, useState } from 'react';

import { artistRepository } from '@/repositories/artist.repository';
import type { Artist } from '@/types/artist.type';

interface UseArtistsReturn {
  artists: Artist[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
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
  };
};
