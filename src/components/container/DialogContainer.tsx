import DialogGroup from "../groups/DialogGroup";
import { useStore } from "../../hooks/useStores";
import { observer } from "mobx-react";
import { useEffect, useRef } from "react";

const DialogContainer = observer(() => {
  const { schedule } = useStore();
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (schedule.sent) {
      dialogRef?.current?.showModal();
    }
  }, [schedule.sent]);

  const onNewScheduleClick = () => {
    dialogRef?.current?.close();
    schedule.resetTimesAndAutoComplete();
    schedule.resetSentStatus();
  };

  return (
    <DialogGroup onNewScheduleClick={onNewScheduleClick} ref={dialogRef} />
  );
});

export default DialogContainer;
