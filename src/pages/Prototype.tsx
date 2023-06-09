import Button from "../components/atoms/Button";
import { noop } from "../utils";

const Prototype = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Button text="Reset" onClick={noop} />
    </div>
  );
};

export default Prototype;
