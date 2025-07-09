'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/ui/file-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { createArtistFormSchema, type CreateArtistFormData } from '@/schemas/form.schema';
import { formService } from '@/services/form.service';
import type { Genre } from '@/types/genre.type';
import { zodResolver } from '@hookform/resolvers/zod';

import { Loader2, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface CreateArtistFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateArtistForm({ onSuccess, onCancel }: CreateArtistFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loadingGenres, setLoadingGenres] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<CreateArtistFormData>({
    resolver: zodResolver(createArtistFormSchema),
  });

  const selectedGenreId = watch('genreId');

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const result = await formService.getAllGenres();
        if (result.success) {
          setGenres(result.data);
        } else {
          toast.error('Error al cargar géneros', {
            description: result.error,
          });
        }
      } catch (_error) {
        toast.error('Error al cargar géneros', {
          description: 'Error inesperado al cargar los géneros',
        });
      } finally {
        setLoadingGenres(false);
      }
    };

    loadGenres();
  }, []);

  useEffect(() => {
    if (selectedGenreId) {
      const selectedGenre = genres.find((g) => g.id === selectedGenreId);
      if (selectedGenre) {
        setValue('genre', selectedGenre.name);
      }
    }
  }, [selectedGenreId, genres, setValue]);

  const onSubmit = async (data: CreateArtistFormData) => {
    setIsLoading(true);

    try {
      const result = await formService.createArtist(data);

      if (result.success) {
        toast.success('Artista creado', {
          description: 'El artista se ha creado correctamente',
        });
        reset();
        onSuccess?.();
      } else {
        toast.error('Error al crear artista', {
          description: result.error || 'Error desconocido',
        });
      }
    } catch (_error) {
      toast.error('Error inesperado', {
        description: 'Error al crear el artista',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Input id="name" {...register('name')} placeholder="Nombre del artista" error={errors.name?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Biografía</Label>
          <Textarea
            id="bio"
            {...register('bio')}
            placeholder="Biografía del artista"
            rows={3}
            className="resize-none"
          />
          {errors.bio && <p className="text-sm text-destructive">{errors.bio.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="genreId">Género</Label>
          {loadingGenres ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Cargando géneros...</span>
            </div>
          ) : (
            <Select value={selectedGenreId || ''} onValueChange={(value: string) => setValue('genreId', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar género" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((genre) => (
                  <SelectItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {errors.genreId && <p className="text-sm text-destructive">{errors.genreId.message}</p>}
        </div>

        <FileUpload
          accept="image/*"
          label="Imagen del artista"
          onFileSelect={(file) => setValue('image', file as File)}
          error={errors.image?.message}
          preview={true}
        />

        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={isLoading} className="flex-1">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creando...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Crear Artista
              </>
            )}
          </Button>
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
