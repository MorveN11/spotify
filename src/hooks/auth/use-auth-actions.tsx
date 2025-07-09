import { useAuth } from '@/contexts/auth.context';
import { Role } from '@/enums/role.enum';
import { handleAsyncAction } from '@/lib/action.utils';
import { AuthProviderType } from '@/providers/auth.providers';
import { LoginFormData, RegisterFormData } from '@/schemas/auth.schema';
import { authService } from '@/services/auth.service';

interface Props {
  registerRole?: Role;
  loginWithProviderRole?: Role;
}

export const useAuthActions = ({ registerRole = Role.USER, loginWithProviderRole = Role.USER }: Props) => {
  const { refreshUser } = useAuth();

  const handleLogin = async (data: LoginFormData): Promise<void> => {
    await handleAsyncAction(() => authService.login(data), 'Inicio de sesión exitoso', true);
  };

  const handleLoginWithProvider = async (providerId: AuthProviderType): Promise<void> => {
    if (providerId === 'password') return;

    await handleAsyncAction(
      () => authService.loginWithProvider(providerId, loginWithProviderRole),
      'Inicio de sesión exitoso',
      true,
    );
  };

  const handleLogout = async (): Promise<void> => {
    await handleAsyncAction(() => authService.logout(), 'Sesión cerrada exitosamente', true);
  };

  const handleRegister = async (data: RegisterFormData): Promise<void> => {
    await handleAsyncAction(
      () => authService.register(data, registerRole),
      'Registro exitoso',
      true,
      async () => {
        await refreshUser();
      },
    );
  };

  return {
    handleLogin,
    handleLoginWithProvider,
    handleLogout,
    handleRegister,
  };
};
