"use client";
import AuthButton from "@/components/AuthButton";
import AuthCard from "@/components/AuthCard";
import AuthTitle from "@/components/AuthTitle";
import FormField from "@/components/FormField";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/AuthProvider";
import { useRouter } from "next/navigation";
import { getUIErrorFromFirebaseError } from "@/lib/firebase";
import { Alert, AlertTitle } from "@/components/ui/alert";

export default function LoginPage() {
  const router = useRouter();
  const { user, login, error: firebaseError } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (user?.email) router.replace("/");
  }, [user, router]);

  useEffect(() => {
    if (!!firebaseError) {
      const uiError = getUIErrorFromFirebaseError(firebaseError.code);

      setError(uiError);
    }
  }, [firebaseError]);

  const emailRegex =
    /^(?=.{1,254}$)(?=.{1,64}@)[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in email and password fields!");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long!");
      return;
    }

    setError("");
    try {
      await login(email, password);
      setPassword("");
      setEmail("");
      router.replace("/");
    } catch {}
  }

  return (
    <AuthCard>
      <AuthTitle>Log In</AuthTitle>
      <form noValidate onSubmit={handleSubmit}>
        <FormField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {!!error ? (
          <Alert variant="destructive">
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        ) : (
          <></>
        )}

        <AuthButton label="Log In" />
      </form>
    </AuthCard>
  );
}
