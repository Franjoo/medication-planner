import { Day, Style } from "../../models";
import TimeInputCellGroup from "./TimeInputCellGroup";
import { B } from "../atoms/Typography";
import { toGermanDateString } from "../../utils";
import AddTimeEntry from "../atoms/AddTimeEntry";
import { useState } from "react";
import clsx from "clsx";
import { MAX_TIME_ENTRIES_PER_DAY } from "../../constants";
import { observer } from "mobx-react";
import { useStore } from "../../hooks/useStores";

interface Props {
  day: Day;
  onUpdateEntryClick: (timeIndex: number, newValue: string) => void;
  onAddEntryClick: () => void;
  onRemoveEntryClick: (timeIndex: number) => void;
  isPlaceHolder?: boolean;
  style?: Style;
}

const ScheduleTableItemGroup = ({
  day,
  onUpdateEntryClick,
  onAddEntryClick,
  onRemoveEntryClick,
  isPlaceHolder = false,
  style,
}: Props) => {
  const [hovered, setHovered] = useState(false);
  const isBeforeTime = (day: Day, index: number) => {
    if (index === 0) return false;
    return parseInt(day.times[index - 1]) > parseInt(day.times[index]);
  };

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
            onChange={(time: string) => onUpdateEntryClick(index, time)}
            key={index}
            value={value}
            onRemoveTimeClick={() => onRemoveEntryClick(index)}
            onAddTimeClick={() => onAddEntryClick()}
            style={isBeforeTime(day, index) ? "error" : style}
          />
        ))}
        {hovered && day.times.length < MAX_TIME_ENTRIES_PER_DAY && (
          <AddTimeEntry onClick={() => onAddEntryClick()} />
        )}
      </div>
    </div>
  );
};

export default ScheduleTableItemGroup;
