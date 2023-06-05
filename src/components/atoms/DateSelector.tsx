interface Props {
  title: string;
  onClick?: () => void;
  className?: string;
}

const DateSelector = ({ title, onClick, className }: Props) => {
  return (
    <div className="flex flex-col items-center mr-3">
      <div className="p-3">{title}</div>
      <div className="p-3 border-1 border-black">27.02.2023</div>
    </div>
  );
};

export default DateSelector;
