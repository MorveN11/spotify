'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import { Song, mockSongs } from '@/types/song.type';

import { Play, Plus, Trash2 } from 'lucide-react';

export function SongsPage() {
  const [songs, setSongs] = useState<Song[]>(mockSongs);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = (id: string) => {
    setSongs(songs.filter((song) => song.id !== id));
  };

  const handleCreate = () => {
    // TODO: Implement create logic
    setIsDialogOpen(false);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Canciones</h1>
          <p className="text-gray-400">Gestiona las canciones del catálogo</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-500 hover:bg-green-600">
              <Plus className="mr-2 h-4 w-4" />
              Nueva Canción
            </Button>
          </DialogTrigger>
          <DialogContent className="border-gray-700 bg-gray-800">
            <DialogHeader>
              <DialogTitle className="text-white">Crear Nueva Canción</DialogTitle>
              <DialogDescription className="text-gray-400">Completa los datos de la canción</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-white">
                    Título
                  </Label>
                  <Input
                    id="title"
                    placeholder="Título de la canción"
                    className="border-gray-700 bg-gray-900 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="album" className="text-white">
                    Álbum
                  </Label>
                  <Input id="album" placeholder="Nombre del álbum" className="border-gray-700 bg-gray-900 text-white" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="artist" className="text-white">
                    Artista
                  </Label>
                  <Input
                    id="artist"
                    placeholder="Nombre del artista"
                    className="border-gray-700 bg-gray-900 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="artistId" className="text-white">
                    ID del Artista
                  </Label>
                  <Input
                    id="artistId"
                    placeholder="ID del artista"
                    className="border-gray-700 bg-gray-900 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-white">
                    Duración (segundos)
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="202"
                    className="border-gray-700 bg-gray-900 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image" className="text-white">
                    Imagen URL
                  </Label>
                  <Input
                    id="image"
                    placeholder="/images/albums/album.webp"
                    className="border-gray-700 bg-gray-900 text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="url" className="text-white">
                  Audio URL
                </Label>
                <Input id="url" placeholder="/audio/song.opus" className="border-gray-700 bg-gray-900 text-white" />
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

      <div className="space-y-4">
        {songs.map((song) => (
          <Card key={song.id} className="border-gray-700 bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="relative h-12 w-12 overflow-hidden rounded bg-gray-900">
                  <Image src={song.image} alt={song.title} fill className="object-cover" sizes="48px" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-white">{song.title}</h3>
                  <p className="text-sm text-gray-400">
                    {song.artist} • {song.album}
                  </p>
                </div>
                <div className="text-sm text-gray-400">{formatDuration(song.duration)}</div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="border-gray-700 hover:bg-gray-700">
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(song.id)}
                    size="sm"
                    variant="outline"
                    className="border-gray-700 hover:border-red-700 hover:bg-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
