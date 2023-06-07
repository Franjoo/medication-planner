import { useStore } from "../../hooks/useStores";
import { observer } from "mobx-react";

const ScheduleActionContainer = observer(() => {
  const { schedule } = useStore();

  return <></>;
});

export default ScheduleActionContainer;
