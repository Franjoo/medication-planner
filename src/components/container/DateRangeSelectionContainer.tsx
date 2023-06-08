import { useStore } from "../../hooks/useStores";
import { observer } from "mobx-react";
import DateRangeSelectionGroup from "../groups/DateRangeSelectionGroup";
import { first, last } from "../../utils";

const DateRangeSelectionContainer = observer(() => {
  const { schedule } = useStore();
  const onNavigateToPrevious = () => console.log("bar");
  const onNavigateToNext = () => console.log("foo");
  const previousDisabled = true;
  const nextDisabled = false;

  const onStartChange = (value: string) => {
    schedule.setRangeStart(new Date(value));
  };
  const onEndChange = (value: string) => {
    schedule.setRangeEnd(new Date(value));
  };

  const minEnd = schedule.rangeStart;
  const start = schedule.rangeStart;
  const end = schedule.rangeEnd;

  return (
    <DateRangeSelectionGroup
      onPreviousClick={onNavigateToPrevious}
      onNextClick={onNavigateToNext}
      previousDisabled={previousDisabled}
      nextDisabled={nextDisabled}
      dayRangeCount={schedule.daysCount}
      onStartChange={onStartChange}
      onEndChange={onEndChange}
      start={start}
      end={end}
      minEnd={minEnd}
    />
  );
});

export default DateRangeSelectionContainer;
