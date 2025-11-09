import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const getUIErrorFromFirebaseError = (firebaseErrorCode: string) => {
  switch (firebaseErrorCode) {
    case "auth/email-already-in-use":
      return "This email address is already in use!";

    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Wrong email or password.";

    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/weak-password":
      return "Password should be at least 8 characters long.";

    default:
      return "An error occurred. Please try again.";
  }
};

interface FirestoreResponse {
  success: boolean;
  error?: { code: string; message: string };
}

export interface FirebaseError {
  code: string;
  error?: string;
}

export interface UpdateUserPayload {
  uid: string;
  firstname?: string;
  lastname?: string;
}

export async function createUser(
  email: string,
  userId: string
): Promise<FirestoreResponse> {
  try {
    const currentTime = new Date().toISOString();

    await setDoc(
      doc(db, "users", userId),
      {
        email: email,
        userID: userId,
        theme: "system",
        createdAt: currentTime,
        updatedAt: currentTime,
      },
      { merge: true }
    );

    console.log("User doc written for UID: ", userId);
    return { success: true };
  } catch (e) {
    if (typeof e === "object" && e !== null && "code" in e && "message" in e) {
      return {
        success: false,
        error: { code: (e as any).code, message: (e as any).message },
      };
    }
    return {
      success: false,
      error: { code: "unknown", message: "An unknown error occurred" },
    };
  }
}

export async function UpdateUser(
  user: UpdateUserPayload
): Promise<FirestoreResponse> {
  const { uid: userID, firstname, lastname } = user;

  try {
    const currentTime = new Date().toISOString();

    await setDoc(
      doc(db, "users", userID),
      {
        userID: userID,
        createdAt: currentTime,
        updatedAt: currentTime,
        firstname,
        lastname,
      },
      { merge: true }
    );

    console.log("Document updated for ID: ", userID);
    return { success: true };
  } catch (e) {
    if (typeof e === "object" && e !== null && "code" in e && "message" in e) {
      return {
        success: false,
        error: { code: (e as any).code, message: (e as any).message },
      };
    }
    return {
      success: false,
      error: { code: "unknown", message: "An unknown error occurred" },
    };
  }
}

export async function getUserDoc(uid: string) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
}

export async function updateUserTheme(
  uid: string,
  theme: "light" | "dark" | "system"
): Promise<void> {
  await setDoc(
    doc(db, "users", uid),
    { theme, updatedAt: new Date().toISOString() },
    { merge: true }
  );
}
