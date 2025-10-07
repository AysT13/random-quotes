import { ReactNode } from "react";

type AuthTitleProps = {
  children: ReactNode;
};

export default function AuthTitle({ children }: AuthTitleProps) {
  return (
    <h1 className="text-xl font-bold text-slate-800 dark:text-slate-300 text-center mb-3">
      {children}
    </h1>
  );
}
