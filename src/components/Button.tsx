import { motion} from "framer-motion";

interface ButtonProps {
  variant?: "filled" | "outlined";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  variant = "filled",
  size = "md",
  children,
  onClick,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "font-bold rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-700 inline-flex items-center justify-center shadow-sm cursor-pointer";
  const filled =
    "bg-blue-700 text-white hover:bg-blue-900";
  const outlined =
    "border border-blue-700 text-blue-700 bg-white hover:bg-blue-50";
  const sizes = {
    sm: "px-4 py-1 text-sm",
    md: "px-6 py-2 text-base",
    lg: "px-8 py-3 text-lg",
  };
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={[base,variant === "filled" ? filled : outlined,sizes[size],className,].join(" ")}{...props}>
      {children}
    </motion.button>
  );
}