import { NextResponse } from "next/server";
import { Resend } from "resend";
/* import { authenticate } from "@/utils/auth";
import { AUTH } from "@/data/admin/dashboard"; */
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "@/utils/firebase";
import Rejection from "@/components/email/rejection";
import capitalize from "@/utils/capitalize";
import SparkInterview from "@/components/email/interview/sparkinterview";
import ForgeInterview from "@/components/email/interview/forgeinterview";
import CreateInterview from "@/components/email/interview/createinterview";
import DasInterview from "@/components/email/interview/dasinterview";
import SparkAccept from "@/components/email/accept/sparkaccept";
import CreateAccept from "@/components/email/accept/createaccept";
const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { templateId, program, status, recipients, projectName } = body;
    const recipientList = recipients || ["contact.acmucr@gmail.com"];

    const docRef = doc(
      db,
      "templates",
      program.toLowerCase(),
      status.toLowerCase(),
      templateId,
    );

    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      throw new Error("No such template document found");
    }
    const data = snapshot.data();

    if (status.toLowerCase() === "accept") {
      switch (data.program.toLowerCase()) {
        case "spark":
          await resend.emails.send({
            from: "starlight@ucrhighlanders.org",
            to: recipientList,
            subject: `[ACM ${capitalize(data.program)}] 🎉 ${projectName} 🎉`,
            react: SparkAccept({
              project: projectName,
              location: data.location,
              repo: data.repo,
              timeful: data.timeful,
              beginningWeekOf: (data.beginningWeekOf as Timestamp).toDate(),
            }),
          });
          break;
        case "forge":
          break;
        case "create":
          await resend.emails.send({
            from: "starlight@ucrhighlanders.org",
            to: recipientList,
            subject: `🎉 [ACM ${capitalize(data.program)}] 🎉`,
            react: CreateAccept({
              beginningWeekOf: (data.beginningWeekOf as Timestamp).toDate(),
            }),
          });
          break;
        case "das":
          break;
      }
    } else if (status.toLowerCase() === "reject") {
      await resend.emails.send({
        from: "starlight@ucrhighlanders.org",
        to: recipientList,
        subject: `[ACM ${capitalize(data.program)}] Application Status Update`,
        react: Rejection({
          program: data.program,
          nextSeason: data.nextSeason,
          nextYear: data.nextYear,
        }),
      });
    } else if (status.toLowerCase() === "interview") {
      switch (data.program.toLowerCase()) {
        case "spark":
          await resend.emails.send({
            from: "starlight@ucrhighlanders.org",
            to: recipientList,
            subject: `[ACM ${capitalize(data.program)}] ${data.season} ${data.year} Program Interview`,
            react: SparkInterview({
              program: data.program,
              calendly: data.calendly,
              completeBy: (data.completeBy as Timestamp).toDate(),
            }),
          });
          break;
        case "forge":
          await resend.emails.send({
            from: "starlight@ucrhighlanders.org",
            to: recipientList,
            subject: `[ACM ${capitalize(data.program)}] ${data.season} ${data.year} Program Interview`,
            react: ForgeInterview({
              program: data.program,
              calendly: data.calendly,
              completeBy: (data.completeBy as Timestamp).toDate(),
            }),
          });
          break;
        case "create":
          await resend.emails.send({
            from: "starlight@ucrhighlanders.org",
            to: recipientList,
            subject: `[ACM ${capitalize(data.program)}] ${data.season} ${data.year} Program Interview`,
            react: CreateInterview({
              program: data.program,
              calendly: data.calendly,
              completeBy: (data.completeBy as Timestamp).toDate(),
            }),
          });
          break;
        case "das":
          await resend.emails.send({
            from: "starlight@ucrhighlanders.org",
            to: recipientList,
            subject: `[ACM ${capitalize(data.program)}] ${data.season} ${data.year} Program Interview`,
            react: DasInterview({
              program: data.program,
              calendly: data.calendly,
              completeBy: (data.completeBy as Timestamp).toDate(),
            }),
          });
          break;
      }
    }

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { message: (err as Error).message || "Internal error" },
      { status: 500 },
    );
  }
};
