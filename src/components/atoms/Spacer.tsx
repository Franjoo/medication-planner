import clsx from "clsx";

interface Props {
  className?: string;
  width?: number;
  height?: number;
  block?: boolean;
}

const Spacer = ({ className, width = 0, height = 0, block = false }: Props) => (
  <>
    {(className || width || height) && (
      <span
        className={clsx(className, { block: block })}
        style={{ width: width, height: height }}
      />
    )}
  </>
);

export default Spacer;
