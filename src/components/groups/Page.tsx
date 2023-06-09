import { ReactElement } from "react";
import { H2 } from "../atoms/Typography";

interface Props {
  children?: ReactElement[] | ReactElement;
  title: string;
}

const Page = ({ children, title }: Props) => {
  return (
    <>
      <div className="w-[1280px] p-12">
        <H2>{title}</H2>
        {children}
      </div>
    </>
  );
};

export default Page;
