import WeeklyScheduleTableGroup from "../groups/WeeklyScheduleTableGroup";
import { useStore } from "../../hooks/useStores";
import { observer } from "mobx-react";
import Scrollbar from "../atoms/Scrollbar";
import { clamp } from "../../utils";

const WeeklyScheduleContainer = observer(() => {
  const { schedule } = useStore();

  const scrollbarSize = clamp(schedule.days.length / 100, 0, 1);
  const scrollbarProgress = schedule.scrollProgress;
  const scrollbarEnabled = schedule.canGoBackward || schedule.canGoForward;

  const onAddEntry = (dayIndex: number) => schedule.addTimeEntry(dayIndex);

  const onRemoveEntry = (dayIndex: number, timeIndex: number) =>
    schedule.removeTimeEntry(dayIndex, timeIndex);

  const onUpdateEntry = (dayIndex: number, timeIndex: number, time: string) =>
    schedule.updateTimeEntry(dayIndex, timeIndex, time);

  return (
    <>
      <WeeklyScheduleTableGroup
        days={schedule.days}
        templateDays={schedule.templateDays}
        paginationIndex={schedule.index}
        showTemplates={schedule.showTemplates}
        onAddEntryClick={onAddEntry}
        onRemoveEntryClick={onRemoveEntry}
        onTimeChange={onUpdateEntry}
      />
      {scrollbarEnabled && (
        <Scrollbar progress={scrollbarProgress} size={scrollbarSize} />
      )}
    </>
  );
});

export default WeeklyScheduleContainer;
