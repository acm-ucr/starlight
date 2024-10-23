import Button from "@/components/global/button";
import Radio from "@/components/global/inputs/radio";
import Textarea from "@/components/global/inputs/textarea";
import Select from "@/components/global/inputs/select";
import Text from "@/components/global/inputs/text";
import { Questions } from "@/types/questions";

interface props {
  title: string;
  questions: Questions[];
}

const Application = ({ title, questions }: props) => {
  return (
    <div className="rounded-md border-2 border-black">
      <p>Apply to {title}</p>

      <Text
        meta={{
          type: "text",
          title: "Name",
          placeholder: "Enter a Name",
          maxLength: 250,
          value: "SAMPLE NAME",
          disabled: true,
        }}
      />

      <Text
        meta={{
          type: "text",
          title: "Email",
          placeholder: "Enter an Email",
          maxLength: 250,
          value: "SAMPLE EMAIL",
          disabled: true,
        }}
      />

      {questions.map((question, index) => {
        const { type } = question;

        if (type === "radio") return <Radio meta={question} key={index} />;
        if (type === "textarea")
          return <Textarea meta={question} key={index} />;
        if (type === "select") return <Select meta={question} key={index} />;
      })}

      <Button>Submit</Button>
    </div>
  );
};

export default Application;
