#!/usr/bin/env tsx
import { Role } from '@/enums/role.enum';
import { firebaseAdmin } from '@/firebase/firebase.admin';

async function setupAdmin() {
  const userEmail = 'admin@admin.com';

  try {
    const user = await firebaseAdmin.auth().getUserByEmail(userEmail);

    await firebaseAdmin.auth().setCustomUserClaims(user.uid, { role: Role.ADMIN });

    console.log(`Admin role set for user: ${userEmail}`);
  } catch (error) {
    console.error('Error setting admin role:', error);
  }
}

setupAdmin();
