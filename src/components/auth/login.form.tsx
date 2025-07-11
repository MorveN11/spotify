'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Password } from '@/components/ui/password';
import { Role } from '@/enums/role.enum';
import { useAuthActions } from '@/hooks/auth/use-auth-actions';
import { LoginFormData, loginSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';

import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface Props {
  onToggleMode: () => void;
  loginWithProviderRole?: Role;
}

export function LoginForm({ onToggleMode, loginWithProviderRole = Role.USER }: Props) {
  const { handleLogin, handleLoginWithProvider } = useAuthActions({ loginWithProviderRole });

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Card className="border-gray-700 bg-gray-800/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-white">Iniciar Sesión</CardTitle>
        <CardDescription className="text-gray-400">Accede a tu cuenta de Spotify</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
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
                    <Password
                      className="border-gray-700 bg-gray-800 pr-10 text-white placeholder:text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Iniciar Sesión
            </Button>
          </form>
        </Form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-700" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-gray-800 px-2 text-gray-400">O continúa con</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full border-gray-700 bg-transparent text-white hover:bg-gray-700/50"
          onClick={() => {
            handleLoginWithProvider('google.com');
          }}
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continuar con Google
        </Button>

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
