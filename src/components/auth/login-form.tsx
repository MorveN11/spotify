'use client';

import { useState } from 'react';

import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { LoginFormData, loginSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';

import { Chrome, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface LoginFormProps {
  onToggleMode: () => void;
  onSuccess?: () => void;
}

export function LoginForm({ onToggleMode, onSuccess }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Error al iniciar sesión', {
          description: 'Credenciales inválidas',
        });
      } else {
        toast.success('¡Bienvenido de vuelta!');
        onSuccess?.();
      }
    } catch (_error) {
      toast.error('Error inesperado', {
        description: 'Intenta nuevamente',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn('google', { redirect: false });
      toast.success('¡Bienvenido!');
      onSuccess?.();
    } catch (_error) {
      toast.error('Error al iniciar sesión con Google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-gray-800 bg-gray-900">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-white">Iniciar Sesión</CardTitle>
        <p className="text-gray-400">Accede a tu cuenta de Spotify</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          variant="outline"
          className="w-full border-gray-700 bg-transparent text-white hover:bg-gray-800"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          <Chrome className="mr-2 h-4 w-4" />
          Continuar con Google
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full bg-gray-700" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-gray-900 px-2 text-gray-400">O</span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="tu@email.com"
                      type="email"
                      className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="••••••••"
                        type={showPassword ? 'text' : 'password'}
                        className="border-gray-700 bg-gray-800 pr-10 text-white placeholder:text-gray-500"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-0 right-0 h-full px-3 text-gray-400 hover:text-white"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Iniciar Sesión
            </Button>
          </form>
        </Form>

        <div className="text-center">
          <p className="text-sm text-gray-400">
            ¿No tienes cuenta?{' '}
            <button onClick={onToggleMode} className="text-primary hover:underline">
              Regístrate
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
