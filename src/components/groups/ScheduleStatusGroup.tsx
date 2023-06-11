import React from "react";
import { B } from "../atoms/Typography";

interface Props {
  status: "OK" | "WRONG_ENTRY_ORDER";
}

const ScheduleStatusGroup = ({ status }: Props) => {
  const TEXT_WRONG_ENTRY_ORDER =
    "One or more time entries are not in the correct order. Resolve the issue to upload the medication plan.";

  return (
    <>
      <B className="my-3 text-right text-red-600">
        {status === "WRONG_ENTRY_ORDER" ? TEXT_WRONG_ENTRY_ORDER : <>&nbsp;</>}
      </B>
    </>
  );
};

export default ScheduleStatusGroup;
