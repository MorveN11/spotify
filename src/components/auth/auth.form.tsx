'use client';

import { useState } from 'react';

import Image from 'next/image';

import { LoginForm } from '@/components/auth/login.form';
import { RegisterForm } from '@/components/auth/register.form';

export function AuthForm() {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
            <Image
              src="/logo.webp"
              alt="Logo de Spotify"
              fill
              className="rounded-full object-contain"
              sizes="(max-width: 768px) 50px, (max-width: 1200px) 60px, 70px"
            />
          </div>
          <h1 className="text-3xl font-bold text-white">Spotify</h1>
          <p className="text-gray-400">Tu música, en todas partes</p>
        </div>

        {isLoginMode ? <LoginForm onToggleMode={toggleMode} /> : <RegisterForm onToggleMode={toggleMode} />}
      </div>
    </div>
  );
}
