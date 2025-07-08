'use client';

import { useState } from 'react';

import { useParams } from 'next/navigation';

import { MainLayout } from '@/components/layout/main-layout';
import { ArtistPage } from '@/components/pages/artist-page';

export default function ArtistDetailPage() {
  const params = useParams();
  const artistId = params.id as string;

  const [user] = useState({
    id: 'demo-user',
    name: 'Usuario Demo',
    email: 'demo@spotify.com',
    isAdmin: true,
  });

  return (
    <MainLayout user={user}>
      <ArtistPage artistId={artistId} />
    </MainLayout>
  );
}
