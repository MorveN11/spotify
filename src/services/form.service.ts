import { artistRepository } from '@/repositories/artist.repository';
import { genreRepository } from '@/repositories/genre.repository';
import { songRepository } from '@/repositories/song.repository';
import type { CreateArtistFormData, CreateGenreFormData, CreateSongFormData } from '@/schemas/form.schema';
import { storageService } from '@/services/storage.service';
import { errorResponse, type ApiResponse } from '@/types/api.type';
import type { Artist } from '@/types/artist.type';
import type { Genre } from '@/types/genre.type';
import type { Song } from '@/types/song.type';

import { v4 } from 'uuid';

class FormService {
  public async createSong(formData: CreateSongFormData): Promise<ApiResponse<Song>> {
    try {
      const songId = v4();

      const audioUploadResult = await storageService.uploadAudio(formData.audioFile);
      if (!audioUploadResult.success) {
        return audioUploadResult;
      }

      const imageUploadResult = await storageService.uploadImage(formData.image);
      if (!imageUploadResult.success) {
        await storageService.deleteAudio(audioUploadResult.data.name);
        return imageUploadResult;
      }

      const song: Song = {
        id: songId,
        title: formData.title,
        album: formData.album,
        artist: formData.artist,
        artistId: formData.artistId,
        duration: formData.duration,
        image: imageUploadResult.data.url,
        url: audioUploadResult.data.url,
      };

      const result = await songRepository.createSong(song);

      if (!result.success) {
        await storageService.deleteAudio(audioUploadResult.data.name);
        await storageService.deleteImage(imageUploadResult.data.name);
      }

      return result;
    } catch (error) {
      return errorResponse(`Error al crear la canción: ${error}`);
    }
  }

  public async createArtist(formData: CreateArtistFormData): Promise<ApiResponse<Artist>> {
    try {
      const artistId = v4();

      const imageUploadResult = await storageService.uploadImage(formData.image);
      if (!imageUploadResult.success) {
        return imageUploadResult;
      }

      const artist: Artist = {
        id: artistId,
        name: formData.name,
        bio: formData.bio,
        genre: formData.genre,
        genreId: formData.genreId,
        image: imageUploadResult.data.url,
      };

      const result = await artistRepository.createArtist(artist);

      if (!result.success) {
        await storageService.deleteImage(imageUploadResult.data.name);
      }

      return result;
    } catch (error) {
      return errorResponse(`Error al crear el artista: ${error}`);
    }
  }

  public async createGenre(formData: CreateGenreFormData): Promise<ApiResponse<Genre>> {
    try {
      const genreId = v4();

      const imageUploadResult = await storageService.uploadImage(formData.image);
      if (!imageUploadResult.success) {
        return imageUploadResult;
      }

      const genre: Genre = {
        id: genreId,
        name: formData.name,
        color: formData.color,
        image: imageUploadResult.data.url,
      };

      const result = await genreRepository.createGenre(genre);

      if (!result.success) {
        await storageService.deleteImage(imageUploadResult.data.name);
      }

      return result;
    } catch (error) {
      return errorResponse(`Error al crear el género: ${error}`);
    }
  }

  public async deleteSong(songId: string): Promise<ApiResponse<boolean>> {
    try {
      const allSongs = await songRepository.getAllSongs();
      if (!allSongs.success) {
        return allSongs;
      }

      const song = allSongs.data.find((s: Song) => s.id === songId);
      if (!song) {
        return errorResponse('Canción no encontrada');
      }

      const deleteResult = await songRepository.deleteSong(songId);
      if (!deleteResult.success) {
        return deleteResult;
      }

      if (song.url) {
        const audioFileName = song.url.split('/').pop();
        if (audioFileName) {
          await storageService.deleteAudio(audioFileName);
        }
      }

      if (song.image && !song.image.startsWith('/images/albums/default')) {
        const imageFileName = song.image.split('/').pop();
        if (imageFileName) {
          await storageService.deleteImage(imageFileName);
        }
      }

      return deleteResult;
    } catch (error) {
      return errorResponse(`Error al eliminar la canción: ${error}`);
    }
  }

  public async deleteArtist(artistId: string): Promise<ApiResponse<boolean>> {
    try {
      const allArtists = await artistRepository.getAllArtists();
      if (!allArtists.success) {
        return allArtists;
      }

      const artist = allArtists.data.find((a: Artist) => a.id === artistId);
      if (!artist) {
        return errorResponse('Artista no encontrado');
      }

      const deleteResult = await artistRepository.deleteArtist(artistId);
      if (!deleteResult.success) {
        return deleteResult;
      }

      if (artist.image) {
        const imageFileName = artist.image.split('/').pop();
        if (imageFileName) {
          await storageService.deleteImage(imageFileName);
        }
      }

      return deleteResult;
    } catch (error) {
      return errorResponse(`Error al eliminar el artista: ${error}`);
    }
  }

  public async deleteGenre(genreId: string): Promise<ApiResponse<boolean>> {
    try {
      const allGenres = await genreRepository.getAllGenres();
      if (!allGenres.success) {
        return allGenres;
      }

      const genre = allGenres.data.find((g: Genre) => g.id === genreId);
      if (!genre) {
        return errorResponse('Género no encontrado');
      }

      const deleteResult = await genreRepository.deleteGenre(genreId);
      if (!deleteResult.success) {
        return deleteResult;
      }

      if (genre.image) {
        const imageFileName = genre.image.split('/').pop();
        if (imageFileName) {
          await storageService.deleteImage(imageFileName);
        }
      }

      return deleteResult;
    } catch (error) {
      return errorResponse(`Error al eliminar el género: ${error}`);
    }
  }

  public async getAllArtists(): Promise<ApiResponse<Artist[]>> {
    return await artistRepository.getAllArtists();
  }

  public async getAllGenres(): Promise<ApiResponse<Genre[]>> {
    return await genreRepository.getAllGenres();
  }

  public async getAllSongs(): Promise<ApiResponse<Song[]>> {
    return await songRepository.getAllSongs();
  }
}

export const formService = new FormService();
