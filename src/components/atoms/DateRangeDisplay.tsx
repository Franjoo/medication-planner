import { B } from "./Typography";

interface Props {
  dayRangeCount: number;
}

const DateRangeDisplay = ({ dayRangeCount }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <B className="pb-3">&nbsp;</B>
      <B className="flex min-h-[48px] items-center justify-center">
        {dayRangeCount} days
      </B>
    </div>
  );
};

export default DateRangeDisplay;
