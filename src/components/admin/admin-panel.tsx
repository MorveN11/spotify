'use client';

import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Disc, Edit, Music, Plus, Trash2, Users } from 'lucide-react';

const mockStats = {
  totalGenres: 12,
  totalArtists: 156,
  totalSongs: 2847,
  totalUsers: 1234,
};

const mockGenres = [
  { id: '1', name: 'Pop', artistCount: 45, songCount: 523 },
  { id: '2', name: 'Rock', artistCount: 32, songCount: 412 },
  { id: '3', name: 'Hip Hop', artistCount: 28, songCount: 387 },
  { id: '4', name: 'Electronic', artistCount: 19, songCount: 256 },
];

const mockArtists = [
  { id: '1', name: 'Taylor Swift', genre: 'Pop', songCount: 45, followers: '85.4M' },
  { id: '2', name: 'Ed Sheeran', genre: 'Pop', songCount: 32, followers: '42.1M' },
  { id: '3', name: 'Drake', genre: 'Hip Hop', songCount: 67, followers: '78.2M' },
  { id: '4', name: 'Queen', genre: 'Rock', songCount: 89, followers: '65.3M' },
];

const mockSongs = [
  { id: '1', title: 'Anti-Hero', artist: 'Taylor Swift', genre: 'Pop', duration: '3:21', status: 'active' },
  { id: '2', title: 'Shape of You', artist: 'Ed Sheeran', genre: 'Pop', duration: '3:54', status: 'active' },
  { id: '3', title: "God's Plan", artist: 'Drake', genre: 'Hip Hop', duration: '3:19', status: 'active' },
  { id: '4', title: 'Bohemian Rhapsody', artist: 'Queen', genre: 'Rock', duration: '5:55', status: 'active' },
];

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-white">Panel de Administración</h1>
        <p className="text-gray-400">Gestiona géneros, artistas y canciones</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            Resumen
          </TabsTrigger>
          <TabsTrigger value="genres" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            Géneros
          </TabsTrigger>
          <TabsTrigger value="artists" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            Artistas
          </TabsTrigger>
          <TabsTrigger value="songs" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            Canciones
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-gray-700 bg-gray-800/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Géneros</CardTitle>
                <Music className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{mockStats.totalGenres}</div>
              </CardContent>
            </Card>

            <Card className="border-gray-700 bg-gray-800/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Artistas</CardTitle>
                <Users className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{mockStats.totalArtists}</div>
              </CardContent>
            </Card>

            <Card className="border-gray-700 bg-gray-800/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Canciones</CardTitle>
                <Disc className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{mockStats.totalSongs}</div>
              </CardContent>
            </Card>

            <Card className="border-gray-700 bg-gray-800/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Usuarios</CardTitle>
                <Users className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{mockStats.totalUsers}</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="genres">
          <Card className="border-gray-700 bg-gray-800/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Gestión de Géneros</CardTitle>
                  <CardDescription className="text-gray-400">
                    Administra los géneros musicales de la plataforma
                  </CardDescription>
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Nuevo Género
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockGenres.map((genre) => (
                  <div
                    key={genre.id}
                    className="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800/30 p-4"
                  >
                    <div>
                      <h3 className="font-semibold text-white">{genre.name}</h3>
                      <p className="text-sm text-gray-400">
                        {genre.artistCount} artistas • {genre.songCount} canciones
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-400">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Artists Tab */}
        <TabsContent value="artists">
          <Card className="border-gray-700 bg-gray-800/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Gestión de Artistas</CardTitle>
                  <CardDescription className="text-gray-400">Administra los artistas de la plataforma</CardDescription>
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Nuevo Artista
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockArtists.map((artist) => (
                  <div
                    key={artist.id}
                    className="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800/30 p-4"
                  >
                    <div>
                      <h3 className="font-semibold text-white">{artist.name}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                          {artist.genre}
                        </Badge>
                        <span className="text-sm text-gray-400">
                          {artist.songCount} canciones • {artist.followers} seguidores
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-400">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Songs Tab */}
        <TabsContent value="songs">
          <Card className="border-gray-700 bg-gray-800/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Gestión de Canciones</CardTitle>
                  <CardDescription className="text-gray-400">Administra las canciones de la plataforma</CardDescription>
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Nueva Canción
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSongs.map((song) => (
                  <div
                    key={song.id}
                    className="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800/30 p-4"
                  >
                    <div>
                      <h3 className="font-semibold text-white">{song.title}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400">{song.artist}</span>
                        <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                          {song.genre}
                        </Badge>
                        <span className="text-sm text-gray-400">{song.duration}</span>
                        <Badge
                          variant={song.status === 'active' ? 'default' : 'secondary'}
                          className={song.status === 'active' ? 'bg-green-600' : 'bg-gray-600'}
                        >
                          {song.status === 'active' ? 'Activa' : 'Inactiva'}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-400">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
