import WeeklyScheduleTableGroup from "../groups/WeeklyScheduleTableGroup";
import { useStore } from "../../hooks/useStores";
import { observer } from "mobx-react";
import { Day } from "../../models";

const WeeklyScheduleContainer = observer(() => {
  const { schedule } = useStore();

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
