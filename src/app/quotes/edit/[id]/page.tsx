"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import { Title } from "@/components/Title";
import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditQuotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();

  const { id } = use(params);

  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDoc(doc(db, "quotes", id));
        if (!snap.exists()) return setError("Quote not found.");
        const data = snap.data() as any;
        setText(data.text ?? "");
        setAuthor(data.author ?? "");
      } catch (e: any) {
        setError(e?.message ?? "Failed to load quote.");
      }
    })();
  }, [id]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!text.trim() || !author.trim())
      return setError("Please fill in both fields.");
    try {
      await updateDoc(doc(db, "quotes", id), {
        text: text.trim(),
        author: author.trim(),
      });
      setSuccess("Quote updated successfully.");
      setTimeout(() => router.push("/quotes/manage"), 1000);
    } catch (e: any) {
      setError(e?.message ?? "Update failed.");
    }
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gray-400 dark:bg-gray-700/70">
      <Card
        size="md"
        className=" bg-gray-100 dark:border-slate-700 dark:bg-gray-900 min-w-[300px]"
      >
        <Title
          label="Edit Quote"
          align="center"
          className="text-slate-800 dark:text-slate-100 mb-3"
        />

        {!!error && (
          <Alert variant="destructive" className="mb-3">
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
        {!!success && (
          <Alert className="mb-3">
            <AlertTitle>{success}</AlertTitle>
          </Alert>
        )}

        <form onSubmit={handleSave} noValidate>
          <FormField
            id="quote"
            label="Quote Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <FormField
            id="author"
            label="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <Button
            type="submit"
            className="w-full my-4 bg-gray-400 hover:bg-gray-500 dark:bg-slate-700 dark:hover:bg-slate-800 text-base text-black dark:text-white"
          >
            Save Changes
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => router.push("/quotes/manage")}
          >
            Cancel
          </Button>
        </form>
      </Card>
    </div>
  );
}
