import React, { ChangeEvent, forwardRef } from "react";

interface Props {
  onChange: (value: string) => void;
  minValue?: string;
  maxValue?: string;
}

const DateInput = forwardRef<HTMLInputElement | null, Props>(
  ({ onChange, minValue, maxValue }: Props, ref) => {
    const onValueChange = (event: ChangeEvent<HTMLInputElement> | string) => {
      if (typeof event === "string") return onChange(event);
      onChange(event.target.value);
    };

    return (
      <input
        ref={ref}
        onChange={onValueChange}
        type="date"
        min={minValue}
        max={maxValue}
        className="pointer-events-none select-none text-center"
      />
    );
  }
);

export default DateInput;
