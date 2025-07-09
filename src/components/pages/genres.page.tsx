'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Genre, mockGenres } from '@/types/genre.type';

import { Plus, Trash2 } from 'lucide-react';

export function GenresPage() {
  const [genres, setGenres] = useState<Genre[]>(mockGenres);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = (id: string) => {
    setGenres(genres.filter((genre) => genre.id !== id));
  };

  const handleCreate = () => {
    // TODO: Implement create logic
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Géneros</h1>
          <p className="text-gray-400">Gestiona los géneros musicales</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-500 hover:bg-green-600">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Género
            </Button>
          </DialogTrigger>
          <DialogContent className="border-gray-700 bg-gray-800">
            <DialogHeader>
              <DialogTitle className="text-white">Crear Nuevo Género</DialogTitle>
              <DialogDescription className="text-gray-400">Completa los datos del género musical</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Nombre
                </Label>
                <Input id="name" placeholder="Nombre del género" className="border-gray-700 bg-gray-900 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image" className="text-white">
                  Imagen URL
                </Label>
                <Input
                  id="image"
                  placeholder="/images/genres/genre.webp"
                  className="border-gray-700 bg-gray-900 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="color" className="text-white">
                  Color
                </Label>
                <Input id="color" type="color" className="h-10 border-gray-700 bg-gray-900 text-white" />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleCreate} className="bg-green-500 hover:bg-green-600">
                  Guardar
                </Button>
                <Button onClick={() => setIsDialogOpen(false)} variant="outline" className="border-gray-700">
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {genres.map((genre) => (
          <Card key={genre.id} className="border-gray-700 bg-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">{genre.name}</CardTitle>
                  <div className="mt-2 flex items-center space-x-2">
                    <div className="h-4 w-4 rounded-full" style={{ backgroundColor: genre.color }} />
                    <span className="text-sm text-gray-400">{genre.color}</span>
                  </div>
                </div>
                <Button
                  onClick={() => handleDelete(genre.id)}
                  size="sm"
                  variant="outline"
                  className="border-gray-700 hover:border-red-700 hover:bg-red-900"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-900">
                <Image
                  src={genre.image}
                  alt={genre.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
