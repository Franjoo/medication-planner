import { ReactElement } from "react";
import clsx from "clsx";
import { Style } from "../../models";

interface Props {
  children?: ReactElement[] | ReactElement;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  style?: Style;
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
      { "border-grey-AC text-grey-AC": style === "disabled" },
      className
    )}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {children}
  </div>
);

export default Cell;
