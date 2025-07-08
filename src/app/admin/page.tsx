'use client';

import { useState } from 'react';

import { AdminPanel } from '@/components/admin/admin-panel';
import { MainLayout } from '@/components/layout/main-layout';

export default function AdminPanelPage() {
  // Mock admin user - en producción esto vendría de tu estado global
  const [user] = useState({
    id: 'admin-user',
    name: 'Admin',
    email: 'admin@spotify.com',
    isAdmin: true,
  });

  return (
    <MainLayout user={user}>
      <AdminPanel />
    </MainLayout>
  );
}
