import WeeklyScheduleTableGroup from "../groups/WeeklyScheduleTableGroup";
import { useStore } from "../../hooks/useStores";
import { observer } from "mobx-react";
import { Day } from "../../models";

const WeeklyScheduleContainer = observer(() => {
  const { schedule } = useStore();

  const onAddEntryClick = (day: Day) => schedule.addTimeEntry(day.date);
  const onRemoveEntryClick = (day: Day) => schedule.removeTimeEntry(day.date);

  return schedule.displayDays ? (
    <WeeklyScheduleTableGroup
      days={schedule.displayDays}
      onAddEntryClick={onAddEntryClick}
      onRemoveEntryClick={onRemoveEntryClick}
    />
  ) : (
    <></>
  );
});

export default WeeklyScheduleContainer;
