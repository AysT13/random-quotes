// components/Card.tsx
import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export default function Card({
  children,
  size = "md",
  className = "",
}: CardProps) {
  const widthClass =
    size === "sm" ? "max-w-sm" : size === "lg" ? "max-w-lg" : "max-w-xl";

  return (
    <div
      className={
        size === "sm"
          ? `w-full m-0 ${widthClass} rounded-xl border border-slate-300 bg-gray-100 p-4 shadow-sm
             dark:border-slate-700 dark:bg-gray-900 ${className}`
          : `w-full ${widthClass} bg-gray-200 dark:bg-gray-300 p-12 rounded-lg flex flex-col shadow-lg m-4 ${className}`
      }
    >
      {children}
    </div>
  );
}
