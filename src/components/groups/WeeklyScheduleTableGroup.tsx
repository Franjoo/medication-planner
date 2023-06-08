import { Day } from "../../models";
import ScheduleTableItemGroup from "./ScheduleTableItemGroup";
import { noop } from "../../utils";

interface Props {
  days?: Day[];
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
      {days && days?.length > 0 ? (
        days.map((value, index) => (
          <ScheduleTableItemGroup
            key={index}
            day={value}
            onAddEntryClick={onAddEntryClick}
            onRemoveEntryClick={onRemoveEntryClick}
          />
        ))
      ) : (
        <ScheduleTableItemGroup
          day={{ weekday: "template", times: [], date: new Date() }}
          onAddEntryClick={noop}
          onRemoveEntryClick={noop}
          isPlaceHolder
        />
      )}
    </div>
  );
};

export default WeeklyScheduleTableGroup;
