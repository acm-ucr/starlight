import { TextareaInput } from "@/types/questions";

const Textarea = ({ meta }: { meta: TextareaInput }) => {
  const { title, placeholder } = meta;

  return (
    <div>
      {title} {placeholder}
    </div>
  );
};

export default Textarea;
