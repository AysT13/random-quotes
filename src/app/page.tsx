import Card from "../components/Card";
import QuoteCard from "../components/QuoteCard";
import AuthGuard from "@/components/AuthGuard";

export default function Home() {
  return (
    <AuthGuard>
      <main className="min-h-dvh flex items-center justify-center bg-gray-400 dark:bg-gray-600/70">
        <Card>
          <QuoteCard />
        </Card>
      </main>
    </AuthGuard>
  );
}
