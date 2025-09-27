
import Card from "../components/Card.jsx";
import QuoteCard from "../components/QuoteCard.jsx";

export default function Home() {
  return (
    <main className="min-h-dvh flex items-center justify-center bg-slate-600">
      <Card>
        <QuoteCard />
      </Card>
    </main>
  );
}
