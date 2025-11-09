"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/app/AuthProvider";
import { Title } from "@/components/Title";

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

    if (!quote.trim() || !author.trim()) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      await addDoc(collection(db, "quotes"), {
        text: quote.trim(),
        author: author.trim(),
        uid: user?.uid,
        createdAt: serverTimestamp(),
      });

      setSuccess("Quote added successfully!");
      setQuote("");
      setAuthor("");

      setTimeout(() => router.push("/quotes/manage"), 1000);
    } catch (err: any) {
      setError(err.message || "Error adding quote.");
    }
  }

  if (loading || !user) return null;

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gray-400 dark:bg-gray-700/70">
      <Card size="md" className="min-w-[300px] dark:bg-gray-900">
        <Title
          label="Add a New Quotes"
          align="center"
          className="text-slate-800 dark:text-slate-100 mb-3"
        />

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
      </Card>
    </div>
  );
}
