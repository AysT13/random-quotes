"use client";

import { createContext, useState, ReactNode, useEffect } from "react";
import { useAuth } from "@/app/AuthProvider";
import { listAllQuotes, listPublicQuotes } from "@/lib/quotes";
import { quotes as initialQuotes, Quote } from "../../quotes";

export const QuotesContext = createContext<{
  quotes: Quote[];
  currentIndex: number;
  next: () => void;
  likeCurrent: () => void;
} | null>(null);

export function QuotesProvider({ children }: { children: ReactNode }) {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { loading, isAdmin, user } = useAuth();

  useEffect(() => {
    let alive = true;

    async function load() {
      const rows = isAdmin ? await listAllQuotes() : await listPublicQuotes();

      const fromDb: Quote[] = rows.map((r: any) => ({
        quote: r.text ?? "",
        author: r.author ?? "",
        likeCount: 0,
      }));

      const merged = [...initialQuotes, ...fromDb];

      if (alive) {
        setQuotes(merged.length ? merged : initialQuotes);
        setCurrentIndex(0);
      }
    }

    if (!loading) load();
    return () => {
      alive = false;
    };
  }, [loading, isAdmin]);

  const next = () =>
    setCurrentIndex((prev) => (quotes.length ? (prev + 1) % quotes.length : 0));

  const likeCurrent = () => {
    setQuotes((prev) => {
      if (prev.length === 0) return prev;
      const copy = [...prev];
      copy[currentIndex] = {
        ...copy[currentIndex],
        likeCount: (copy[currentIndex].likeCount ?? 0) + 1,
      };
      return copy;
    });
  };

  return (
    <QuotesContext.Provider value={{ quotes, currentIndex, next, likeCurrent }}>
      {children}
    </QuotesContext.Provider>
  );
}
