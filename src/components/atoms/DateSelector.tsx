import { B } from "./Typography";

interface Props {
  title: string;
  onClick?: () => void;
  className?: string;
}

const DateSelector = ({ title, onClick, className }: Props) => {
  return (
    <div className="mr-3 flex flex-col items-center">
      <B className="pb-3">{title}</B>
      <B className="flex min-h-[48px] min-w-[160px] items-center justify-center border-1 border-black">
        27.02.2023
      </B>
    </div>
  );
};

export default DateSelector;
