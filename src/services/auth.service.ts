import { setUserRole } from '@/actions/firebase/firebase.actions';
import { Role } from '@/enums/role.enum';
import { AuthErrorCode, CustomAuthError, handleAuthError } from '@/errors/auth.errors';
import { auth } from '@/firebase/firebase.app';
import { AuthProviderType, authProviders } from '@/providers/auth.providers';
import { LoginFormData, RegisterFormData } from '@/schemas/auth.schema';
import { userSchema } from '@/schemas/user.schema';
import { ApiResponse, errorResponse, successResponse } from '@/types/api.type';
import { User } from '@/types/user.type';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';

export class AuthService {
  public async login(data: LoginFormData): Promise<ApiResponse<User>> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);

      const { user } = userCredential;

      const idTokenResult = await user.getIdTokenResult();

      const loggedUser = userSchema.safeParse({
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        isAdmin: idTokenResult.claims.role === Role.ADMIN,
      });

      if (!loggedUser.success) {
        throw new CustomAuthError(AuthErrorCode.USER_DATA_PARSE_ERROR);
      }

      return successResponse(loggedUser.data);
    } catch (error) {
      return errorResponse(handleAuthError(error));
    }
  }

  public async register(data: RegisterFormData, role: Role): Promise<ApiResponse<User>> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: data.displayName,
      });

      await setUserRole(user.uid, role);

      await user.reload();

      const currentUser = auth.currentUser;

      if (!currentUser) {
        throw new CustomAuthError(AuthErrorCode.USER_NOT_FOUND);
      }

      const idTokenResult = await currentUser.getIdTokenResult();

      const createdUser = userSchema.safeParse({
        uid: currentUser.uid,
        email: currentUser.email || '',
        displayName: currentUser.displayName || '',
        isAdmin: idTokenResult.claims.role === Role.ADMIN,
      });

      if (!createdUser.success) {
        throw new CustomAuthError(AuthErrorCode.USER_DATA_PARSE_ERROR);
      }

      return successResponse(createdUser.data);
    } catch (error) {
      return errorResponse(handleAuthError(error));
    }
  }

  public async loginWithProvider(providerId: AuthProviderType): Promise<ApiResponse<User>> {
    try {
      if (providerId === 'password') {
        throw new CustomAuthError(AuthErrorCode.PROVIDER_NOT_SUPPORTED);
      }

      const provider = authProviders[providerId];

      const userCredential = await signInWithPopup(auth, provider);

      const { user } = userCredential;

      const idTokenResult = await user.getIdTokenResult();

      const loggedUser = userSchema.safeParse({
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        isAdmin: idTokenResult.claims.role === Role.ADMIN,
      });

      if (!loggedUser.success) {
        throw new CustomAuthError(AuthErrorCode.USER_DATA_PARSE_ERROR);
      }

      return successResponse(loggedUser.data);
    } catch (error) {
      return errorResponse(handleAuthError(error));
    }
  }

  public async logout(): Promise<ApiResponse> {
    try {
      await signOut(auth);

      return successResponse();
    } catch (error) {
      return errorResponse(handleAuthError(error));
    }
  }
}
