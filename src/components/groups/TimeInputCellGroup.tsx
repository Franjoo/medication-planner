import { useState } from "react";
import { ReactComponent as IconDelete } from "../../assets/delete.svg";
import clsx from "clsx";
import TimeInput from "../atoms/TimeInput";
import Spacer from "../atoms/Spacer";
import Cell from "../atoms/Cell";

interface Props {
  time: Date;
  onRemoveClick: () => void;
  onEnterUp: () => void;
}

const TimeInputCellGroup = ({ time, onRemoveClick, onEnterUp }: Props) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Cell
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="mb-3"
    >
      <Spacer className="mx-2.5" width={30} />
      <TimeInput onEnterUp={onEnterUp} />
      <IconDelete
        className={clsx(
          "pointer-events-none mx-2.5 opacity-0",
          hovered
            ? "pointer-events-auto cursor-pointer opacity-100"
            : "pointer-events-none opacity-0"
        )}
        width={30}
        onClick={onRemoveClick}
      />
    </Cell>
  );
};

export default TimeInputCellGroup;
