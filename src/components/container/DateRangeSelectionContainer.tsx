import { useStore } from "../../hooks/useStores";
import { observer } from "mobx-react";
import DateRangeSelectionGroup from "../groups/DateRangeSelectionGroup";
import { useEffect } from "react";
import { KEY_LEFT, KEY_RIGHT } from "../../constants";

const DateRangeSelectionContainer = observer(() => {
  const { schedule } = useStore();

  useEffect(() => {
    const keyListener = (event: KeyboardEvent) => {
      if (event.key === KEY_LEFT) schedule.previous();
      if (event.key === KEY_RIGHT) schedule.next();
      event.stopPropagation();
    };

    document.addEventListener("keyup", keyListener);
    return () => {
      document.removeEventListener("keyup", keyListener);
    };
  }, [schedule]);

  const onStartChange = (value: string) => {
    if (value.length === 0) return schedule.clearDays();
    schedule.setRangeStart(new Date(value));
  };
  const onEndChange = (value: string) => {
    if (value.length === 0) return schedule.clearDays();
    schedule.setRangeEnd(new Date(value));
  };

  const minEnd = schedule.rangeStart;
  const start = schedule.rangeStart;
  const end = schedule.rangeEnd;

  return (
    <DateRangeSelectionGroup
      previousEnabled={schedule.canGoBackward}
      nextEnabled={schedule.canGoForward}
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
