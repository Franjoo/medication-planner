import { Day } from "../../models";
import ScheduleTableItemGroup from "./ScheduleTableItemGroup";
import { noop } from "../../utils";

interface Props {
  days?: Day[];
  templateDays?: Day[];
  showTemplates: boolean;
  onAddEntryClick: (day: Day) => void;
  onRemoveEntryClick: (day: Day) => void;
}

const WeeklyScheduleTableGroup = ({
  days,
  templateDays,
  showTemplates,
  onAddEntryClick,
  onRemoveEntryClick,
}: Props) => {
  return (
    <div className="mb-20 flex [&>*:last-child]:mr-0">
      {/* height placeholder */}
      {!days ||
        (days.length === 0 && (
          <ScheduleTableItemGroup
            day={{ weekday: "template", times: [], date: new Date() }}
            onAddEntryClick={noop}
            onRemoveEntryClick={noop}
            isPlaceHolder
          />
        ))}
      {/* user created days */}
      {!showTemplates &&
        days?.map((day, index) => (
          <ScheduleTableItemGroup
            key={index}
            day={day}
            onAddEntryClick={onAddEntryClick}
            onRemoveEntryClick={onRemoveEntryClick}
          />
        ))}
      {/* template days */}
      {showTemplates &&
        templateDays?.map((templateDay, index) => (
          <ScheduleTableItemGroup
            key={index}
            day={templateDay}
            onAddEntryClick={onAddEntryClick}
            onRemoveEntryClick={onRemoveEntryClick}
          />
        ))}
    </div>
  );
};

export default WeeklyScheduleTableGroup;
