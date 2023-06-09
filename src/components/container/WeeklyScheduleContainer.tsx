import WeeklyScheduleTableGroup from "../groups/WeeklyScheduleTableGroup";
import { useStore } from "../../hooks/useStores";
import { observer } from "mobx-react";
import { Day } from "../../models";
import Scrollbar from "../atoms/Scrollbar";
import { clamp } from "../../utils";

const WeeklyScheduleContainer = observer(() => {
  const { schedule } = useStore();

  const onAddEntryClick = (day: Day) => schedule.addTimeEntry(day.date);
  const onRemoveEntryClick = (day: Day) => schedule.removeTimeEntry(day.date);
  const scrollbarSize = clamp(schedule.days.length / 100, 0, 1);
  const scrollbarProgress = schedule.scrollProgress;
  const scrollbarEnabled = schedule.canGoBackward || schedule.canGoForward;

  return (
    <>
      <WeeklyScheduleTableGroup
        days={schedule.displayDays}
        templateDays={schedule.templateDays}
        showTemplates={schedule.showTemplates}
        onAddEntryClick={onAddEntryClick}
        onRemoveEntryClick={onRemoveEntryClick}
      />
      {scrollbarEnabled && (
        <Scrollbar progress={scrollbarProgress} size={scrollbarSize} />
      )}
    </>
  );
});

export default WeeklyScheduleContainer;
