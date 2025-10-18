import React from "react";
import cn from "classnames";

export type ButtonVariant = "primary" | "secondary" | "danger";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export default function Button({
  children,
  className,
  variant = "secondary",
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-4 py-2 rounded-md font-medium hover:cursor-pointer";

  const variantClass = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-200 text-black hover:bg-red-300",
  }[variant];

  const focusVariant = {
    primary: "focus:ring-2 focus:ring-black focus:ring-offset-3",
    secondary: "focus:ring-gray-500",
    danger: "focus:ring-red-500",
  }[variant];

  return (
    <button
      className={cn(base, focusVariant, variantClass, className)}
      {...rest}
    >
      {children}
    </button>
  );
}
