import React, { ChangeEvent, forwardRef } from "react";

interface Props {
  defaultValue?: string;
  onChange: (value: string) => void;
  minValue?: string;
  // ref: React.MutableRefObject<HTMLInputElement | null>;
}

const DateInput = forwardRef<HTMLInputElement | null, Props>(
  ({ defaultValue, onChange, minValue }: Props, ref) => {
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
        // max="23:59"
        className="themed-selection-color pointer-events-none select-none text-center"
        // unselectable="on"
      />
    );
  }
);

export default DateInput;
