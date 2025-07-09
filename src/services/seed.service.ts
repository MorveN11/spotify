import { fileReader } from '@/lib/file-reader';
import { artistRepository } from '@/repositories/artist.repository';
import { genreRepository } from '@/repositories/genre.repository';
import { songRepository } from '@/repositories/song.repository';
import { storageService } from '@/services/storage.service';
import { mockArtists } from '@/types/artist.type';
import { mockGenres } from '@/types/genre.type';
import { mockSongs } from '@/types/song.type';

export class SeedService {
  private async uploadFileAndGetUrl(localPath: string, isAudio: boolean = false): Promise<string | null> {
    try {
      const exists = await fileReader.fileExists(localPath);
      if (!exists) {
        console.warn(`⚠️  Archivo no encontrado: ${localPath}`);
        return null;
      }

      const file = isAudio ? await fileReader.readAudioFile(localPath) : await fileReader.readImageFile(localPath);

      const result = isAudio ? await storageService.uploadAudio(file) : await storageService.uploadImage(file);

      if (result.success) {
        console.log(`📁 Archivo subido: ${localPath} -> ${result.data.url}`);
        return result.data.url;
      } else {
        console.error(`❌ Error al subir archivo ${localPath}:`, result.error);
        return null;
      }
    } catch (error) {
      console.error(`💥 Error inesperado al subir archivo ${localPath}:`, error);
      return null;
    }
  }
  private async seedGenres(): Promise<void> {
    console.log('🌱 Iniciando seed de géneros...');

    const existingGenres = await genreRepository.getAllGenres();
    if (existingGenres.success && existingGenres.data.length > 0) {
      console.log('⚠️  Los géneros ya existen, saltando seed...');
      return;
    }

    for (const genre of mockGenres) {
      const imageUrl = await this.uploadFileAndGetUrl(genre.image);

      const genreWithFirebaseImage = {
        ...genre,
        image: imageUrl || genre.image,
      };

      const result = await genreRepository.createGenre(genreWithFirebaseImage);

      if (result.success) {
        console.log(`✅ Género creado: ${genre.name}`);
      } else {
        console.error(`❌ Error al crear género ${genre.name}:`, result.error);
      }
    }
  }

  private async seedArtists(): Promise<void> {
    console.log('🌱 Iniciando seed de artistas...');

    const existingArtists = await artistRepository.getAllArtists();
    if (existingArtists.success && existingArtists.data.length > 0) {
      console.log('⚠️  Los artistas ya existen, saltando seed...');
      return;
    }

    for (const artist of mockArtists) {
      const imageUrl = await this.uploadFileAndGetUrl(artist.image);

      const artistWithFirebaseImage = {
        ...artist,
        image: imageUrl || artist.image,
      };

      const result = await artistRepository.createArtist(artistWithFirebaseImage);

      if (result.success) {
        console.log(`✅ Artista creado: ${artist.name}`);
      } else {
        console.error(`❌ Error al crear artista ${artist.name}:`, result.error);
      }
    }
  }

  private async seedSongs(): Promise<void> {
    console.log('🌱 Iniciando seed de canciones...');

    const existingSongs = await songRepository.getAllSongs();
    if (existingSongs.success && existingSongs.data.length > 0) {
      console.log('⚠️  Las canciones ya existen, saltando seed...');
      return;
    }

    for (const song of mockSongs) {
      console.log(`🎵 Procesando canción: ${song.title} - ${song.artist}`);

      const imageUrl = await this.uploadFileAndGetUrl(song.image);

      const audioUrl = await this.uploadFileAndGetUrl(song.url, true);

      const songWithFirebaseFiles = {
        ...song,
        image: imageUrl || song.image,
        url: audioUrl || song.url,
      };

      const result = await songRepository.createSong(songWithFirebaseFiles);

      if (result.success) {
        console.log(`✅ Canción creada: ${song.title} - ${song.artist}`);
      } else {
        console.error(`❌ Error al crear canción ${song.title}:`, result.error);
      }
    }
  }

  public async seedAll(): Promise<void> {
    console.log('🚀 Iniciando seed completo de la base de datos...');

    try {
      await this.seedGenres();
      await this.seedArtists();
      await this.seedSongs();

      console.log('🎉 Seed completo exitoso!');
    } catch (error) {
      console.error('💥 Error durante el seed:', error);
      throw error;
    }
  }

  public async clearAll(): Promise<void> {
    console.log('🧹 Limpiando toda la base de datos...');

    try {
      const songsResult = await songRepository.getAllSongs();
      if (songsResult.success) {
        for (const song of songsResult.data) {
          await songRepository.deleteSong(song.id);
          console.log(`🗑️  Canción eliminada: ${song.title}`);
        }
      }

      const artistsResult = await artistRepository.getAllArtists();
      if (artistsResult.success) {
        for (const artist of artistsResult.data) {
          await artistRepository.deleteArtist(artist.id);
          console.log(`🗑️  Artista eliminado: ${artist.name}`);
        }
      }

      const genresResult = await genreRepository.getAllGenres();
      if (genresResult.success) {
        for (const genre of genresResult.data) {
          await genreRepository.deleteGenre(genre.id);
          console.log(`🗑️  Género eliminado: ${genre.name}`);
        }
      }

      console.log('🧽 Base de datos limpiada exitosamente!');
    } catch (error) {
      console.error('💥 Error durante la limpieza:', error);
      throw error;
    }
  }

  public async reseedAll(): Promise<void> {
    console.log('🔄 Reiniciando seed completo...');
    await this.clearAll();
    await this.seedAll();
  }
}

export const seedService = new SeedService();
