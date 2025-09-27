"use client";

import { quotes as initialQuotes } from "../../quotes.js";

import { createContext, useState } from "react";

export const QuotesContext = createContext(null);

export function QuotesProvider({ children }) {
  const [quotes, setQuotes] = useState(initialQuotes);

  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (quotes.length ? (prev + 1) % quotes.length : 0));
  };

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
