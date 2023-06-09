import DialogGroup from "../groups/DialogGroup";
import { useStore } from "../../hooks/useStores";
import { observer } from "mobx-react";
import { useEffect, useRef } from "react";
import { noop } from "../../utils";

const DialogContainer = observer(() => {
  const { schedule } = useStore();
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (schedule.sent) {
      dialogRef?.current?.showModal();
    }
  }, [schedule.sent]);

  return <DialogGroup onNewScheduleClick={noop} ref={dialogRef} />;
});

export default DialogContainer;
