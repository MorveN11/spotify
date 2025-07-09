'use client';

import { useState } from 'react';

import Image from 'next/image';

import { CreateArtistForm } from '@/components/artist/create-artist.form';
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
import { Error } from '@/components/ui/error';
import { Loading } from '@/components/ui/loading';
import { useArtists } from '@/hooks/data/use-artists';
import { formService } from '@/services/form.service';

import { Plus, Trash2 } from 'lucide-react';

export function ArtistsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { artists, isLoading, error, refetch } = useArtists();

  if (isLoading) {
    return <Loading message="Cargando artistas musicales..." />;
  }

  if (error) {
    return <Error title="Error al cargar artistas" message={error} showRetry={true} onRetry={refetch} icon="circle" />;
  }

  const handleDelete = (id: string) => {
    formService
      .deleteArtist(id)
      .then(() => {
        refetch();
      })
      .catch((err) => {
        console.error('Error deleting artist:', err);
      });
  };

  const handleCreate = () => {
    setIsDialogOpen(false);
    refetch();
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
            <CreateArtistForm onSuccess={handleCreate} onCancel={() => setIsDialogOpen(false)} />
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
