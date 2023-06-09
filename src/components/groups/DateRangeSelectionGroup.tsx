import DateInputCellGroup from "./DateInputCellGroup";
import DateRangeDisplay from "../atoms/DateRangeDisplay";
import DayNavigation from "../atoms/DayNavigation";
import Divider from "../atoms/Divider";

interface Props {
  dayRangeCount: number;
  previousEnabled: boolean;
  nextEnabled: boolean;
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
  start?: Date;
  end?: Date;
  minEnd?: Date;
}

const DateRangeSelectionGroup = ({
  dayRangeCount,
  previousEnabled,
  nextEnabled,
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
          {dayRangeCount > 0 && (
            <DateRangeDisplay dayRangeCount={dayRangeCount} />
          )}
        </div>
        <DayNavigation
          nextEnabled={nextEnabled}
          previousEnabled={previousEnabled}
        />
      </div>
      <Divider />
    </>
  );
};

export default DateRangeSelectionGroup;
