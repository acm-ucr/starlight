import { RadioInput } from "@/types/questions";
import Button from "../button";

const Radio = ({ meta }: { meta: RadioInput }) => {
  const { title, options } = meta;

  return (
    <div>
      <p>{title}</p>
      {options.map((option, index) => (
        <Button key={index}>{option}</Button>
      ))}
    </div>
  );
};

export default Radio;
