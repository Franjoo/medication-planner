import WeeklyScheduleTableGroup from "../groups/WeeklyScheduleTableGroup";
import { useStore } from "../../hooks/useStores";
import { observer } from "mobx-react";
import Scrollbar from "../atoms/Scrollbar";
import { clamp } from "../../utils";
import AutoCompleteBlocks from "../groups/AutomCompleteBlocksGroup";
import { useMemo } from "react";
import { MAX_ITEMS_PER_PAGE } from "../../constants";

const WeeklyScheduleContainer = observer(() => {
  const { schedule } = useStore();

  const displayDays = useMemo(() => {
    return (
      schedule.showAutoCompletes ? schedule.autoDays : schedule.days
    ).slice(
      schedule.firstItemIndex,
      schedule.firstItemIndex + MAX_ITEMS_PER_PAGE
    );
  }, [
    schedule.autoDays,
    schedule.days,
    schedule.firstItemIndex,
    schedule.showAutoCompletes,
  ]);

  const onAddEntryClick = (dayIndex: number) => schedule.addTimeEntry(dayIndex);
  const onRemoveEntryClick = (dayIndex: number, timeIndex: number) =>
    schedule.removeTimeEntry(dayIndex, timeIndex);

  const scrollbarSize = clamp(schedule.days.length / 100, 0, 1);
  const scrollbarEnabled = schedule.canGoBackward || schedule.canGoForward;

  return (
    <>
      <WeeklyScheduleTableGroup
        displayDays={displayDays}
        firstItemIndex={schedule.firstItemIndex}
        showAutoCompletes={schedule.showAutoCompletes}
        onAddEntry={onAddEntryClick}
        onRemoveEntry={onRemoveEntryClick}
        onUpdateEntry={schedule.updateTimeEntry}
      />
      <AutoCompleteBlocks
        showAutoCompletes={schedule.showAutoCompletes}
        templateLength={schedule.templateLength}
        firstItemIndex={schedule.firstItemIndex}
        days={schedule.days}
      />
      {scrollbarEnabled && (
        <Scrollbar
          progress={schedule.paginationProgress}
          size={scrollbarSize}
        />
      )}
    </>
  );
});

export default WeeklyScheduleContainer;
