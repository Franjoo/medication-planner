interface Props {
  className?: string;
  width?: number;
  height?: number;
}

const Spacer = ({ className, width = 0, height = 0 }: Props) => (
  <>
    {(className || width || height) && (
      <span className={className} style={{ width: width, height: height }} />
    )}
  </>
);

export default Spacer;
