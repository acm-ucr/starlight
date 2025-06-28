import Email from "@/components/email";
import { Resend, CreateEmailResponse } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export type ids = "confirmation" | "acceptance" | "rejection";
export type tracks = "Spark" | "Forge" | "DAS" | "Create";

interface params {
  email: string;
  id: ids;
  name: string;
  track: tracks;
  subject: string;
  preview: string;
}

const send = async ({
  email,
  id,
  name,
  track,
  subject,
  preview,
}: params): Promise<CreateEmailResponse> => {
  const { data, error } = await resend.emails.send({
    from: "starlight@ucrhighlanders.org",
    to: [email],
    subject: subject,
    text: `Hello ${name},\n\nYour track: ${track}\nPreview: ${preview}`,
    // eslint-disable-next-line new-cap
    react: Email({ id, name, track, preview }),
  });

  return { data, error };
};

export default send;
