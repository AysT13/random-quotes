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

      <span className="text-end block text-slate-600 italic">
        {current.author}
      </span>

      <div className="flex justify-end gap-3">
        <button
          onClick={likeCurrent}
          disabled={liked}
          className={`bg-slate-400 rounded-lg p-2 mt-8 hover:bg-slate-500 
                ${liked ? "bg-slate-500" : ""}`}
        >
          {liked
            ? `Liked (${current.likeCount})`
            : `Like (${current.likeCount})`}
        </button>

        <button
          onClick={next}
          className="bg-slate-700 rounded-lg p-2 mt-8 hover:bg-slate-800"
        >
          Next Quote
        </button>
      </div>
    </div>
  );
}
