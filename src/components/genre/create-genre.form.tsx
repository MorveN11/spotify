'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/ui/file-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createGenreFormSchema, type CreateGenreFormData } from '@/schemas/form.schema';
import { formService } from '@/services/form.service';
import { zodResolver } from '@hookform/resolvers/zod';

import { Loader2, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface CreateGenreFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateGenreForm({ onSuccess, onCancel }: CreateGenreFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CreateGenreFormData>({
    resolver: zodResolver(createGenreFormSchema),
  });

  const onSubmit = async (data: CreateGenreFormData) => {
    setIsLoading(true);

    try {
      const result = await formService.createGenre(data);

      if (result.success) {
        toast.success('Género creado', {
          description: 'El género se ha creado correctamente',
        });
        reset();
        onSuccess?.();
      } else {
        toast.error('Error al crear género', {
          description: result.error || 'Error desconocido',
        });
      }
    } catch (_error) {
      toast.error('Error inesperado', {
        description: 'Error al crear el género',
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
          <Input id="name" {...register('name')} placeholder="Nombre del género" error={errors.name?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="color">Color</Label>
          <div className="flex gap-2">
            <Input id="color" type="color" {...register('color')} className="w-20" error={errors.color?.message} />
            <Input {...register('color')} placeholder="#000000" className="flex-1" error={errors.color?.message} />
          </div>
        </div>

        <FileUpload
          accept="image/*"
          label="Imagen del género"
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
                Crear Género
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
