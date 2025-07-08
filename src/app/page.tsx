'use client';

import { useState } from 'react';

import { AuthForm } from '@/components/auth/auth-form';
import { MainLayout } from '@/components/layout/main-layout';
import { HomePage } from '@/components/pages/home-page';

export default function Page() {
  const [user, setUser] = useState<any>(null);

  const mockUser = {
    id: 'demo-user',
    name: 'Usuario Demo',
    email: 'demo@spotify.com',
    isAdmin: true,
  };

  const handleAuthSuccess = () => {
    setUser(mockUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (user) {
    return <AuthForm onSuccess={handleAuthSuccess} />;
  }

  return (
    <MainLayout user={user} onLogout={handleLogout}>
      <HomePage />
    </MainLayout>
  );
}
