import { useStore } from "../../hooks/useStores";
import { observer } from "mobx-react";
import ScheduleActionGroup from "../groups/ScheduleActionGroup";
import ScheduleStatusGroup from "../groups/ScheduleStatusGroup";
import { toJS } from "mobx";
import { useEffect, useMemo } from "react";

const ScheduleActionContainer = observer(() => {
  const { schedule } = useStore();

  const onReset = () => schedule.resetTimesAndAutoComplete();
  const onAutoComplete = () => {
    schedule.autoComplete();
  };
  const onAutoCompleteMouseEnter = () => {
    if (!autoCompleteEnabled) return;
    schedule.setShowAutoCompletes(true);
  };
  const onAutoCompleteMouseLeave = () => {
    if (!autoCompleteEnabled) return;
    schedule.setShowAutoCompletes(false);
  };

  const isIncorrectsMapEmpty = () => {
    for (const set of schedule.incorrects.values()) {
      if (set.size !== 0) return false;
    }
    return true;
  };

  const resetEnabled =
    schedule.days.length > 0 &&
    !!schedule.days.find((value) => value.times.length > 0);

  const uploadEnabled =
    schedule.days.length > 0 &&
    !schedule.days.find((value) => value.times.length === 0) &&
    isIncorrectsMapEmpty();

  const autoCompleteEnabled =
    schedule.days.length > 0 &&
    schedule.days[0].times.length > 0 &&
    !schedule.autoCompleted &&
    !!schedule.days.find((value) => value.times.length === 0) &&
    !!schedule.days.find((value) => value.times.length > 0);

  const onUpload = () => schedule.send();

  const status = isIncorrectsMapEmpty() ? "OK" : "WRONG_ENTRY_ORDER";

  return (
    <>
      <ScheduleStatusGroup status={status} />
      <ScheduleActionGroup
        onReset={onReset}
        onAutoComplete={onAutoComplete}
        onAutoCompleteMouseEnter={onAutoCompleteMouseEnter}
        onAutoCompleteMouseLeave={onAutoCompleteMouseLeave}
        onUpload={onUpload}
        resetEnabled={resetEnabled}
        autoCompleteEnabled={autoCompleteEnabled}
        uploadEnabled={uploadEnabled}
      />
    </>
  );
});

export default ScheduleActionContainer;
