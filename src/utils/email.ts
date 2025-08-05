import Email from "@/components/email";
import { Resend } from "resend";

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

const send = async ({ email, id, name, track, subject, preview }: params) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { data, error } = await resend.emails.send({
      from: "starlight@ucrhighlanders.org",
      to: [email],
      subject: subject,
      text: `Hello ${name},\n\nYour track: ${track}\nPreview: ${preview}`,
      react: Email({ id, name, track, preview }),
    });
    if (error) {
      return Response.json({ error }, { status: 500 });
    }
    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
};

export default send;
