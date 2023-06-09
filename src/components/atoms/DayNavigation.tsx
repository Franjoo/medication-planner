import { ReactComponent as IconChevronRight } from "./../../assets/chevron-right.svg";
import { ReactComponent as IconChevronLeft } from "./../../assets/chevron-left.svg";
import clsx from "clsx";

interface Props {
  previousEnabled: boolean;
  nextEnabled: boolean;
}

const DayNavigation = ({ previousEnabled, nextEnabled }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <div className="py-3">&nbsp;</div>
      <div className="flex grow items-end">
        <IconChevronLeft className={clsx({ "opacity-30": !previousEnabled })} />
        <IconChevronRight className={clsx({ "opacity-30": !nextEnabled })} />
      </div>
    </div>
  );
};

export default DayNavigation;
