import Select from "../../global/inputs/select";
import Input from "../../global/inputs/input";
import Radio from "../../global/inputs/radio";
import Text from "../../global/inputs/text";
import Textarea from "@/components/global/inputs/textarea";
import {
  nameOptions,
  majorOptions,
  graduationOptions,
  questionOptions,
  techStackOptions,
} from "@/data/profile/profile-information";

const Information = () => {
  return (
    <div className="h-1/2 rounded-xl border-4 border-gray-300">
      <Text meta={nameOptions} />
      <Select meta={majorOptions} />
      <Input />
      <Radio meta={graduationOptions} />
      <Textarea meta={questionOptions} />
      <Select meta={techStackOptions} />
    </div>
  );
};

export default Information;
