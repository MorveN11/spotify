import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Artist } from '@/types/artist.type';

interface Props {
  artist: Artist;
}

export function ArtistCard({ artist }: Props) {
  return (
    <Link href={`/artist/${artist.id}`}>
      <Card className="group h-[320px] cursor-pointer border-none bg-gray-800/40 p-4 transition-all hover:bg-gray-700/50">
        <CardContent className="flex h-full flex-col p-0">
          <div className="mb-4 aspect-square flex-shrink-0 overflow-hidden rounded-full">
            <Image
              src={artist.image}
              alt={artist.name}
              width={200}
              height={200}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <div className="flex flex-1 flex-col justify-center space-y-2 text-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <h3 className="line-clamp-2 px-1 leading-tight font-semibold text-white">{artist.name}</h3>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{artist.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="line-clamp-1 px-1 text-sm text-gray-400">{artist.genre}</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{artist.genre}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
