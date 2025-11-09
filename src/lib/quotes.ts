import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export type Quote = {
  id?: string;
  text: string;
  author: string;
  ownerUid: string;
  validated?: boolean;
  createdAt?: Timestamp | null;
  updatedAt?: Timestamp | null;
};

export async function createQuote({
  text,
  author,
  uid,
}: {
  text: string;
  author: string;
  uid: string;
}) {
  const payload = {
    text: text.trim(),
    author: author.trim(),
    ownerUid: uid,
    validated: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  const ref = await addDoc(collection(db, "quotes"), payload);
  return ref.id;
}

export async function updateQuote(id: string, text: string, author: string) {
  await updateDoc(doc(db, "quotes", id), {
    text: text.trim(),
    author: author.trim(),
    updatedAt: serverTimestamp(),
  });
}

export async function deleteQuote(id: string) {
  await deleteDoc(doc(db, "quotes", id));
}

export async function listMyQuotes(uid: string) {
  const q = query(collection(db, "quotes"), where("ownerUid", "==", uid));
  const snap = await getDocs(q);
  const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Quote[];
  rows.sort(
    (a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0)
  );
  return rows;
}

export async function listPublicQuotes(limitCount = 100) {
  const q = query(
    collection(db, "quotes"),
    where("validated", "==", true),
    orderBy("createdAt", "desc"),
    limit(limitCount)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Quote[];
}

export async function listAllQuotes() {
  const q = query(collection(db, "quotes"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Quote[];
}

export async function setQuoteValidation(id: string, validated: boolean) {
  await updateDoc(doc(db, "quotes", id), {
    validated,
    updatedAt: serverTimestamp(),
  });
}

export async function approveQuote(id: string) {
  await setQuoteValidation(id, true);
}
