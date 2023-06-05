interface Props {
  dayRangeCount: number
}

const DateRangeDisplay = ({ dayRangeCount }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <div className="py-3">&nbsp;</div>
      <div className="py-3">{dayRangeCount}</div>
    </div>
  );
};

export default DateRangeDisplay;
