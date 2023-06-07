import { useStore } from "../../hooks/useStores";
import { observer } from "mobx-react";
import DateRangeSelectionGroup from "../groups/DateRangeSelectionGroup";

const DateRangeSelectionContainer = observer(() => {
  const { schedule } = useStore();
  const onNavigateToPrevious = () => console.log("bar");
  const onNavigateToNext = () => console.log("foo");
  const navigateToPreviousDisabled = true;
  const navigateToNextDisabled = false;

  const onStartChange = (value: string) => {
    schedule.setRangeStart(new Date(value));
  };
  const onEndChange = (value: string) => {
    schedule.setRangeEnd(new Date(value));
  };

  return (
    <DateRangeSelectionGroup
      onNavigateToPrevious={onNavigateToPrevious}
      onNavigateToNext={onNavigateToNext}
      navigateToPreviousDisabled={navigateToPreviousDisabled}
      navigateToNextDisabled={navigateToNextDisabled}
      dayRangeCount={schedule.daysCount}
      onStartChange={onStartChange}
      onEndChange={onEndChange}
    />
  );
});

export default DateRangeSelectionContainer;
