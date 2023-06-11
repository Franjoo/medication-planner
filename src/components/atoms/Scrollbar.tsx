import React from "react";
import { clamp, lerp } from "../../utils";
import useMeasure from "react-use-measure";

interface Props {
  progress: number;
  size: number;
}

const Scrollbar = ({ progress, size }: Props) => {
  const [ref, bounds] = useMeasure();

  const width = lerp(
    bounds.width * 0.1,
    bounds.width * 0.95,
    clamp(1 - size, 0, 1)
  );
  const translateX = (bounds.width - width) * progress;

  return (
    <div className="mb-9 w-full" ref={ref}>
      <div
        className="h-3 bg-black"
        style={{
          width: width + "px",
          transform: `translateX(${translateX}px)`,
        }}
      />
      <div className="h-[1px] w-full bg-black" />
    </div>
  );
};

export default Scrollbar;
