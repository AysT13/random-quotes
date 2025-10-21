import Card from "../components/Card.jsx";
import QuoteCard from "../components/QuoteCard.jsx";

export default function Home() {
  return (
    <main className="min-h-dvh flex items-center justify-center bg-gray-400 dark:bg-gray-600/70">
      <Card>
        <QuoteCard />
      </Card>
    </main>
  );
}
