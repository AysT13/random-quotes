import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export type Quote = {
  id?: string;
  text: string;
  author: string;
  uid: string;
  createdAt?: Timestamp | null;
};

export async function addQuote(text: string, author: string, uid: string) {
  if (!text.trim()) throw new Error("Quote text is required");
  await addDoc(collection(db, "quotes"), {
    text: text.trim(),
    author: author.trim(),
    uid,
    createdAt: serverTimestamp(),
  });
}

export async function updateQuote(id: string, text: string, author: string) {
  await updateDoc(doc(db, "quotes", id), {
    text: text.trim(),
    author: author.trim(),
  });
}

export async function deleteQuote(id: string) {
  await deleteDoc(doc(db, "quotes", id));
}

export function listenQuotes(cb: (quotes: Quote[]) => void) {
  const q = query(collection(db, "quotes"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    const data: Quote[] = snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<Quote, "id">),
    }));
    cb(data);
  });
}
