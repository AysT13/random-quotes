"use client";

import { useEffect } from "react";
import { useAuth } from "@/app/AuthProvider";
import { useRouter } from "next/navigation";
import { getUIErrorFromFirebaseError } from "@/lib/firebase";
import AuthPage from "@/components/AuthPage";

export default function SignUpPage() {
  const { user, register, error: firebaseError } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.email) router.replace("/");
  }, [user, router]);

  const uiError = firebaseError
    ? getUIErrorFromFirebaseError(firebaseError.code)
    : "";

  return (
    <AuthPage
      title="Sign Up"
      buttonText="Sign Up"
      error={uiError}
      onSubmit={async (email, password) => {
        await register(email, password);
        router.replace("/");
      }}
    />
  );
}
