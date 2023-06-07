import { ReactElement } from "react";
import clsx from "clsx";

interface Props {
  children?: ReactElement[] | ReactElement;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const Cell = ({
  children,
  className = "",
  onMouseEnter,
  onMouseLeave,
}: Props) => (
  <div
    className={clsx(
      "mb-3 flex h-cell w-cell items-center justify-center border-1 border-black bg-white",
      className
    )}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {children}
  </div>
);

export default Cell;
