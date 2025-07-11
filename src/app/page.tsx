'use client';

import { AuthForm } from '@/components/auth/auth.form';
import { MainLayout } from '@/components/layout/main.layout';
import { HomePage } from '@/components/pages/home.page';
import { LoadingPage } from '@/components/pages/loading.page';
import { useAuth } from '@/contexts/auth.context';

export default function Page() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    return <AuthForm />;
  }

  return (
    <MainLayout user={user}>
      <HomePage />
    </MainLayout>
  );
}
