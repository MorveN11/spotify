'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Genre, mockGenres } from '@/types/genre.type';

import { Edit, Plus, Trash2 } from 'lucide-react';

export default function GenresPage() {
  const [genres, setGenres] = useState<Genre[]>(mockGenres);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleCreate = () => {
    setIsCreating(true);
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleDelete = (id: string) => {
    setGenres(genres.filter((genre) => genre.id !== id));
  };

  const handleSave = () => {
    setIsCreating(false);
    setEditingId(null);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Géneros</h1>
          <p className="text-gray-400">Gestiona los géneros musicales</p>
        </div>
        <Button onClick={handleCreate} className="bg-green-500 hover:bg-green-600">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Género
        </Button>
      </div>

      {isCreating && (
        <Card className="border-gray-700 bg-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Crear Nuevo Género</CardTitle>
            <CardDescription className="text-gray-400">Completa los datos del género</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
              <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600">
                Guardar
              </Button>
              <Button onClick={handleCancel} variant="outline" className="border-gray-700">
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {genres.map((genre) => (
          <Card key={genre.id} className="border-gray-700 bg-gray-800">
            {editingId === genre.id ? (
              <CardContent className="space-y-4 p-4">
                <div className="space-y-2">
                  <Label htmlFor={`edit-name-${genre.id}`} className="text-white">
                    Nombre
                  </Label>
                  <Input
                    id={`edit-name-${genre.id}`}
                    defaultValue={genre.name}
                    className="border-gray-700 bg-gray-900 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`edit-image-${genre.id}`} className="text-white">
                    Imagen URL
                  </Label>
                  <Input
                    id={`edit-image-${genre.id}`}
                    defaultValue={genre.image}
                    className="border-gray-700 bg-gray-900 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`edit-color-${genre.id}`} className="text-white">
                    Color
                  </Label>
                  <Input
                    id={`edit-color-${genre.id}`}
                    type="color"
                    defaultValue={genre.color}
                    className="h-10 border-gray-700 bg-gray-900 text-white"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600">
                    Guardar
                  </Button>
                  <Button onClick={handleCancel} variant="outline" className="border-gray-700">
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            ) : (
              <>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">{genre.name}</CardTitle>
                      <div className="mt-2 flex items-center space-x-2">
                        <div className="h-4 w-4 rounded-full" style={{ backgroundColor: genre.color }} />
                        <span className="text-sm text-gray-400">{genre.color}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleEdit(genre.id)}
                        size="sm"
                        variant="outline"
                        className="border-gray-700 hover:bg-gray-700"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(genre.id)}
                        size="sm"
                        variant="outline"
                        className="border-gray-700 hover:border-red-700 hover:bg-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-900">
                    <img src={genre.image} alt={genre.name} className="h-full w-full object-cover" />
                  </div>
                </CardContent>
              </>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
