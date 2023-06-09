import WeeklyScheduleTableGroup from "../groups/WeeklyScheduleTableGroup";
import { useStore } from "../../hooks/useStores";
import { observer } from "mobx-react";
import { Day } from "../../models";
import Scrollbar from "../atoms/Scrollbar";
import { clamp, localDate } from "../../utils";

const WeeklyScheduleContainer = observer(() => {
  const { schedule } = useStore();

  const onAddEntryClick = (day: Day) =>
    schedule.addTimeEntry(localDate(day.date));
  const onRemoveEntryClick = (day: Day) =>
    schedule.removeTimeEntry(localDate(day.date));
  const scrollbarSize = clamp(schedule.days.length / 100, 0, 1);
  const scrollbarProgress = schedule.scrollProgress;
  const scrollbarEnabled = schedule.canGoBackward || schedule.canGoForward;

  const onTimeChange = (day: Day, timeIndex: number, newValue: string) => {
    console.log("new vlaue", newValue);
    schedule.updateTime(day, timeIndex, newValue);
  };

  return (
    <>
      <WeeklyScheduleTableGroup
        days={schedule.displayDays}
        templateDays={schedule.templateDays}
        showTemplates={schedule.showTemplates}
        onAddEntryClick={onAddEntryClick}
        onRemoveEntryClick={onRemoveEntryClick}
        onTimeChange={onTimeChange}
      />
      {scrollbarEnabled && (
        <Scrollbar progress={scrollbarProgress} size={scrollbarSize} />
      )}
    </>
  );
});

export default WeeklyScheduleContainer;
