'use server';

import { Role } from '@/enums/role.enum';
import { firebaseAdmin } from '@/firebase/firebase.admin';

export async function setUserRole(uid: string, role: Role): Promise<void> {
  await firebaseAdmin.auth().setCustomUserClaims(uid, { role });
}
