'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { Role } from '@/enums/role.enum';
import { auth } from '@/firebase/firebase.app';
import { User } from '@/types/user.type';

import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';

interface AuthContextType {
  user: User;
  isLoading: boolean;
  isAuthenticated: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }

  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>({} as User);
  const [isLoading, setIsLoading] = useState(true);

  const updateUserState = useCallback(async (currentUser: FirebaseUser | null) => {
    if (currentUser) {
      const idTokenResult = await currentUser.getIdTokenResult();

      setUser({
        uid: currentUser.uid,
        email: currentUser.email || '',
        displayName: currentUser.displayName || '',
        isAdmin: idTokenResult.claims.role === Role.ADMIN,
      });
    } else {
      setUser({} as User);
    }

    setIsLoading(false);
  }, []);

  const refreshUser = useCallback(async () => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      updateUserState(currentUser);
      unsubscribe();
    });
  }, [updateUserState]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, updateUserState);
    return () => unsubscribe();
  }, [updateUserState]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user.uid,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
