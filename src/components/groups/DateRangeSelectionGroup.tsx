import DateSelector from "../atoms/DateSelector";
import DateRangeDisplay from "../atoms/DateRangeDisplay";
import DayNavigation from "../atoms/DayNavigation";

interface Props {
  dayRangeCount: number;
  onNavigateToNext: () => void;
  onNavigateToPrevious: () => void;
  navigateToNextDisabled: boolean;
  navigateToPreviousDisabled: boolean;
}

const DateRangeSelectionGroup = ({
  dayRangeCount,
  onNavigateToPrevious,
  onNavigateToNext,
  navigateToPreviousDisabled,
  navigateToNextDisabled,
}: Props) => {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <DateSelector title="Start-Date" />
        <DateSelector title="End-Date" />
        <DateRangeDisplay dayRangeCount={dayRangeCount} />
      </div>
      <DayNavigation
        onPreviousClick={onNavigateToPrevious}
        onNextClick={onNavigateToNext}
        previousDisabled={navigateToPreviousDisabled}
        nextDisabled={navigateToNextDisabled}
      />
    </div>
  );
};

export default DateRangeSelectionGroup;
