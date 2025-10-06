type AuthButtonProps = {
  label: string;
  type?: "button" | "submit" | "reset";
  className?: string;
};

export default function AuthButton({
  label,
  type = "submit",
  className = "",
}: AuthButtonProps) {
  return (
    <button
      type={type}
      className={`w-full rounded-lg px-4 py-2 my-4 font-medium border
                  bg-gray-400 hover:bg-gray-500
                  dark:bg-slate-700 dark:hover:bg-slate-800 dark:hover:border-slate-200 ${className}`}
    >
      {label}
    </button>
  );
}
