"use client";

import { quotes as initialQuotes, Quote } from "../../quotes";
import { createContext, useState, ReactNode } from "react";

export const QuotesContext = createContext<{
  quotes: Quote[];
  currentIndex: number;
  next: () => void;
  likeCurrent: () => void;
} | null>(null);

export function QuotesProvider({ children }: { children: ReactNode }) {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);

  const [currentIndex, setCurrentIndex] = useState<number>(0);

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
