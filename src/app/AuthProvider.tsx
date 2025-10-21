"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { createUser } from "@/lib/firebase";

type AuthError = { code: string; message: string } | null;

type AuthContextType = {
  user: User | null;
  error: AuthError;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<AuthError>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setUser(fbUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const register = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUser(user);
      setError(null);

      await createUser(email, user.uid);
    } catch (error: any) {
      const e = error as { code?: string; message?: string };
      setError({
        code: e.code ?? "auth/unknown",
        message: e.message ?? "Unknown error",
      });
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
    } catch (error: any) {
      const e = error as { code?: string; message?: string };
      setError({
        code: e.code ?? "auth/unknown",
        message: e.message ?? "Unknown error",
      });
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, error, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
