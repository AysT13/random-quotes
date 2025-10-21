"use client";

export const align = {
  center: "center",
  left: "left",
  right: "right",
};

type TitleProps = {
  label: string;
  align?: keyof typeof align;
  className?: string;
};

export function Title({ label, align, className = "" }: TitleProps) {
  const alignText = () => {
    switch (align) {
      case "center":
        return "text-center";
      case "left":
        return "text-start";
      case "right":
        return "text-end";
      default:
        console.error("No suitable setting is found for", align);
    }
  };

  return (
    <h2
      className={`font-bold text-slate-700 text-xl ${alignText()} ${className}`}
    >
      {label}
    </h2>
  );
}
