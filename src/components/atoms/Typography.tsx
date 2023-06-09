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
  <h2
    className={clsx(
      "mb-10 font-inter text-3xl text-black",
      fontStyles(props),
      props.style
    )}
  >
    {props.children}
  </h2>
);

export const H2: FC<ITypography> = (props) => (
  <h2
    className={clsx(
      "mb-11 font-inter text-2xl font-semibold text-black",
      fontStyles(props),
      props.style
    )}
  >
    {props.children}
  </h2>
);

export const B: FC<ITypography> = (props) => (
  <p
    className={clsx(
      "font-inter text-lg text-black",
      fontStyles(props),
      props.style
    )}
  >
    {props.children}
  </p>
);
