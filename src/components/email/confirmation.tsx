import { tracks } from "@/utils/email";
import Template from "./template";
import { Text } from "@react-email/components";

interface ConfirmationProps {
  name: string;
  track: tracks;
  preview: string;
}

const Confirmation = ({ name, track, preview }: ConfirmationProps) => {
  return (
    <Template name={name} preview={preview}>
      <Text>
        Thank you for applying to <strong>ACM {track}</strong>!
      </Text>
      <Text>
        please make sure to schedule an interview and keep an eye out for an
        email regarding your application soon.
      </Text>
    </Template>
  );
};

export default Confirmation;
