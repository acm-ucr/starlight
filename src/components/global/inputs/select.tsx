import { SelectInput } from "@/types/questions";
import Button from "../button";

const Select = ({ meta }: { meta: SelectInput }) => {
  const { options, title } = meta;

  return (
    <div>
      {title}

      {options.map((option, index) => (
        <Button key={index}>{option}</Button>
      ))}
    </div>
  );
};

export default Select;
