"use client";

import { useEffect } from "react";
import { useAuth } from "@/app/AuthProvider";
import { useRouter } from "next/navigation";
import { getUIErrorFromFirebaseError } from "@/lib/firebase";
import AuthPage from "@/components/AuthPage";

export default function LoginPage() {
  const router = useRouter();
  const { user, login, error: firebaseError } = useAuth();

  useEffect(() => {
    if (user?.email) router.replace("/");
  }, [user, router]);

  const uiError = firebaseError
    ? getUIErrorFromFirebaseError(firebaseError.code)
    : "";

  return (
    <AuthPage
      title="Login"
      buttonText="Login"
      error={uiError}
      onSubmit={async (email, password) => {
        await login(email, password);
        router.replace("/");
      }}
    />
  );
}
