import { Day } from "../../models";
import ScheduleTableItemGroup from "./ScheduleTableItemGroup";
import { noop } from "../../utils";

interface Props {
  days?: Day[];
  templateDays?: Day[];
  showTemplates: boolean;
  onAddEntryClick: (dayIndex: number) => void;
  onRemoveEntryClick: (dayIndex: number, timeIndex: number) => void;
  onTimeChange: (dayIndex: number, timeIndex: number, time: string) => void;
}

const WeeklyScheduleTableGroup = ({
  days,
  templateDays,
  showTemplates,
  onAddEntryClick,
  onRemoveEntryClick,
  onTimeChange,
}: Props) => {
  return (
    <div className="mb-20 flex [&>*:last-child]:mr-0">
      {/* height placeholder */}
      {!days ||
        (days.length === 0 && (
          <ScheduleTableItemGroup
            day={{ weekday: "template", times: [], date: 0 }}
            onChange={(timeIndex: number, time: string) =>
              onTimeChange(0, timeIndex, time)
            }
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
            onChange={(timeIndex: number, time: string) =>
              onTimeChange(index, timeIndex, time)
            }
            day={day}
            onAddEntryClick={() => onAddEntryClick(index)}
            onRemoveEntryClick={(timeIndex: number) =>
              onRemoveEntryClick(index, timeIndex)
            }
          />
        ))}
      {/* template days */}
      {showTemplates &&
        templateDays?.map((templateDay, index) => (
          <ScheduleTableItemGroup
            key={index}
            onChange={(timeIndex: number, time: string) =>
              onTimeChange(index, timeIndex, time)
            }
            day={templateDay}
            onAddEntryClick={() => onAddEntryClick(index)}
            onRemoveEntryClick={(timeIndex: number) =>
              onRemoveEntryClick(index, timeIndex)
            }
          />
        ))}
    </div>
  );
};

export default WeeklyScheduleTableGroup;
