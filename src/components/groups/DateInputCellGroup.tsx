import { B } from "../atoms/Typography";
import Cell from "../atoms/Cell";
import DateInput from "../atoms/DateInput";

interface Props {
  title: string;
  onClick?: () => void;
  className?: string;
}

const DateInputCellGroup = ({ title, onClick, className }: Props) => {
  return (
    <div className="mr-3 flex flex-col items-center">
      <B className="mb-3">{title}</B>
      <Cell>
        <DateInput />
      </Cell>
    </div>
  );
};

export default DateInputCellGroup;
