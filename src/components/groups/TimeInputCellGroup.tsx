import { useEffect, useRef, useState } from "react";
import { ReactComponent as IconDelete } from "../../assets/delete.svg";
import clsx from "clsx";
import TimeInput from "../atoms/TimeInput";
import Spacer from "../atoms/Spacer";
import Cell from "../atoms/Cell";
import { Style } from "../../models";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onRemoveTimeClick: () => void;
  onAddTimeClick: (time: string) => void;
  style?: Style;
}

const TimeInputCellGroup = ({
  value,
  onChange,
  onRemoveTimeClick,
  onAddTimeClick,
  style,
}: Props) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const input = ref?.current;
    if (!input) return;
    input.value = value;
  }, [ref, value]);

  const onAddClick = () => {
    const input = ref?.current;
    if (!input) return;
    onAddTimeClick(input.value);
  };

  return (
    <Cell
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={"mb-3"}
      style={style}
    >
      <Spacer className="mx-2.5" width={30} />
      <TimeInput onEnterPressed={onAddClick} onChange={onChange} ref={ref} />
      <IconDelete
        className={clsx(
          "pointer-events-none mx-2.5 opacity-0",
          hovered
            ? "pointer-events-auto cursor-pointer opacity-100"
            : "pointer-events-none opacity-0"
        )}
        width={30}
        onClick={onRemoveTimeClick}
      />
    </Cell>
  );
};

export default TimeInputCellGroup;
