import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';
import { Genre } from '@/types/genre.type';

interface Props {
  genre: Genre;
}

export function GenreCard({ genre }: Props) {
  return (
    <Link href={`/genre/${genre.id}`}>
      <Card className="group cursor-pointer overflow-hidden border-none bg-gray-800/40 transition-all hover:bg-gray-700/50">
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={genre.image}
              alt={genre.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <h3 className="text-lg font-bold text-white">{genre.name}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
