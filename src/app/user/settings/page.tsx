"use client";

import Card from "@/components/Card";
import { Title } from "@/components/Title";
import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/AuthProvider";
import { auth } from "@/lib/firebase";
import {
  updateEmail as fbUpdateEmail,
  updatePassword as fbUpdatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
} from "firebase/auth";

type Tab = "email" | "password" | "delete";

export default function Setting() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const [tab, setTab] = useState<Tab>("email");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const currentEmail = user?.email ?? "";
  const [currentPassword, setCurrentPassword] = useState("");
  const [newEmail, setNewEmail] = useState(currentEmail);
  const [newPassword, setNewPassword] = useState("");

  const resetAlerts = () => {
    setError("");
    setSuccess("");
  };

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/user/login");
    }
  }, [loading, user, router]);

  if (loading || !user) return null;

  async function handleEmailUpdate(e: React.FormEvent) {
    e.preventDefault();
    resetAlerts();

    if (!auth.currentUser) return setError("No user signed in.");
    if (!newEmail.trim()) return setError("Please enter a new email address.");

    try {
      if (currentEmail && currentPassword) {
        const credential = EmailAuthProvider.credential(
          currentEmail,
          currentPassword
        );
        await reauthenticateWithCredential(auth.currentUser, credential);
      }
      await fbUpdateEmail(auth.currentUser, newEmail.trim());
      setSuccess("Email updated successfully.");
    } catch (err: any) {
      setError(err.message ?? "Email update failed.");
    }
  }

  async function handlePasswordUpdate(e: React.FormEvent) {
    e.preventDefault();
    resetAlerts();

    if (!auth.currentUser) return setError("No user signed in.");
    if (!currentPassword.trim() || !newPassword.trim())
      return setError("Please enter both current and new password.");

    try {
      const credential = EmailAuthProvider.credential(
        currentEmail,
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      await fbUpdatePassword(auth.currentUser, newPassword.trim());
      setSuccess("Password updated successfully.");
      setNewPassword("");
      setCurrentPassword("");
    } catch (err: any) {
      setError(err.message ?? "Password update failed.");
    }
  }

  async function handleDelete() {
    resetAlerts();
    if (!auth.currentUser) return;

    if (!confirm("Are you sure you want to delete your account?")) return;

    try {
      if (currentEmail && currentPassword) {
        const credential = EmailAuthProvider.credential(
          currentEmail,
          currentPassword
        );
        await reauthenticateWithCredential(auth.currentUser, credential);
      }
      await deleteUser(auth.currentUser);
      setSuccess("Account deleted successfully.");
      logout();
    } catch (err: any) {
      setError(err.message ?? "Delete failed.");
    }
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gray-400 dark:bg-gray-700/70">
      <Card size="sm" className="min-w-[300px]">
        <Title
          label="Settings"
          align="center"
          className="text-slate-800 dark:text-slate-100 mb-3"
        />

        <div className="flex gap-2 justify-center mb-3">
          {["email", "password", "delete"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                resetAlerts();
                setTab(t as Tab);
              }}
              className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200  ${
                tab === t
                  ? "bg-gray-400 text-black dark:bg-slate-700 dark:text-white shadow-sm"
                  : "border-slate-300 text-slate-700 hover:bg-gray-200 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              {t === "email"
                ? "Update Email"
                : t === "password"
                ? "Update Password"
                : "Delete Account"}
            </button>
          ))}
        </div>

        <form noValidate className="mb-2">
          <FormField
            id="currentEmail"
            label="Email"
            type="email"
            value={currentEmail}
            onChange={() => {}}
          />
          <FormField
            id="currentPassword"
            label="Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </form>

        {!!error ? (
          <Alert variant="destructive">
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        ) : null}
        {!!success ? (
          <Alert>
            <AlertTitle>{success}</AlertTitle>
          </Alert>
        ) : null}

        {tab === "email" && (
          <form noValidate onSubmit={handleEmailUpdate}>
            <FormField
              id="newEmail"
              label="New Email"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />

            <Button
              type="submit"
              className="w-full my-4 bg-gray-400 hover:bg-gray-500 dark:bg-slate-700 dark:hover:bg-slate-800 text-base text-black dark:text-white"
            >
              Save Email
            </Button>
          </form>
        )}

        {tab === "password" && (
          <form noValidate onSubmit={handlePasswordUpdate}>
            <FormField
              id="newPassword"
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <Button
              type="submit"
              className="w-full my-4 bg-gray-400 hover:bg-gray-500 dark:bg-slate-700 dark:hover:bg-slate-800 text-base text-black dark:text-white"
            >
              Save Password
            </Button>
          </form>
        )}

        {tab === "delete" && (
          <div>
            <p className="text-sm text-slate-700 dark:text-slate-300 text-center mb-3">
              Permanently delete your account.
            </p>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              className="w-full"
            >
              Delete My Account
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
