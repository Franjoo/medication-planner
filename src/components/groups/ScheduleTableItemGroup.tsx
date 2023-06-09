import { Day } from "../../models";
import TimeInputCellGroup from "./TimeInputCellGroup";
import { B } from "../atoms/Typography";
import { toGermanDateString } from "../../utils";
import AddTimeEntry from "../atoms/AddTimeEntry";
import { useState } from "react";
import clsx from "clsx";

interface Props {
  day: Day;
  onChange: (timeIndex: number, newValue: string) => void;
  onAddEntryClick: () => void;
  onRemoveEntryClick: (timeIndex: number) => void;
  isPlaceHolder?: boolean;
}

const ScheduleTableItemGroup = ({
  day,
  onChange,
  onAddEntryClick,
  onRemoveEntryClick,
  isPlaceHolder = false,
}: Props) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={clsx("mr-3 text-center ", {
        "pointer-none opacity-0": isPlaceHolder,
      })}
    >
      <B bold>{day.weekday}</B>
      <B>{toGermanDateString(new Date(day.date))}</B>
      <div
        className={clsx(
          "mt-4 flex h-day w-cell flex-col [&>*:last-child]:mb-0 ",
          hovered ? "bg-[#D8D8D8]" : "bg-[#F4F4F4]"
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {day.times.map((value, index) => (
          <TimeInputCellGroup
            onChange={(time: string) => onChange(index, time)}
            key={index}
            value={value}
            onRemoveTimeClick={() => onRemoveEntryClick(index)}
            onAddTimeClick={() => onAddEntryClick()}
          />
        ))}
        {/* todo check which type to use */}
        {hovered && day.times.length < 5 && (
          <AddTimeEntry onClick={() => onAddEntryClick()} />
        )}
      </div>
    </div>
  );
};

export default ScheduleTableItemGroup;
