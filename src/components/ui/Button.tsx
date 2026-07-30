import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md";
  disabled?: boolean;
};

export default function Button({
  children,
  onClick,
  type = "button",
  size = "md",
  disabled = false,
}: ButtonProps) {

  const sizeClasses =
    size === "sm"
      ? "px-4 py-2 text-sm"
      : "px-6 py-3";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${sizeClasses}

        rounded-lg
        bg-amber-700
        text-amber-50
        font-semibold

        transition-colors
        hover:bg-amber-800

        disabled:opacity-60
        disabled:cursor-not-allowed
      `}
    >
      {children}
    </button>
  );
}