'use client';

import { redirect } from 'next/navigation';

import { MainLayout } from '@/components/layout/main.layout';
import { LoadingPage } from '@/components/pages/loading.page';
import { useAuth } from '@/contexts/auth.context';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!isAuthenticated || !user.isAdmin) {
    redirect('/');
  }

  return <MainLayout user={user}>{children}</MainLayout>;
}
