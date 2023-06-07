import WeeklyScheduleTableGroup from "../groups/WeeklyScheduleTableGroup";
import { useStore } from "../../hooks/useStores";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { Day } from "../../models";

const WeeklyScheduleContainer = observer(() => {
  const { schedule } = useStore();

  useEffect(() => {
    schedule.setRangeStart(new Date(2023, 1, 27));
    schedule.setRangeEnd(new Date(2023, 2, 11));
  }, []);

  const onAddEntryClick = (day: Day) => schedule.addEntry(new Date(day.date));
  const onRemoveEntryClick = (day: Day) =>
    schedule.removeEntry(new Date(day.date));

  return schedule.schedule ? (
    <WeeklyScheduleTableGroup
      schedule={schedule.schedule}
      onAddEntryClick={onAddEntryClick}
      onRemoveEntryClick={onRemoveEntryClick}
    />
  ) : (
    <></>
  );
});

export default WeeklyScheduleContainer;
