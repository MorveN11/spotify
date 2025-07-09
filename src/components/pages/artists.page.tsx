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
import { Textarea } from '@/components/ui/textarea';
import { Artist, mockArtists } from '@/types/artist.type';

import { Plus, Trash2 } from 'lucide-react';

export function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>(mockArtists);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = (id: string) => {
    setArtists(artists.filter((artist) => artist.id !== id));
  };

  const handleCreate = () => {
    // TODO: Implement create logic
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Artistas</h1>
          <p className="text-gray-400">Gestiona los artistas musicales</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-500 hover:bg-green-600">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Artista
            </Button>
          </DialogTrigger>
          <DialogContent className="border-gray-700 bg-gray-800">
            <DialogHeader>
              <DialogTitle className="text-white">Crear Nuevo Artista</DialogTitle>
              <DialogDescription className="text-gray-400">Completa los datos del artista</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
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
        {artists.map((artist) => (
          <Card key={artist.id} className="border-gray-700 bg-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">{artist.name}</CardTitle>
                  <p className="text-sm text-gray-400">{artist.genre}</p>
                </div>
                <Button
                  onClick={() => handleDelete(artist.id)}
                  size="sm"
                  variant="outline"
                  className="border-gray-700 hover:border-red-700 hover:bg-red-900"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-gray-900">
                <Image
                  src={artist.image}
                  alt={artist.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <p className="line-clamp-3 text-sm text-gray-400">{artist.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
