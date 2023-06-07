import React from "react";

interface Props {
  defaultValue?: string;
  onEnterUp?: () => void;
}

const TimeInput = ({ defaultValue = "10:00", onEnterUp }: Props) => {
  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") onEnterUp?.();
  };

  return (
    <input
      autoFocus
      defaultValue={defaultValue}
      type="time"
      min="00:00"
      max="23:59"
      className="themed-selection-color"
      required
      onKeyUp={onKeyUp}
    />
  );
};

export default TimeInput;
