import { ReactComponent as IconChevronRight } from "./../../assets/chevron-right.svg";
import { ReactComponent as IconChevronLeft } from "./../../assets/chevron-left.svg";
import clsx from "clsx";

interface Props {
  onPreviousClick: () => void;
  onNextClick: () => void;
  previousEnabled: boolean;
  nextEnabled: boolean;
}

const DayNavigation = ({
  onPreviousClick,
  onNextClick,
  previousEnabled,
  nextEnabled,
}: Props) => {
  return (
    <div className="flex flex-col items-center">
      <div className="py-3">&nbsp;</div>
      <div className="flex grow items-end">
        {/* todo touch areas*/}
        <IconChevronLeft
          className={clsx({ "opacity-30": !previousEnabled })}
          onClick={onPreviousClick}
        />
        <IconChevronRight
          className={clsx({ "opacity-30": !nextEnabled })}
          onClick={onNextClick}
        />
      </div>
    </div>
  );
};

export default DayNavigation;
