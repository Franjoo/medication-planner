import { Day, Schedule } from "../../models";
import ScheduleTableItemGroup from "./ScheduleTableItemGroup";

interface Props {
  schedule: Schedule;
  onAddEntryClick: (day: Day) => void;
  onRemoveEntryClick: (day: Day) => void;
}

const WeeklyScheduleTableGroup = ({
  schedule,
  onAddEntryClick,
  onRemoveEntryClick,
}: Props) => {
  return (
    <div className="flex ">
      {schedule.days.map((value, index) => (
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
