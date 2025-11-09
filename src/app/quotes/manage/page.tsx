"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/AuthProvider";
import { listMyQuotes, deleteQuote, Quote } from "@/lib/quotes";
import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Title } from "@/components/Title";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

export default function ManageQuotesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");
  const [confirmId, setConfirmId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (user?.uid) {
        try {
          const data = await listMyQuotes(user.uid);
          setQuotes(data);
        } catch (err: any) {
          setError(err.message);
        }
      }
    }
    if (!loading && user) load();
  }, [user, loading]);

  if (loading || !user) return null;

  async function handleDeleteConfirmed() {
    if (!confirmId) return;
    try {
      await deleteQuote(confirmId);
      setQuotes((prev) => prev.filter((q) => q.id !== confirmId));
      setSuccess("Quote deleted.");
      setConfirmId(null);
      setTimeout(() => setSuccess(""), 1200);
    } catch (err: any) {
      setError(err.message || "Failed to delete.");
    }
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gray-400 dark:bg-gray-700/70 px-4">
      <Card size="md" className="w-full max-w-xl dark:bg-gray-300">
        <Title
          label="Manage Quotes"
          align="center"
          className="text-slate-100 dark:text-slate-800 mb-3"
        />

        {!!error && (
          <Alert variant="destructive" className="mb-3">
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
        {!!success && (
          <Alert className="mb-3">
            <AlertTitle>{success}</AlertTitle>
          </Alert>
        )}

        {quotes.length === 0 ? (
          <Alert className="mt-3 text-center dark:bg-slate-800">
            <AlertTitle>You don’t have any quotes yet.</AlertTitle>
          </Alert>
        ) : (
          <ul className="mt-3 space-y-3">
            {quotes.map((q) => (
              <li
                key={q.id}
                className="rounded-lg border border-slate-300 dark:border-slate-700 p-3 
                           bg-gray-100 dark:bg-slate-900"
              >
                <p className="font-medium text-slate-800 dark:text-slate-100">
                  {q.text}
                </p>
                <p className="text-sm text-slate-500 mt-1">— {q.author}</p>

                <div className="mt-3 flex gap-2">
                  <Button
                    type="button"
                    className="px-3 py-2 rounded-lg bg-gray-400 hover:bg-gray-500 
               dark:bg-slate-700 dark:hover:bg-slate-800 text-black dark:text-white text-sm"
                    onClick={() => router.push(`/quotes/edit/${q.id}`)}
                  >
                    Edit
                  </Button>

                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => setConfirmId(q.id ?? null)}
                  >
                    Delete
                  </Button>
                </div>

                {confirmId === q.id && (
                  <div className="mt-3">
                    <Alert variant="destructive">
                      <AlertTitle className="mb-2">
                        Are you sure you want to delete this quote?
                      </AlertTitle>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          className="bg-gray-400 hover:bg-gray-500 text-black dark:bg-slate-700 dark:hover:bg-slate-800 dark:text-white"
                          onClick={() => setConfirmId(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={handleDeleteConfirmed}
                        >
                          Yes, Delete
                        </Button>
                      </div>
                    </Alert>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
