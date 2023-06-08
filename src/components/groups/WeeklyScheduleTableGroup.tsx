import { Day, Schedule } from "../../models";
import ScheduleTableItemGroup from "./ScheduleTableItemGroup";

interface Props {
  days: Day[];
  onAddEntryClick: (day: Day) => void;
  onRemoveEntryClick: (day: Day) => void;
}

const WeeklyScheduleTableGroup = ({
  days,
  onAddEntryClick,
  onRemoveEntryClick,
}: Props) => {
  return (
    <div className="flex ">
      {days.map((value, index) => (
        <ScheduleTableItemGroup
          key={index}
          day={value}
          onAddEntryClick={onAddEntryClick}
          onRemoveEntryClick={onRemoveEntryClick}
        />
      ))}
    </div>
  );
};

export default WeeklyScheduleTableGroup;
