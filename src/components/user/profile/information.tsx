import Select from "../../global/inputs/select";
import Radio from "../../global/inputs/radio";
import Text from "../../global/inputs/text";
import Textarea from "@/components/global/inputs/textarea";
import { questions } from "@/data/profile/profile-information";

const Information = () => {
  return (
    <div className="h-1/2 rounded-xl border-4 border-gray-300">
      {questions.map((question, index) => {
        const { type } = question;

        if (type === "radio") return <Radio meta={question} key={index} />;
        if (type === "textarea")
          return <Textarea meta={question} key={index} />;
        if (type === "select") return <Select meta={question} key={index} />;
        if (type === "text") return <Text meta={question} key={index} />;
      })}
    </div>
  );
};

export default Information;
