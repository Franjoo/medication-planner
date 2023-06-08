import React, { ChangeEvent, forwardRef } from "react";

interface Props {
  defaultValue?: string;
  onChange: (value: string) => void;
  minValue?: string;
  maxValue?: string;
  value?: string;
}

const DateInput = forwardRef<HTMLInputElement | null, Props>(
  ({ defaultValue, onChange, minValue, maxValue, value }: Props, ref) => {
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
        className="themed-selection-color pointer-events-none select-none text-center"
        // unselectable="on"
      />
    );
  }
);

export default DateInput;
