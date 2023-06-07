import { Day } from "../../models";
import TimeEntry from "../atoms/TimeEntry";
import { B } from "../atoms/Typography";
import { toGermanDateString } from "../../utils";
import AddTimeEntry from "../atoms/AddTimeEntry";
import { useState } from "react";
import clsx from "clsx";

interface Props {
  day: Day;
  onAddEntryClick: (day: Day) => void;
  onRemoveEntryClick: (day: Day) => void;
}

const ScheduleTableItemGroup = ({
  day,
  onAddEntryClick,
  onRemoveEntryClick,
}: Props) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="text-center">
      <B bold>{day.weekday}</B>
      <B>{toGermanDateString(day.date)}</B>
      <div
        className={clsx(
          "mr-3 mt-4 flex h-day w-cell flex-col [&>*:last-child]:mb-0 ",
          hovered ? "bg-[#D8D8D8]" : "bg-[#F4F4F4]"
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {day.times.map((value, index) => (
          <TimeEntry
            key={index}
            time={value}
            onRemoveClick={() => onRemoveEntryClick(day)}
          />
        ))}
        {/* todo check which type to use */}
        {hovered && day.times.length < 5 && (
          <AddTimeEntry onClick={() => onAddEntryClick(day)} />
        )}
      </div>
    </div>
  );
};

export default ScheduleTableItemGroup;