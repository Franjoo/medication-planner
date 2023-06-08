import { B } from "../atoms/Typography";
import Cell from "../atoms/Cell";
import DateInput from "../atoms/DateInput";
import { useEffect, useRef } from "react";
import { format } from "date-fns";
import { toIsoDateString } from "../../utils";

interface Props {
  title: string;
  onClick?: () => void;
  className?: string;
  onChange: (value: string) => void;
  value?: Date;
  minValue?: Date;
}

const DateInputCellGroup = ({
  title,
  onClick,
  className,
  onChange,
  value,
  minValue,
}: Props) => {
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

  const minTime = minValue ? toIsoDateString(minValue) : undefined;
  const currentValue = value ? toIsoDateString(value) : undefined;

  useEffect(() => {
    const input = ref?.current;
    if (!input || !value) return;
    input.value = format(value, "yyyy-MM-dd");
  }, [currentValue, value]);

  return (
    <label className="mr-3 block text-center">
      <B className="mb-3">{title}</B>
      <Cell>
        <span onClick={showPicker}>
          <DateInput onChange={onChange} ref={ref} minValue={minTime} />
        </span>
      </Cell>
    </label>
  );
};

export default DateInputCellGroup;
