import { Day } from "../../models";
import ScheduleTableItemGroup from "./ScheduleTableItemGroup";
import { noop } from "../../utils";

interface Props {
  displayDays: Day[];
  firstItemIndex: number;
  showAutoCompletes: boolean;
  onAddEntry: (dayIndex: number) => void;
  onRemoveEntry: (dayIndex: number, timeIndex: number) => void;
  onUpdateEntry: (dayIndex: number, timeIndex: number, time: string) => void;
}

const WeeklyScheduleTableGroup = ({
  displayDays,
  firstItemIndex,
  onAddEntry,
  onRemoveEntry,
  onUpdateEntry,
}: Props) => {
  const onUpdateEntryClick =
    (index: number) => (timeIndex: number, time: string) =>
      onUpdateEntry(firstItemIndex + index, timeIndex, time);

  const onAddEntryClick = (index: number) => () =>
    onAddEntry(firstItemIndex + index);

  const onRemoveEntryClick = (index: number) => (timeIndex: number) =>
    onRemoveEntry(firstItemIndex + index, timeIndex);

  return (
    <div className="flex [&>*:last-child]:mr-0">
      {displayDays?.length === 0 && <ScheduleTableItemGroupDummy />}
      {displayDays.map((day, index) => (
        <ScheduleTableItemGroup
          key={index}
          day={day}
          onAddEntryClick={onAddEntryClick(index)}
          onRemoveEntryClick={onRemoveEntryClick(index)}
          onUpdateEntryClick={onUpdateEntryClick(index)}
          style={day.style}
        />
      ))}
    </div>
  );
};

const ScheduleTableItemGroupDummy = () => (
  <ScheduleTableItemGroup
    day={{ weekday: "template", times: [], date: 0 }}
    onUpdateEntryClick={noop}
    onAddEntryClick={noop}
    onRemoveEntryClick={noop}
    isPlaceHolder
  />
);

export default WeeklyScheduleTableGroup;
