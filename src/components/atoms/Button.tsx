import React from "react";
import { B } from "./Typography";
import clsx from "clsx";

interface Props {
  text: string;
  style: "primary" | "secondary";
  onClick: () => void;
  enabled: boolean;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const Button = ({
  text,
  style,
  onClick,
  enabled,
  className,
  onMouseEnter,
  onMouseLeave,
}: Props) => {
  return (
    <button
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={clsx(
        "h-cell w-cell text-white",
        { "bg-dark-grey": style === "primary" },
        { "bg-pink": style === "secondary" },
        { "opacity-30": !enabled },
        className
      )}
      onClick={onClick}
    >
      <B bold className="text-white">
        {text}
      </B>
    </button>
  );
};

export default Button;
