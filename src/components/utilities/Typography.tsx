import { FC, PropsWithChildren } from "react";
import clsx from "clsx";

interface ITypography extends PropsWithChildren {
  className?: string;
  bold?: boolean;
  underline?: boolean;
  style?: string;
}

const fontStyles = (props: ITypography) => {
  let styles = "";
  if (props.bold) styles += "font-bold ";
  if (props.underline) styles += "underline ";
  if (props.className) styles += props.className;
  return styles;
};

export const H1: FC<ITypography> = (props) => (
  <h1
    className={clsx(
      "font-inter text-2xl font-semibold text-black",
      fontStyles(props),
      props.style
    )}
  >
    {props.children}
  </h1>
);
