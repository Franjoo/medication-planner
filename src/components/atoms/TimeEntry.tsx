import { B } from "./Typography";
import { Day } from "../../models";
import { useState } from "react";
import { ReactComponent as IconDelete } from "./../../assets/delete.svg";
import clsx from "clsx";

interface Props {
  time: string;
  onRemoveClick: (day: Day) => void;
}

const TimeEntry = ({ time, onRemoveClick }: Props) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="mb-3 flex h-cell w-cell items-center justify-between border-1 border-black bg-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <IconDelete className="pointer-events-none mx-2.5 opacity-0" />
      <B className="flex items-center justify-center">{time}</B>
      <IconDelete
        className={clsx(
          " mx-2.5",
          hovered
            ? "pointer-events-auto cursor-pointer opacity-100"
            : "pointer-events-none opacity-0"
        )}
        onClick={onRemoveClick}
      />
    </div>
  );
};

export default TimeEntry;
