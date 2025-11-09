"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/app/AuthProvider";
import { Title } from "@/components/Title";
import { createQuote } from "@/lib/quotes";

export default function AddQuotePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetAlerts = () => {
    setError("");
    setSuccess("");
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/user/login");
    }
  }, [user, loading, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    resetAlerts();

    if (!quote.trim() || !author.trim())
      return setError("Please fill in both fields.");
    if (!user?.uid) return setError("You must be signed in.");

    try {
      await createQuote({ text: quote, author, uid: user.uid });
      setSuccess("Quote added successfully!");
      setQuote("");
      setAuthor("");
      setTimeout(() => router.push("/quotes/manage"), 800);
    } catch (err: any) {
      setError(err?.message || "Error adding quote.");
    }
  }

  if (loading || !user) return null;

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gray-400 dark:bg-gray-700/70 px-4">
      <Card size="md" className="w-full max-w-xl dark:bg-gray-300">
        <Title
          label="Add a New Quote"
          align="center"
          className="text-slate-100 dark:text-slate-800 mb-3"
        />
        <div
          className="rounded-lg border border-slate-300 dark:border-slate-700 p-3 
                           bg-gray-100 dark:bg-slate-900"
        >
          <form onSubmit={handleSubmit} noValidate>
            <FormField
              id="quote"
              label="Quote Text"
              value={quote}
              onChange={(e) => {
                if (error || success) resetAlerts();
                setQuote(e.target.value);
              }}
            />
            <FormField
              id="author"
              label="Author"
              value={author}
              onChange={(e) => {
                if (error || success) resetAlerts();
                setAuthor(e.target.value);
              }}
            />

            {!!error ? (
              <Alert variant="destructive">
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            ) : null}
            {!!success ? (
              <Alert>
                <AlertTitle>{success}</AlertTitle>
              </Alert>
            ) : null}

            <Button
              type="submit"
              className="w-full my-4 bg-gray-400 hover:bg-gray-500 dark:bg-slate-700 dark:hover:bg-slate-800 text-base text-black dark:text-white"
            >
              Save Quote
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
