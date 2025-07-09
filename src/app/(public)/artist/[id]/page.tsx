'use client';

import { useParams } from 'next/navigation';

import { ArtistPage } from '@/components/pages/artist.page';

export default function Page() {
  const params = useParams();
  const artistId = params.id as string;

  return <ArtistPage artistId={artistId} />;
}
