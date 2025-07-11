import { createEnv } from '@t3-oss/env-nextjs';

import { z } from 'zod';

export const env = createEnv({
  client: {
    NEXT_PUBLIC_BASE_URL: z
      .string()
      .url({
        message: 'Invalid public base URL',
      })
      .default('http://localhost:3000'),
    NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1).default(''),
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().min(1).default(''),
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1).default(''),
    NEXT_PUBLIC_FIREBASE_DATABASE_URL: z.string().min(1).default(''),
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().min(1).default(''),
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1).default(''),
    NEXT_PUBLIC_FIREBASE_APP_ID: z.string().min(1).default(''),
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: z.string().min(1).default(''),
  },
  runtimeEnv: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_DATABASE_URL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  },
});
