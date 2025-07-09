'use client';

import { useState } from 'react';

import Image from 'next/image';

import { CreateSongForm } from '@/components/song/create-song.form';
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
import { Error } from '@/components/ui/error';
import { Loading } from '@/components/ui/loading';
import { useSongs } from '@/hooks/data/use-songs';
import { formService } from '@/services/form.service';

import { Plus, Trash2 } from 'lucide-react';

export function SongsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { songs, isLoading, error, refetch } = useSongs();

  if (isLoading) {
    return <Loading message="Cargando canciones..." />;
  }

  if (error) {
    return <Error title="Error al cargar canciones" message={error} showRetry={true} onRetry={refetch} icon="circle" />;
  }

  const handleDelete = (_id: string) => {
    formService
      .deleteSong(_id)
      .then(() => {
        refetch();
      })
      .catch((err) => {
        console.error('Error deleting song:', err);
      });
  };

  const handleCreate = () => {
    setIsDialogOpen(false);
    refetch();
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
            <CreateSongForm onSuccess={handleCreate} onCancel={() => setIsDialogOpen(false)} />
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
