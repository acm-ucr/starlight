import Select from "../../global/inputs/select";
import Input from "../../global/inputs/input";
import Radio from "../../global/inputs/radio";
import Textarea from "../../global/inputs/textarea";

const Information = () => {
  return (
    <div className="h-1/2 rounded-xl border-4 border-gray-300">
      Personal Information
      <Select />
      <Input />
      <Radio />
      <Textarea />
      <Select />
    </div>
  );
};

export default Information;
