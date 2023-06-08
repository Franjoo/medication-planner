import DateInputCellGroup from "./DateInputCellGroup";
import DateRangeDisplay from "../atoms/DateRangeDisplay";
import DayNavigation from "../atoms/DayNavigation";
import Divider from "../atoms/Divider";

interface Props {
  dayRangeCount: number;
  onNextClick: () => void;
  onPreviousClick: () => void;
  previousDisabled: boolean;
  nextDisabled: boolean;
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
  start?: Date;
  end?: Date;
  minEnd?: Date;
}

const DateRangeSelectionGroup = ({
  dayRangeCount,
  onPreviousClick,
  onNextClick,
  previousDisabled,
  nextDisabled,
  onStartChange,
  onEndChange,
  start,
  end,
  minEnd,
}: Props) => {
  return (
    <>
      <div className="flex justify-between">
        <div className="flex">
          <DateInputCellGroup
            title="Start-Date"
            onChange={onStartChange}
            value={start}
          />
          <DateInputCellGroup
            title="End-Date"
            onChange={onEndChange}
            value={end}
            minValue={minEnd}
          />
          <DateRangeDisplay dayRangeCount={dayRangeCount} />
        </div>
        <DayNavigation
          {...{
            onNextClick,
            onPreviousClick,
            previousDisabled,
            nextDisabled,
          }}

          // onPreviousClick={onNavigateToPrevious}
          // onNextClick={onNavigateToNext}
          // previousDisabled={navigateToPreviousDisabled}
          // nextDisabled={navigateToNextDisabled}
        />
      </div>
      <Divider />
    </>
  );
};

export default DateRangeSelectionGroup;
