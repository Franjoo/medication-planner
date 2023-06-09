import { ReactElement } from "react";
import clsx from "clsx";

interface Props {
  children?: ReactElement[] | ReactElement;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  style?: "primary" | "secondary" | "disabled";
}

const Cell = ({
  children,
  className = "",
  onMouseEnter,
  onMouseLeave,
  style = "primary",
}: Props) => (
  <div
    className={clsx(
      "flex h-cell w-cell items-center justify-center border-1 border-black bg-white",
      { "border-black text-black": style === "primary" },
      { "border-pink text-pink": style === "secondary" },
      { "border-light-grey text-light-grey": style === "disabled" },
      className
    )}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {children}
  </div>
);

export default Cell;
