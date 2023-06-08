import DateInputCellGroup from "./DateInputCellGroup";
import DateRangeDisplay from "../atoms/DateRangeDisplay";
import DayNavigation from "../atoms/DayNavigation";
import Button from "../atoms/Button";

interface Props {
  onReset: () => void;
  onAutoComplete: () => void;
  onAutoCompleteMouseEnter: () => void;
  onAutoCompleteMouseLeave: () => void;
  onUpload: () => void;
  resetEnabled: boolean;
  autoCompleteEnabled: boolean;
  uploadEnabled: boolean;
}

const ScheduleActionGroup = ({
  onReset,
  onAutoComplete,
  onAutoCompleteMouseEnter,
  onAutoCompleteMouseLeave,
  onUpload,
  resetEnabled,
  autoCompleteEnabled,
  uploadEnabled,
}: Props) => {
  return (
    <div className="flex justify-end">
      <Button
        text={"Reset"}
        style={"primary"}
        onClick={onReset}
        enabled={resetEnabled}
        className="mr-3"
      />
      <Button
        text={"Autocomplete"}
        style={"secondary"}
        onClick={onAutoComplete}
        enabled={autoCompleteEnabled}
        onMouseEnter={onAutoCompleteMouseEnter}
        onMouseLeave={onAutoCompleteMouseLeave}
        className="mr-3"
      />
      <Button
        text={"Upload"}
        style={"primary"}
        onClick={onUpload}
        enabled={uploadEnabled}
      />
    </div>
  );
};

export default ScheduleActionGroup;
