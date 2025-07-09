import { SongItem } from '@/components/song/song.item';
import { Song } from '@/types/song.type';

interface Props {
  songs: Song[];
}

export function SongList({ songs }: Props) {
  return (
    <div className="space-y-1">
      <div className="grid grid-cols-[16px_1fr_1fr_1fr] items-center gap-4 border-b border-gray-800 px-4 py-2 text-sm text-gray-400">
        <span>#</span>
        <span>Título</span>
        <span className="hidden md:block">Álbum</span>
        <span className="text-right">Duración</span>
      </div>

      {songs.map((song, index) => (
        <SongItem key={song.id} song={song} index={index} />
      ))}
    </div>
  );
}
