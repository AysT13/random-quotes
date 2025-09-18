
"use client";

import { quotes as initialQuotes } from "../../quotes.js";
import { useState } from "react";
import Card from "../components/Card.jsx";
import QuoteCard from "../components/QuoteCard.jsx";

export default function Home() {
  const [quotes, setQuotes] = useState(initialQuotes);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const current = quotes[currentQuoteIndex];

  function handleNext() {
    setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
  }

  function handleLike() {
    setQuotes((prev) => {
      const updated = [...prev];
      updated[currentQuoteIndex] = {
        ...updated[currentQuoteIndex],
        likeCount: updated[currentQuoteIndex].likeCount + 1,
      };
      return updated;
    });
  }

  return (
    <main className="min-h-dvh flex items-center justify-center bg-slate-600">
      <Card>
        <QuoteCard
          quote={current.quote}
          author={current.author}
          likeCount={current.likeCount}
          onLike={handleLike}
          onNext={handleNext}
        />
      </Card>
    </main>
  );
}
