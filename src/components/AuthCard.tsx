import { ReactNode } from "react";

type AuthCardProps = { children: ReactNode };

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-gray-400 dark:bg-gray-700/70">
      <div
        className="w-full max-w-sm rounded-xl border border-slate-300 bg-gray-100 p-4 shadow-sm
                      dark:border-slate-700 dark:bg-gray-900"
      >
        {children}
      </div>
    </div>
  );
}
