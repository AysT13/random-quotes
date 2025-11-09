"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/AuthProvider";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import { Title } from "@/components/Title";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { listAllQuotes, setQuoteValidation, Quote } from "@/lib/quotes";

export default function AdminQuotesPage() {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading) {
      if (!user) router.replace("/user/login");
      else if (!isAdmin) router.replace("/");
    }
  }, [user, isAdmin, loading, router]);

  useEffect(() => {
    async function load() {
      try {
        const data = await listAllQuotes();
        setQuotes(data);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load quotes.");
      }
    }
    if (user && isAdmin) load();
  }, [user, isAdmin]);

  async function toggleValidation(q: Quote) {
    if (!q.id) return;
    try {
      setBusyId(q.id);
      await setQuoteValidation(q.id, !q.validated);
      setQuotes((prev) =>
        prev.map((it) =>
          it.id === q.id ? { ...it, validated: !q.validated } : it
        )
      );
    } catch (e: any) {
      setError(e?.message ?? "Operation failed.");
    } finally {
      setBusyId(null);
    }
  }

  if (loading || !user || !isAdmin) return null;

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gray-400 dark:bg-gray-700/70 px-4">
      <Card size="md" className="w-full max-w-xl">
        <Title
          label="Admin • All Quotes"
          align="center"
          className="text-slate-100 dark:text-slate-800 mb-3"
        />

        {!!error && (
          <Alert variant="destructive" className="mb-3">
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}

        {quotes.length === 0 ? (
          <Alert className="mt-3 text-center dark:bg-slate-800">
            <AlertTitle>No quotes</AlertTitle>
          </Alert>
        ) : (
          <ul className="space-y-3">
            {quotes.map((q) => (
              <li
                key={q.id}
                className="rounded-lg border border-slate-300 dark:border-slate-700 p-3 bg-white dark:bg-slate-900"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">{q.text}</p>
                    <p className="text-sm text-slate-500 mt-1">— {q.author}</p>
                    <p className="text-xs mt-1 opacity-70">
                      owner: <code>{q.ownerUid}</code> • validated:{" "}
                      <strong
                        className={
                          q.validated ? "text-green-600" : "text-red-500"
                        }
                      >
                        {String(q.validated)}
                      </strong>
                    </p>
                  </div>
                  <div className="shrink-0">
                    <Button
                      type="button"
                      onClick={() => toggleValidation(q)}
                      disabled={busyId === q.id}
                      className={
                        q.validated ? "bg-yellow-500 hover:bg-yellow-600" : ""
                      }
                    >
                      {q.validated ? "Unvalidate" : "Validate"}
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
