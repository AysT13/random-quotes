"use client";
import AuthButton from "@/components/AuthButton";
import AuthCard from "@/components/AuthCard";
import AuthTitle from "@/components/AuthTitle";
import FormField from "@/components/FormField";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/AuthProvider";
import { redirect } from "next/navigation";
import { getUIErrorFromFirebaseError } from "@/lib/firebase";
import { Alert, AlertTitle } from "@/components/ui/alert";

export default function SignUpPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { user, register, error: firebaseError } = useAuth();

  useEffect(() => {
    if (user?.email) {
      redirect("/");
    }
  }, [user]);

  useEffect(() => {
    if (!!firebaseError) {
      const uiError = getUIErrorFromFirebaseError(firebaseError.code);

      setError(uiError);
    }
  }, [firebaseError]);

  const emailRegex =
    /^(?=.{1,254}$)(?=.{1,64}@)[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email && !password) {
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
    register(email, password);
    setEmail("");
    setPassword("");
  }

  return (
    <AuthCard>
      <AuthTitle>Sign Up</AuthTitle>
      <form noValidate onSubmit={handleSubmit}>
        <FormField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* value={email} onChange={(e)=>setEmail(e.target.value)}  defaultValue={password} */}

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

        <AuthButton label="Sign Up" />
      </form>
    </AuthCard>
  );
}
