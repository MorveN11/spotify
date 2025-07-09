'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Password } from '@/components/ui/password';
import { useAuthActions } from '@/hooks/auth/use-auth-actions';
import { LoginFormData, loginSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';

import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface Props {
  onToggleMode: () => void;
}

export function LoginForm({ onToggleMode }: Props) {
  const { handleLogin } = useAuthActions({});

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
