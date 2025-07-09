import { useCallback, useEffect, useState } from 'react';

import { genreRepository } from '@/repositories/genre.repository';
import type { Genre } from '@/types/genre.type';

interface UseGenresReturn {
  genres: Genre[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createGenre: (genre: Genre) => Promise<boolean>;
  updateGenre: (id: string, genre: Partial<Genre>) => Promise<boolean>;
  deleteGenre: (id: string) => Promise<boolean>;
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

  const createGenre = useCallback(async (genre: Genre): Promise<boolean> => {
    try {
      const result = await genreRepository.createGenre(genre);

      if (result.success) {
        setGenres((prev) => [...prev, genre]);
        return true;
      } else {
        setError(result.error);
        return false;
      }
    } catch (_err) {
      setError('Error inesperado al crear el género');
      return false;
    }
  }, []);

  const updateGenre = useCallback(async (id: string, genreData: Partial<Genre>): Promise<boolean> => {
    try {
      const result = await genreRepository.updateGenre(id, genreData);

      if (result.success) {
        setGenres((prev) => prev.map((genre) => (genre.id === id ? { ...genre, ...genreData } : genre)));
        return true;
      } else {
        setError(result.error);
        return false;
      }
    } catch (_err) {
      setError('Error inesperado al actualizar el género');
      return false;
    }
  }, []);

  const deleteGenre = useCallback(async (id: string): Promise<boolean> => {
    try {
      const result = await genreRepository.deleteGenre(id);

      if (result.success) {
        setGenres((prev) => prev.filter((genre) => genre.id !== id));
        return true;
      } else {
        setError(result.error);
        return false;
      }
    } catch (_err) {
      setError('Error inesperado al eliminar el género');
      return false;
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
    createGenre,
    updateGenre,
    deleteGenre,
  };
};
