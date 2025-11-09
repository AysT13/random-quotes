import Card from "../components/Card";
import QuoteCard from "../components/QuoteCard";

export default function Home() {
  return (
    <main className="min-h-dvh flex items-center justify-center bg-gray-400 dark:bg-gray-700/70">
      <Card>
        <QuoteCard />
      </Card>
    </main>
  );
}
