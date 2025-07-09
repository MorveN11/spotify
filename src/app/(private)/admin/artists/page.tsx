'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Artist, mockArtists } from '@/types/artist.type';

import { Edit, Plus, Trash2 } from 'lucide-react';

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>(mockArtists);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleCreate = () => {
    setIsCreating(true);
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleDelete = (id: string) => {
    setArtists(artists.filter((artist) => artist.id !== id));
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
          <h1 className="text-3xl font-bold text-white">Artistas</h1>
          <p className="text-gray-400">Gestiona los artistas musicales</p>
        </div>
        <Button onClick={handleCreate} className="bg-green-500 hover:bg-green-600">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Artista
        </Button>
      </div>

      {isCreating && (
        <Card className="border-gray-700 bg-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Crear Nuevo Artista</CardTitle>
            <CardDescription className="text-gray-400">Completa los datos del artista</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Nombre
              </Label>
              <Input id="name" placeholder="Nombre del artista" className="border-gray-700 bg-gray-900 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-white">
                Biografía
              </Label>
              <Textarea
                id="bio"
                placeholder="Biografía del artista"
                className="border-gray-700 bg-gray-900 text-white"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image" className="text-white">
                Imagen URL
              </Label>
              <Input
                id="image"
                placeholder="/images/artists/artist.webp"
                className="border-gray-700 bg-gray-900 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="genre" className="text-white">
                Género
              </Label>
              <Input id="genre" placeholder="Género musical" className="border-gray-700 bg-gray-900 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="genreId" className="text-white">
                ID del Género
              </Label>
              <Input id="genreId" placeholder="ID del género" className="border-gray-700 bg-gray-900 text-white" />
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
        {artists.map((artist) => (
          <Card key={artist.id} className="border-gray-700 bg-gray-800">
            {editingId === artist.id ? (
              <CardContent className="space-y-4 p-4">
                <div className="space-y-2">
                  <Label htmlFor={`edit-name-${artist.id}`} className="text-white">
                    Nombre
                  </Label>
                  <Input
                    id={`edit-name-${artist.id}`}
                    defaultValue={artist.name}
                    className="border-gray-700 bg-gray-900 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`edit-bio-${artist.id}`} className="text-white">
                    Biografía
                  </Label>
                  <Textarea
                    id={`edit-bio-${artist.id}`}
                    defaultValue={artist.bio}
                    className="border-gray-700 bg-gray-900 text-white"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`edit-image-${artist.id}`} className="text-white">
                    Imagen URL
                  </Label>
                  <Input
                    id={`edit-image-${artist.id}`}
                    defaultValue={artist.image}
                    className="border-gray-700 bg-gray-900 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`edit-genre-${artist.id}`} className="text-white">
                    Género
                  </Label>
                  <Input
                    id={`edit-genre-${artist.id}`}
                    defaultValue={artist.genre}
                    className="border-gray-700 bg-gray-900 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`edit-genreId-${artist.id}`} className="text-white">
                    ID del Género
                  </Label>
                  <Input
                    id={`edit-genreId-${artist.id}`}
                    defaultValue={artist.genreId}
                    className="border-gray-700 bg-gray-900 text-white"
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
                      <CardTitle className="text-white">{artist.name}</CardTitle>
                      <p className="text-sm text-gray-400">{artist.genre}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleEdit(artist.id)}
                        size="sm"
                        variant="outline"
                        className="border-gray-700 hover:bg-gray-700"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(artist.id)}
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
                  <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-gray-900">
                    <img src={artist.image} alt={artist.name} className="h-full w-full object-cover" />
                  </div>
                  <p className="line-clamp-3 text-sm text-gray-400">{artist.bio}</p>
                </CardContent>
              </>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
