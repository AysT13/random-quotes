import { ReactNode, ChangeEvent } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
};

export default function FormField({
  id,
  label,
  type = "text",
  required = true,
  value,
  onChange,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-1 text-slate-600 dark:text-slate-300"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-slate-400 px-3 py-2 mb-4 bg-gray-300
                         dark:bg-gray-700 dark:text-white dark:border-slate-800"
      />
      {children}
    </div>
  );
}
