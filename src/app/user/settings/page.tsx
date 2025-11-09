"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/AuthProvider";

import {
  changeEmailWithVerification,
  reauthWithPassword,
  changePassword,
  removeAccount,
  reloadAndGetFlags,
} from "@/lib/user";
import { Button } from "@/components/ui/button";
import FormField from "@/components/FormField";
import Card from "@/components/Card";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Title } from "@/components/Title";

type Tab = "email" | "password" | "delete";

export default function SettingsPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const params = useSearchParams();

  const [tab, setTab] = useState<Tab>("email");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [busy, setBusy] = useState(false);

  const currentEmail = user?.email ?? "";
  const [newEmail, setNewEmail] = useState(currentEmail);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const resetAlerts = () => {
    setError("");
    setSuccess("");
  };

  useEffect(() => {
    if (!loading && !user) router.replace("/user/login");
  }, [user, loading, router]);

  useEffect(() => {
    (async () => {
      if (!user) return;
      try {
        const f = await reloadAndGetFlags();
        setNewEmail(f.email);
      } catch (e: any) {
        if (
          e?.code === "auth/user-token-expired" ||
          e?.code === "auth/invalid-user-token"
        ) {
          router.replace("/user/login");
        }
      }
    })();
  }, [user, router]);

  useEffect(() => {
    const mode = params.get("mode");
    if (mode === "verifyEmail") {
      (async () => {
        try {
          const f = await reloadAndGetFlags();
          if (f.verified) setSuccess("Email verified / updated.");
        } catch (e: any) {
          if (
            e?.code === "auth/user-token-expired" ||
            e?.code === "auth/invalid-user-token"
          ) {
            router.replace("/user/login");
            return;
          }
        }
        router.replace("/user/settings");
      })();
    }
  }, [params, router]);

  if (loading || !user) return null;

  async function handleSendVerifyToNewEmail(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    resetAlerts();

    const trimmed = newEmail.trim();
    if (!trimmed || trimmed === currentEmail) {
      setError("Please enter a different email address.");
      return;
    }
    if (!confirmPassword.trim()) {
      setError("Enter your password to confirm.");
      return;
    }

    setBusy(true);
    try {
      await reauthWithPassword(currentEmail, confirmPassword);
      await changeEmailWithVerification(trimmed);
      setSuccess(
        "Verification link sent to your NEW email. Click it to finish."
      );
    } catch (err: any) {
      setError(err?.message ?? "Email update failed.");
    } finally {
      setBusy(false);
    }
  }

  async function handlePasswordUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    resetAlerts();

    try {
      if (!newPassword.trim()) throw new Error("Enter a new password.");
      if (!confirmPassword.trim())
        throw new Error("Enter your current password.");
      await reauthWithPassword(currentEmail, confirmPassword);
      await changePassword(newPassword.trim());
      setSuccess("Password updated successfully.");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err?.message ?? "Password update failed.");
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete your account?")) return;
    resetAlerts();

    try {
      if (!confirmPassword.trim())
        throw new Error("Enter your password first.");
      await reauthWithPassword(currentEmail, confirmPassword);
      await removeAccount();
      await logout();
    } catch (err: any) {
      setError(err?.message ?? "Delete failed.");
    }
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gray-400 dark:bg-gray-700/70 px-4">
      <Card size="md" className="w-full max-w-xl dark:bg-gray-300">
        <Title
          label="Settings"
          align="center"
          className="text-slate-100 dark:text-slate-800 mb-3"
        />

        <div
          className="rounded-lg border border-slate-300 dark:border-slate-700 p-3 
                           bg-gray-100 dark:bg-slate-900"
        >
          <p className="text-center text-sm mb-4">
            Current email: <strong>{currentEmail}</strong>{" "}
          </p>

          <div className="flex gap-2 justify-center mb-8 mt-3">
            {(["email", "password", "delete"] as Tab[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  resetAlerts();
                  setTab(t);
                  setConfirmPassword("");
                }}
                className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200
                  ${
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

          {!!error && (
            <Alert variant="destructive" className="mb-3 text-red-500">
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}
          {!!success && (
            <Alert className="mb-3 text-red-500">
              <AlertTitle>{success}</AlertTitle>
            </Alert>
          )}
          <div className="m-2 p-4 border-2 border-slate-300 rounded-lg">
            {tab === "email" && (
              <form onSubmit={handleSendVerifyToNewEmail}>
                <FormField
                  id="newEmail"
                  label="New Email"
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
                <FormField
                  id="confirmPasswordEmail"
                  label="Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  disabled={busy}
                  className="w-full my-4 bg-gray-400 hover:bg-gray-500 dark:bg-slate-600 dark:hover:bg-slate-800 text-base text-black dark:text-white"
                >
                  {busy ? "Sending..." : "Save Email"}
                </Button>
              </form>
            )}

            {tab === "password" && (
              <form onSubmit={handlePasswordUpdate}>
                <FormField
                  id="newPassword"
                  label="New Password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <FormField
                  id="confirmPasswordPwd"
                  label="Current Password (to confirm)"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  disabled={busy}
                  className="w-full my-4 bg-gray-400 hover:bg-gray-500 dark:bg-slate-700 dark:hover:bg-slate-800 text-base text-black dark:text-white"
                >
                  {busy ? "Saving..." : "Save Password"}
                </Button>
              </form>
            )}

            {tab === "delete" && (
              <div>
                <p className="text-sm text-center mb-3">
                  Permanently delete your account.
                </p>

                <FormField
                  id="confirmPasswordDel"
                  label="Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                {!showDeleteAlert && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => {
                      resetAlerts();
                      setShowDeleteAlert(true);
                    }}
                    className="w-full mt-2"
                  >
                    Delete My Account
                  </Button>
                )}

                {showDeleteAlert && (
                  <div className="mt-3 flex flex-col items-center gap-2 justify-end">
                    <p className="text-md text-red-400 mb-3">
                      This cannot be undone. Delete account?
                    </p>

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        className="flex-1"
                        onClick={() => setShowDeleteAlert(false)}
                      >
                        Cancel
                      </Button>

                      <Button
                        type="button"
                        variant="destructive"
                        className="flex-1"
                        onClick={async () => {
                          resetAlerts();

                          if (!confirmPassword.trim()) {
                            setError("Enter your password first.");
                            setShowDeleteAlert(false);
                            return;
                          }

                          try {
                            await reauthWithPassword(
                              currentEmail,
                              confirmPassword
                            );
                            await removeAccount();
                            await logout();
                          } catch (err: any) {
                            setError(err?.message ?? "Delete failed.");
                            setShowDeleteAlert(false);
                          }
                        }}
                      >
                        Yes
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
