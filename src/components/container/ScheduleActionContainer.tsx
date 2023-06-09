import { useStore } from "../../hooks/useStores";
import { observer } from "mobx-react";
import ScheduleActionGroup from "../groups/ScheduleActionGroup";

const ScheduleActionContainer = observer(() => {
  const { schedule } = useStore();

  const onReset = () => schedule.resetTimesAndAutoComplete();
  const onAutoComplete = () => {
    schedule.autoComplete();
  };
  const onAutoCompleteMouseEnter = () => {
    if (!schedule.autoCompleteEnabled) return;
    schedule.setShowTemplates(true);
  };
  const onAutoCompleteMouseLeave = () => {
    if (!schedule.autoCompleteEnabled) return;
    schedule.setShowTemplates(false);
  };

  const onUpload = () => schedule.send();

  return (
    <ScheduleActionGroup
      onReset={onReset}
      onAutoComplete={onAutoComplete}
      onAutoCompleteMouseEnter={onAutoCompleteMouseEnter}
      onAutoCompleteMouseLeave={onAutoCompleteMouseLeave}
      onUpload={onUpload}
      resetEnabled={schedule.resetEnabled}
      autoCompleteEnabled={schedule.autoCompleteEnabled}
      uploadEnabled={schedule.uploadEnabled}
    />
  );
});

export default ScheduleActionContainer;
