'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Song, mockSongs } from '@/types/song.type';

import { Edit, Play, Plus, Trash2 } from 'lucide-react';

export default function SongsPage() {
  const [songs, setSongs] = useState<Song[]>(mockSongs);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleCreate = () => {
    setIsCreating(true);
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleDelete = (id: string) => {
    setSongs(songs.filter((song) => song.id !== id));
  };

  const handleSave = () => {
    // TODO: Implement save logic
    setIsCreating(false);
    setEditingId(null);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
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
        <Button onClick={handleCreate} className="bg-green-500 hover:bg-green-600">
          <Plus className="mr-2 h-4 w-4" />
          Nueva Canción
        </Button>
      </div>

      {isCreating && (
        <Card className="border-gray-700 bg-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Crear Nueva Canción</CardTitle>
            <CardDescription className="text-gray-400">Completa los datos de la canción</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
                <Input id="artistId" placeholder="ID del artista" className="border-gray-700 bg-gray-900 text-white" />
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

      <div className="space-y-4">
        {songs.map((song) => (
          <Card key={song.id} className="border-gray-700 bg-gray-800">
            {editingId === song.id ? (
              <CardContent className="space-y-4 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`edit-title-${song.id}`} className="text-white">
                      Título
                    </Label>
                    <Input
                      id={`edit-title-${song.id}`}
                      defaultValue={song.title}
                      className="border-gray-700 bg-gray-900 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`edit-album-${song.id}`} className="text-white">
                      Álbum
                    </Label>
                    <Input
                      id={`edit-album-${song.id}`}
                      defaultValue={song.album}
                      className="border-gray-700 bg-gray-900 text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`edit-artist-${song.id}`} className="text-white">
                      Artista
                    </Label>
                    <Input
                      id={`edit-artist-${song.id}`}
                      defaultValue={song.artist}
                      className="border-gray-700 bg-gray-900 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`edit-artistId-${song.id}`} className="text-white">
                      ID del Artista
                    </Label>
                    <Input
                      id={`edit-artistId-${song.id}`}
                      defaultValue={song.artistId}
                      className="border-gray-700 bg-gray-900 text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`edit-duration-${song.id}`} className="text-white">
                      Duración (segundos)
                    </Label>
                    <Input
                      id={`edit-duration-${song.id}`}
                      type="number"
                      defaultValue={song.duration}
                      className="border-gray-700 bg-gray-900 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`edit-image-${song.id}`} className="text-white">
                      Imagen URL
                    </Label>
                    <Input
                      id={`edit-image-${song.id}`}
                      defaultValue={song.image}
                      className="border-gray-700 bg-gray-900 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`edit-url-${song.id}`} className="text-white">
                    Audio URL
                  </Label>
                  <Input
                    id={`edit-url-${song.id}`}
                    defaultValue={song.url}
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
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded bg-gray-900">
                    <img src={song.image} alt={song.title} className="h-full w-full object-cover" />
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
                      onClick={() => handleEdit(song.id)}
                      size="sm"
                      variant="outline"
                      className="border-gray-700 hover:bg-gray-700"
                    >
                      <Edit className="h-4 w-4" />
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
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
