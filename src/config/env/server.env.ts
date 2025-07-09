import { createEnv } from '@t3-oss/env-nextjs';

import z from 'zod';

export const env = createEnv({
  server: {
    FIREBASE_CLIENT_EMAIL: z.string().min(1).default(''),
    FIREBASE_PRIVATE_KEY: z.string().min(1).default(''),
  },
  runtimeEnv: {
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  },
});
