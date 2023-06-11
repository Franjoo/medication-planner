import { Day } from "../../models";
import ScheduleTableItemGroup from "./ScheduleTableItemGroup";
import { noop } from "../../utils";
import { useMemo } from "react";
import { MAX_ITEMS_PER_PAGE } from "../../constants";

interface Props {
  days?: Day[];
  templateDays?: Day[];
  paginationIndex: number;
  showTemplates: boolean;
  onAddEntryClick: (dayIndex: number) => void;
  onRemoveEntryClick: (dayIndex: number, timeIndex: number) => void;
  onTimeChange: (dayIndex: number, timeIndex: number, time: string) => void;
}

const WeeklyScheduleTableGroup = ({
  days,
  templateDays,
  paginationIndex,
  showTemplates,
  onAddEntryClick,
  onRemoveEntryClick,
  onTimeChange,
}: Props) => {
  // const daysToShow = useMemo(() => {
  //   return days?.slice(paginationIndex, paginationIndex + MAX_ITEMS_PER_PAGE);
  // }, [days, paginationIndex]);

  const daysToShow = days?.slice(
    paginationIndex,
    paginationIndex + MAX_ITEMS_PER_PAGE
  );

  const templatesToShow = templateDays?.slice(
    paginationIndex,
    paginationIndex + 7
  );

  return (
    <div className="mb-20 flex [&>*:last-child]:mr-0">
      {/* height placeholder */}
      {!daysToShow ||
        (daysToShow.length === 0 && (
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
        daysToShow?.map((day, index) => (
          <ScheduleTableItemGroup
            key={index}
            onChange={(timeIndex: number, time: string) =>
              onTimeChange(paginationIndex + index, timeIndex, time)
            }
            day={day}
            onAddEntryClick={() => onAddEntryClick(paginationIndex + index)}
            onRemoveEntryClick={(timeIndex: number) =>
              onRemoveEntryClick(paginationIndex + index, timeIndex)
            }
            style={day.style}
          />
        ))}
      {/* template days */}
      {showTemplates &&
        templatesToShow?.map((templateDay, index) => (
          <ScheduleTableItemGroup
            key={index}
            onChange={(timeIndex: number, time: string) =>
              onTimeChange(index, timeIndex, time)
            }
            day={templateDay}
            onAddEntryClick={() => onAddEntryClick(paginationIndex + index)}
            onRemoveEntryClick={(timeIndex: number) =>
              onRemoveEntryClick(paginationIndex + index, timeIndex)
            }
            style={templateDay.style}
          />
        ))}
    </div>
  );
};

export default WeeklyScheduleTableGroup;
