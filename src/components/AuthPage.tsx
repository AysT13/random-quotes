"use client";

import { useState } from "react";
import Card from "@/components/Card";
import { Title } from "@/components/Title";
import FormField from "@/components/FormField";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

type AuthPageProps = {
  title: string;
  buttonText: string;
  onSubmit: (email: string, password: string) => Promise<void>;
  error?: string;
};

const emailRegex =
  /^(?=.{1,254}$)(?=.{1,64}@)[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/;

export default function AuthPage({
  title,
  buttonText,
  onSubmit,
  error,
}: AuthPageProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [localError, setLocalError] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      setLocalError("Please fill in email and password fields!");
      return;
    }
    if (!emailRegex.test(email)) {
      setLocalError("Please enter a valid email address");
      return;
    }
    if (password.length < 8) {
      setLocalError("Password must be at least 8 characters long!");
      return;
    }

    setLocalError("");

    try {
      await onSubmit(email, password);
    } catch (error: any) {
      setLocalError(error?.message ?? "Unknown error");
    }
  }

  const uiError = error || localError;
  return (
    <div className="min-h-dvh flex items-center justify-center  bg-gray-400 dark:bg-gray-700/70">
      <Card size="sm">
        <Title
          label={title}
          align="center"
          className="dark:text-slate-300 mb-3"
        />

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

          {uiError && (
            <Alert variant="destructive">
              <AlertTitle>{uiError}</AlertTitle>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full my-4
                    bg-gray-400 hover:bg-gray-500
                    dark:bg-slate-700 dark:hover:bg-slate-800 
                     text-base text-black dark:text-white"
          >
            {buttonText}
          </Button>
        </form>
      </Card>
    </div>
  );
}
