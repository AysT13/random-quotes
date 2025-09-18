import { Title, align } from "./Title.jsx";

export default function QuoteCard({
  quote,
  author,
  likeCount,
  onLike,
  onNext,
}) {
  const liked = likeCount > 0;
  return (
    <div>
      <h2 className="font-bold text-2xl text-slate-700 text-center mb-5 p-4">
        Random Quotes
      </h2>

      <Title label={quote} align={align.center}></Title>

      <span className="text-end block text-slate-600 italic">{author}</span>

      <div className="flex justify-end gap-3">
        <button
          onClick={onLike}
          disabled={liked}
          className={`bg-slate-400 rounded-lg p-2 mt-8 hover:bg-slate-500 
                ${liked ? "bg-slate-500" : ""}`}
        >
          {liked ? `Liked (${likeCount})` : `Like (${likeCount})`}
        </button>

        <button
          onClick={onNext}
          className="bg-slate-700 rounded-lg p-2 mt-8 hover:bg-slate-800"
        >
          Next Quote
        </button>
      </div>
    </div>
  );
}
