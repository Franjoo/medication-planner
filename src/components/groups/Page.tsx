import { ReactElement } from "react";
import { H1 } from "../atoms/Typography";

interface Props {
  children?: ReactElement[] | ReactElement;
  title: string;
}

const Page = ({ children, title }: Props) => {
  return (
    <>
      <div className="p-12">
        <H1>{title}</H1>
        {children}
      </div>
    </>
  );
};

export default Page;
