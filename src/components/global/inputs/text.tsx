import { TextInput } from "@/types/questions";

const Text = ({ meta }: { meta: TextInput }) => {
  const { title, placeholder, value } = meta;

  return (
    <div>
      {title} {placeholder} {value}
    </div>
  );
};

export default Text;
