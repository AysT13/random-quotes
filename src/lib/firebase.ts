import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

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

export async function createUser(
  email: string,
  userId: string
): Promise<FirestoreResponse> {
  try {
    const currentTime = new Date().toISOString();

    const docRef = await addDoc(collection(db, "users"), {
      email: email,
      userID: userId,
      createdAt: currentTime,
      updatedAt: currentTime,
    });
    console.log("Document written with ID: ", docRef.id);
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
