'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AuthFormProps {
  onLogin?: (email: string, password: string) => void;
  onRegister?: (email: string, password: string, name: string) => void;
}

export function AuthForm({ onLogin, onRegister }: AuthFormProps) {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin?.(loginData.email, loginData.password);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    onRegister?.(registerData.email, registerData.password, registerData.name);
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

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800">
            <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Iniciar Sesión
            </TabsTrigger>
            <TabsTrigger value="register" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Registrarse
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="border-gray-700 bg-gray-800/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white">Iniciar Sesión</CardTitle>
                <CardDescription className="text-gray-400">Accede a tu cuenta de Spotify</CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="tu@email.com"
                      className="border-gray-600 bg-gray-900 text-white"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-white">
                      Contraseña
                    </Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Tu contraseña"
                      className="border-gray-600 bg-gray-900 text-white"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter className="mt-4 flex flex-col space-y-4">
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Iniciar Sesión
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card className="border-gray-700 bg-gray-800/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white">Crear Cuenta</CardTitle>
                <CardDescription className="text-gray-400">Únete a millones de usuarios en Spotify</CardDescription>
              </CardHeader>
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name" className="text-white">
                      Nombre completo
                    </Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Tu nombre completo"
                      className="border-gray-600 bg-gray-900 text-white"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="tu@email.com"
                      className="border-gray-600 bg-gray-900 text-white"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-white">
                      Contraseña
                    </Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Tu contraseña"
                      className="border-gray-600 bg-gray-900 text-white"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm" className="text-white">
                      Confirmar contraseña
                    </Label>
                    <Input
                      id="register-confirm"
                      type="password"
                      placeholder="Confirma tu contraseña"
                      className="border-gray-600 bg-gray-900 text-white"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter className="mt-4 flex flex-col space-y-4">
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Crear Cuenta
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
