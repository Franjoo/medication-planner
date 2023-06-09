import { B } from "./Typography";

interface Props {
  onClick: () => void;
}

const AddTimeEntry = ({ onClick }: Props) => {
  return (
    <div
      className="bg-grey-5C mb-3 flex h-cell w-cell cursor-pointer items-center justify-center border-1 border-black"
      onClick={onClick}
    >
      <B className="flex items-center justify-center text-white">Add Time</B>
    </div>
  );
};

export default AddTimeEntry;
