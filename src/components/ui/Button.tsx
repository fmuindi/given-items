import { cn } from "@/lib/utils";
import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-control)] font-bold transition-colors tap-target focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary: "bg-amber-500 text-navy-900 hover:bg-amber-600 active:bg-amber-600",
  dark: "bg-navy-900 text-white hover:bg-navy-800",
  outline: "border border-navy-900 text-navy-900 bg-transparent hover:bg-navy-900 hover:text-white",
  "outline-light":
    "border border-white/40 text-white bg-white/10 hover:bg-white/20",
  ghost: "text-ink-600 hover:bg-line-soft",
  green: "bg-green-700 text-white hover:bg-green-800",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-12 px-6 text-[15.5px]",
};

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

type LinkButtonProps = {
  variant?: Variant;
  size?: Size;
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

type PlainButtonProps = {
  variant?: Variant;
  size?: Size;
  href?: undefined;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonProps = LinkButtonProps | PlainButtonProps;

export function Button({
  variant = "primary",
  size = "md",
  className,
  href,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
