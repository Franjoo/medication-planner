import { forwardRef } from "react";
import Button from "../atoms/Button";
import { H1 } from "../atoms/Typography";

interface Props {
  onNewScheduleClick: () => void;
}

const DialogGroup = forwardRef<HTMLDialogElement | null, Props>(
  ({ onNewScheduleClick }: Props, ref) => {
    return (
      <dialog
        className="border-2 border-black px-20 py-10 text-center backdrop:bg-black-transparent"
        ref={ref}
      >
        <H1>
          Medication Plan
          <br />
          successfully created
        </H1>
        <Button
          text="create another plan"
          style="secondary"
          onClick={onNewScheduleClick}
          className={"h-auto w-auto p-3"}
        />
      </dialog>
    );
  }
);

export default DialogGroup;
