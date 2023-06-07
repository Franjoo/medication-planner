import { B } from "../atoms/Typography";
import Cell from "../atoms/Cell";
import DateInput from "../atoms/DateInput";
import { useRef } from "react";
import { format } from "date-fns";

interface Props {
  title: string;
  onClick?: () => void;
  className?: string;
  onChange: (value: string) => void;
}

const DateInputCellGroup = ({ title, onClick, className, onChange }: Props) => {
  const ref = useRef<HTMLInputElement | null>(null);

  const showPicker = () => {
    const input = ref?.current;
    if (!input) return;
    if (!input.value) {
      input.value = format(new Date(), "yyyy-MM-dd");
      onChange(input.value);
    }
    input.showPicker();
  };

  return (
    <label className="mr-3 block text-center">
      <B className="mb-3">{title}</B>
      <Cell>
        <span onClick={showPicker}>
          <DateInput onChange={onChange} ref={ref} />
        </span>
      </Cell>
    </label>
  );
};

export default DateInputCellGroup;
