"use client";
import { Title, align } from "./Title.jsx";
import { useContext, useState } from "react";
import { QuotesContext } from "../context/QuoteContext.js";

export default function QuoteCard() {
  const { quotes, currentIndex, next, likeCurrent } = useContext(QuotesContext);
  const current = quotes[currentIndex];

  if (!current) return null;

  const liked = (current.likeCount ?? 0) > 0;

  return (
    <div>
      <h2 className="font-bold text-2xl text-slate-700 text-center mb-5 p-4">
        Random Quotes
      </h2>

      <Title label={current.quote} align={align.center}></Title>

      <span className="text-end block text-slate-700 italic">
        {current.author}
      </span>

      <div className="flex justify-end gap-3">
        <button
          onClick={likeCurrent}
          disabled={liked}
          className={`rounded-lg p-2 mt-8 text-white
                 ${
                   liked
                     ? "bg-slate-500 cursor-not-allowed"
                     : "bg-slate-500 hover:bg-slate-600"
                 }`}
        >
          {liked
            ? `Liked (${current.likeCount})`
            : `Like (${current.likeCount})`}
        </button>

        <button
          onClick={next}
          className="rounded-lg p-2 mt-8  text-white
             bg-slate-600 hover:bg-slate-700
             dark:bg-slate-700 dark:hover:bg-slate-800"
        >
          Next Quote
        </button>
      </div>
    </div>
  );
}
