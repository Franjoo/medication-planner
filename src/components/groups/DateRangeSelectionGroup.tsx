import DateInputCellGroup from "./DateInputCellGroup";
import DateRangeDisplay from "../atoms/DateRangeDisplay";
import DayNavigation from "../atoms/DayNavigation";
import Divider from "../atoms/Divider";

interface Props {
  dayRangeCount: number;
  onNavigateToNext: () => void;
  onNavigateToPrevious: () => void;
  navigateToNextDisabled: boolean;
  navigateToPreviousDisabled: boolean;
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
}

const DateRangeSelectionGroup = ({
  dayRangeCount,
  onNavigateToPrevious,
  onNavigateToNext,
  navigateToPreviousDisabled,
  navigateToNextDisabled,
  onStartChange,
  onEndChange,
}: Props) => {
  return (
    <>
      <div className="flex justify-between">
        <div className="flex">
          <DateInputCellGroup title="Start-Date" onChange={onStartChange} />
          <DateInputCellGroup title="End-Date" onChange={onEndChange} />
          <DateRangeDisplay dayRangeCount={dayRangeCount} />
        </div>
        <DayNavigation
          onPreviousClick={onNavigateToPrevious}
          onNextClick={onNavigateToNext}
          previousDisabled={navigateToPreviousDisabled}
          nextDisabled={navigateToNextDisabled}
        />
      </div>
      <Divider />
    </>
  );
};

export default DateRangeSelectionGroup;
