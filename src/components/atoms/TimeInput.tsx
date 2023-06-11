import React, { ChangeEvent, forwardRef } from "react";

interface Props {
  onChange: (value: string) => void;
  onEnterPressed?: () => void;
}

const TimeInput = forwardRef<HTMLInputElement | null, Props>(
  ({ onChange, onEnterPressed }: Props, ref) => {
    const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") onEnterPressed?.();
    };
    const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    };

    return (
      <input
        autoFocus
        ref={ref}
        onChange={onValueChange}
        type="time"
        min="00:00"
        max="23:59"
        onKeyUp={onKeyUp}
      />
    );
  }
);

export default TimeInput;
