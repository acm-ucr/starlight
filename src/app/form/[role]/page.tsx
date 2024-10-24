import Button from "@/components/global/button";
import Text from "@/components/global/inputs/text";
import { roles } from "@/forms/roles/index";

interface props {
  params: {
    role: string;
  };
}

const Page = ({ params }: props) => {
  const { role } = params;

  const { title, description } = roles(role);

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <p className="text-2xl font-bold text-starlight-blue">{title}</p>
      <p>{description}</p>

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

      <Button>Submit</Button>
    </div>
  );
};

export default Page;
