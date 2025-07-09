import { useCallback, useEffect, useState } from 'react';

import { genreRepository } from '@/repositories/genre.repository';
import type { Genre } from '@/types/genre.type';

interface UseGenresReturn {
  genres: Genre[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useGenres = (autofetch: boolean = true): UseGenresReturn => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGenres = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await genreRepository.getAllGenres();

      if (result.success) {
        setGenres(result.data);
      } else {
        setError(result.error);
      }
    } catch (_err) {
      setError('Error inesperado al obtener los géneros');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autofetch) {
      fetchGenres();
    }
  }, [fetchGenres, autofetch]);

  return {
    genres,
    isLoading,
    error,
    refetch: fetchGenres,
  };
};
