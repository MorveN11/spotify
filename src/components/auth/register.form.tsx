'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Password } from '@/components/ui/password';
import { Role } from '@/enums/role.enum';
import { useAuthActions } from '@/hooks/auth/use-auth-actions';
import { RegisterFormData, registerSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';

import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface Props {
  onToggleMode: () => void;
  registerRole?: Role;
}

export function RegisterForm({ onToggleMode, registerRole = Role.USER }: Props) {
  const { handleRegister } = useAuthActions({ registerRole });

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <Card className="border-gray-700 bg-gray-800/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-white">Crear Cuenta</CardTitle>
        <CardDescription className="text-gray-400">Únete a millones de usuarios en Spotify</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Nombre completo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Tu nombre"
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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Confirmar contraseña</FormLabel>
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
              Crear Cuenta
            </Button>
          </form>
        </Form>

        <div className="text-center">
          <p className="text-sm text-gray-400">
            ¿Ya tienes cuenta?{' '}
            <button onClick={onToggleMode} className="text-primary hover:underline">
              Inicia sesión
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
