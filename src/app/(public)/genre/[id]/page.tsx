'use client';

import { useParams } from 'next/navigation';

import { GenrePage } from '@/components/pages/genre.page';

export default function Page() {
  const params = useParams();
  const genreId = params.id as string;

  return <GenrePage genreId={genreId} />;
}
