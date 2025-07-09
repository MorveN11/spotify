import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';

export const authProviders = {
  password: EmailAuthProvider,
  'google.com': new GoogleAuthProvider().setCustomParameters({ prompt: 'select_account' }),
};

export type AuthProviderType = keyof typeof authProviders;

export const authProviderInfo: Record<AuthProviderType, { name: string; providerId: AuthProviderType }> = {
  password: {
    name: 'Password',
    providerId: 'password',
  },
  'google.com': {
    name: 'Google',
    providerId: 'google.com',
  },
};
