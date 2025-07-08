'use client';

import { useState } from 'react';

import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';

interface AuthFormProps {
  onSuccess?: () => void;
}

export function AuthForm({ onSuccess }: AuthFormProps) {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-900 via-black to-gray-900 p-4">
      <div className="w-full max-w-md">
        {isLoginMode ? (
          <LoginForm onToggleMode={toggleMode} onSuccess={onSuccess} />
        ) : (
          <RegisterForm onToggleMode={toggleMode} onSuccess={onSuccess} />
        )}
      </div>
    </div>
  );
}
