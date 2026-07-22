
type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  size?: "sm" | "md";
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
};

function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        px-6
        py-3
        rounded-lg
        bg-amber-700
        text-amber-50
        font-semibold
        hover:bg-amber-800
        transition-colors
      "
    >
      {children}
    </button>
  );
}

export default Button;