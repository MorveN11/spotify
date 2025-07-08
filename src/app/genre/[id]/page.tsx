'use client';

import { useState } from 'react';

import { useParams } from 'next/navigation';

import { MainLayout } from '@/components/layout/main-layout';
import { GenrePage } from '@/components/pages/genre-page';

export default function GenreDetailPage() {
  const params = useParams();
  const genreId = params.id as string;

  const [user] = useState({
    id: 'demo-user',
    name: 'Usuario Demo',
    email: 'demo@spotify.com',
    isAdmin: true,
  });

  return (
    <MainLayout user={user}>
      <GenrePage genreId={genreId} />
    </MainLayout>
  );
}
