import { env as clientEnv } from '@/config/env/client.env';
import { firebaseAccount } from '@/firebase/firebase.account';

import admin from 'firebase-admin';

export function getFirebaseAdmin() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(firebaseAccount),
      databaseURL: clientEnv.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    });
  }

  return admin;
}

export const firebaseAdmin = getFirebaseAdmin();
