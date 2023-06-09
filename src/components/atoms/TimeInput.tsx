import React, { ChangeEvent, forwardRef } from "react";

interface Props {
  onChange: (value: string) => void;
  onEnterUp?: () => void;
}

const TimeInput = forwardRef<HTMLInputElement | null, Props>(
  ({ onChange, onEnterUp }: Props, ref) => {
    const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") onEnterUp?.();
    };
    const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
      console.log("on change", event.target.value);
      onChange(event.target.value);
    };

    return (
      <input
        ref={ref}
        onChange={onValueChange}
        type="time"
        defaultValue="06:00"
        min="00:00"
        max="23:59"
        className="themed-selection-color"
        onKeyUp={onKeyUp}
      />
    );
  }
);

export default TimeInput;
