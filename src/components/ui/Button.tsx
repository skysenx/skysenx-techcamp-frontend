import React from "react";
import Link from "next/link";
import BtnLoader from "./BtnLoader";

export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  size: "sm" | "lg";
  theme?: "primary" | "secondary";
  customTheme?: string;
  children: React.ReactNode;
  // Redirect props
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  download?: string;
  // Additional button props
  onClick?: () => void;
  disabled?: boolean;
  id?: string;
  loading?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  size = "sm",
  theme = "primary",
  customTheme,
  children,
  href,
  target,
  download,
  className,
  disabled,
  onClick,
  loading,
}) => {
  const themeMap = {
    primary: `text-white ${disabled ? "bg-primary/60" : "bg-primary"}`,
    secondary: `text-primary bg-white`,
  };

  const sizeMap = {
    sm: "min-h-[38px] py-2 px-4 min-w-[151px]",
    lg: "min-h-[48px] py-3 px-5 min-w-[202px]",
  };

  const sizeClasses = sizeMap[size];
  const finalClass =
    `whitespace-nowrap block text-center rounded-[30px] no-underline border border-[#EFEFEF] ${
      disabled
        ? " cursor-not-allowed"
        : "cursor-pointer hover:scale-102 duration-150 active:scale-100"
    }    ${!customTheme && themeMap[theme]} ${sizeClasses} ${customTheme} ${
      className || ""
    }`.trim();

  // If href is provided, render as a link
  if (href) {
    // Check if it's an external link
    const isExternal = href.startsWith("http") || href.startsWith("//");

    if (isExternal) {
      return (
        <a
          href={href}
          target={target}
          download={download}
          className={finalClass}
        >
          {children}
        </a>
      );
    }

    // Use Next.js Link for internal navigation
    return (
      <Link
        href={href}
        target={target}
        download={download}
        className={finalClass}
      >
        {children}
      </Link>
    );
  }

  // Render as button
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={finalClass}
    >
      {loading ? <BtnLoader /> : children}
    </button>
  );
};

export default Button;
