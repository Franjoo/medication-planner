import { useStore } from "../../hooks/useStores";
import { observer } from "mobx-react";
import DateRangeSelectionGroup from "../groups/DateRangeSelectionGroup";

const DateRangeSelectionContainer = observer(() => {
  const { schedule } = useStore();
  const onNavigateToPrevious = () => console.log("bar");
  const onNavigateToNext = () => console.log("foo");
  const navigateToPreviousDisabled = true;
  const navigateToNextDisabled = false;
  const dayRangeCount = 2;

  return (
    <DateRangeSelectionGroup
      onNavigateToPrevious={onNavigateToPrevious}
      onNavigateToNext={onNavigateToNext}
      navigateToPreviousDisabled={navigateToPreviousDisabled}
      navigateToNextDisabled={navigateToNextDisabled}
      dayRangeCount={2}
    />
  );
});

export default DateRangeSelectionContainer;
