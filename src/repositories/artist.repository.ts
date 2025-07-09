import { db } from '@/firebase/firebase.app';
import { errorResponse, successResponse, type ApiResponse } from '@/types/api.type';
import type { Artist } from '@/types/artist.type';

import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';

class ArtistRepository {
  private readonly collectionName = 'artists';

  public async createArtist(artist: Artist): Promise<ApiResponse<Artist>> {
    try {
      await setDoc(doc(db, this.collectionName, artist.id), artist);
      return successResponse(artist);
    } catch (error) {
      return errorResponse(`Error al crear el artista: ${error}`);
    }
  }

  public async getAllArtists(): Promise<ApiResponse<Artist[]>> {
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName));
      const artists: Artist[] = [];
      querySnapshot.forEach((doc) => {
        artists.push(doc.data() as Artist);
      });
      return successResponse(artists);
    } catch (error) {
      return errorResponse(`Error al obtener los artistas: ${error}`);
    }
  }

  public async updateArtist(id: string, artist: Partial<Artist>): Promise<ApiResponse<boolean>> {
    try {
      await updateDoc(doc(db, this.collectionName, id), artist);
      return successResponse(true);
    } catch (error) {
      return errorResponse(`Error al actualizar el artista: ${error}`);
    }
  }

  public async deleteArtist(id: string): Promise<ApiResponse<boolean>> {
    try {
      await deleteDoc(doc(db, this.collectionName, id));
      return successResponse(true);
    } catch (error) {
      return errorResponse(`Error al eliminar el artista: ${error}`);
    }
  }
}

export const artistRepository = new ArtistRepository();
