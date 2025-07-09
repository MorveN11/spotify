import { db } from '@/firebase/firebase.app';
import { errorResponse, successResponse, type ApiResponse } from '@/types/api.type';
import type { Genre } from '@/types/genre.type';

import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';

export class GenreRepository {
  private readonly collectionName = 'genres';

  public async createGenre(genre: Genre): Promise<ApiResponse<Genre>> {
    try {
      await setDoc(doc(db, this.collectionName, genre.id), genre);
      return successResponse(genre);
    } catch (error) {
      return errorResponse(`Error al crear el género: ${error}`);
    }
  }

  public async getAllGenres(): Promise<ApiResponse<Genre[]>> {
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName));
      const genres: Genre[] = [];
      querySnapshot.forEach((doc) => {
        genres.push(doc.data() as Genre);
      });
      return successResponse(genres);
    } catch (error) {
      return errorResponse(`Error al obtener los géneros: ${error}`);
    }
  }

  public async updateGenre(id: string, genre: Partial<Genre>): Promise<ApiResponse<boolean>> {
    try {
      await updateDoc(doc(db, this.collectionName, id), genre);
      return successResponse(true);
    } catch (error) {
      return errorResponse(`Error al actualizar el género: ${error}`);
    }
  }

  public async deleteGenre(id: string): Promise<ApiResponse<boolean>> {
    try {
      await deleteDoc(doc(db, this.collectionName, id));
      return successResponse(true);
    } catch (error) {
      return errorResponse(`Error al eliminar el género: ${error}`);
    }
  }
}

export const genreRepository = new GenreRepository();
