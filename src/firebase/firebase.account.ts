import { env as clientEnv } from '@/config/env/client.env';
import { env as serverEnv } from '@/config/env/server.env';

import { ServiceAccount } from 'firebase-admin';

export const firebaseAccount: ServiceAccount = {
  projectId: clientEnv.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: serverEnv.FIREBASE_CLIENT_EMAIL,
  privateKey: serverEnv.FIREBASE_PRIVATE_KEY,
};
