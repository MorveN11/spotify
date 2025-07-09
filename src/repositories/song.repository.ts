import { db } from '@/firebase/firebase.app';
import { errorResponse, successResponse, type ApiResponse } from '@/types/api.type';
import type { Song } from '@/types/song.type';

import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';

class SongRepository {
  private readonly collectionName = 'songs';

  public async createSong(song: Song): Promise<ApiResponse<Song>> {
    try {
      await setDoc(doc(db, this.collectionName, song.id), song);
      return successResponse(song);
    } catch (error) {
      return errorResponse(`Error al crear la canción: ${error}`);
    }
  }

  public async getAllSongs(): Promise<ApiResponse<Song[]>> {
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName));
      const songs: Song[] = [];
      querySnapshot.forEach((doc) => {
        songs.push(doc.data() as Song);
      });
      return successResponse(songs);
    } catch (error) {
      return errorResponse(`Error al obtener las canciones: ${error}`);
    }
  }

  public async updateSong(id: string, song: Partial<Song>): Promise<ApiResponse<boolean>> {
    try {
      await updateDoc(doc(db, this.collectionName, id), song);
      return successResponse(true);
    } catch (error) {
      return errorResponse(`Error al actualizar la canción: ${error}`);
    }
  }

  public async deleteSong(id: string): Promise<ApiResponse<boolean>> {
    try {
      await deleteDoc(doc(db, this.collectionName, id));
      return successResponse(true);
    } catch (error) {
      return errorResponse(`Error al eliminar la canción: ${error}`);
    }
  }
}

export const songRepository = new SongRepository();
