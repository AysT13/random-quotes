import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
  verifyBeforeUpdateEmail,
  updatePassword,
  deleteUser,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

function getActionCodeSettings(nextPath = "/user/settings") {
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return {
    url: `${origin}${nextPath}?mode=verifyEmail`,
    handleCodeInApp: true,
  };
}

export async function resendVerificationEmail(nextPath = "/user/settings") {
  const u = auth.currentUser;
  if (!u) throw new Error("No user signed in.");
  await u.reload();
  await sendEmailVerification(u, getActionCodeSettings(nextPath));
}

export async function changeEmailWithVerification(
  newEmail: string,
  nextPath = "/user/settings"
) {
  const u = auth.currentUser;
  if (!u) throw new Error("No user signed in.");
  await verifyBeforeUpdateEmail(
    u,
    newEmail.trim(),
    getActionCodeSettings(nextPath)
  );
}

export async function reauthWithPassword(email: string, password: string) {
  const u = auth.currentUser;
  if (!u) throw new Error("No user signed in.");
  const cred = EmailAuthProvider.credential(email, password);
  await reauthenticateWithCredential(u, cred);
}

export async function changePassword(newPassword: string) {
  const u = auth.currentUser;
  if (!u) throw new Error("No user signed in.");
  await updatePassword(u, newPassword);
}

export async function removeAccount() {
  const u = auth.currentUser;
  if (!u) throw new Error("No user signed in.");
  await deleteUser(u);
}

export async function reloadAndGetFlags() {
  try {
    await auth.currentUser?.reload();
  } catch (e: any) {
    if (
      e?.code === "auth/user-token-expired" ||
      e?.code === "auth/invalid-user-token"
    ) {
      throw e;
    }
    throw e;
  }
  return {
    email: auth.currentUser?.email ?? "",
    verified: !!auth.currentUser?.emailVerified,
  };
}
