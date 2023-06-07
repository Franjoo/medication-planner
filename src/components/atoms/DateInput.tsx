import React from "react";

interface Props {
  defaultValue?: string;
}

const DateInput = ({ defaultValue = "10:00" }: Props) => {
  return (
    <input
      autoFocus
      // defaultValue={defaultValue}
      type="date"
      // min="00:00"
      // max="23:59"
      className="themed-selection-color text-center"
      required
    />
  );
};

export default DateInput;
