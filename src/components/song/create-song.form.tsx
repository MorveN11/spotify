'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/ui/file-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createSongFormSchema, type CreateSongFormData } from '@/schemas/form.schema';
import { formService } from '@/services/form.service';
import type { Artist } from '@/types/artist.type';
import { zodResolver } from '@hookform/resolvers/zod';

import { Loader2, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface CreateSongFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateSongForm({ onSuccess, onCancel }: CreateSongFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loadingArtists, setLoadingArtists] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<CreateSongFormData>({
    resolver: zodResolver(createSongFormSchema),
  });

  const selectedArtistId = watch('artistId');

  useEffect(() => {
    const loadArtists = async () => {
      try {
        const result = await formService.getAllArtists();
        if (result.success) {
          setArtists(result.data);
        } else {
          toast.error('Error al cargar artistas', {
            description: result.error,
          });
        }
      } catch {
        toast.error('Error al cargar artistas', {
          description: 'Error inesperado al cargar los artistas',
        });
      } finally {
        setLoadingArtists(false);
      }
    };

    loadArtists();
  }, []);

  useEffect(() => {
    if (selectedArtistId) {
      const selectedArtist = artists.find((a) => a.id === selectedArtistId);
      if (selectedArtist) {
        setValue('artist', selectedArtist.name);
      }
    }
  }, [selectedArtistId, artists, setValue]);

  const onSubmit = async (data: CreateSongFormData) => {
    setIsLoading(true);

    try {
      const result = await formService.createSong(data);

      if (result.success) {
        toast.success('Canción creada', {
          description: 'La canción se ha creado correctamente',
        });
        reset();
        onSuccess?.();
      } else {
        toast.error('Error al crear canción', {
          description: result.error || 'Error desconocido',
        });
      }
    } catch {
      toast.error('Error inesperado', {
        description: 'Error al crear la canción',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input id="title" {...register('title')} placeholder="Título de la canción" error={errors.title?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="album">Álbum</Label>
          <Input id="album" {...register('album')} placeholder="Nombre del álbum" error={errors.album?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="artistId">Artista</Label>
          {loadingArtists ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Cargando artistas...</span>
            </div>
          ) : (
            <Select value={selectedArtistId || ''} onValueChange={(value: string) => setValue('artistId', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar artista" />
              </SelectTrigger>
              <SelectContent>
                {artists.map((artist) => (
                  <SelectItem key={artist.id} value={artist.id}>
                    {artist.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {errors.artistId && <p className="text-sm text-destructive">{errors.artistId.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duración (segundos)</Label>
          <Input
            id="duration"
            type="number"
            {...register('duration', { valueAsNumber: true })}
            placeholder="180"
            error={errors.duration?.message}
          />
        </div>

        <FileUpload
          accept="image/*"
          label="Imagen del álbum"
          onFileSelect={(file) => setValue('image', file as File)}
          error={errors.image?.message}
          preview={true}
        />

        <FileUpload
          accept="audio/*"
          label="Archivo de audio"
          onFileSelect={(file) => setValue('audioFile', file as File)}
          error={errors.audioFile?.message}
          maxSize={50 * 1024 * 1024} // 50MB
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
                Crear Canción
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
