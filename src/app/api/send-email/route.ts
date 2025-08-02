import { NextResponse } from "next/server";
import { Resend } from "resend";
/* import { authenticate } from "@/utils/auth";
import { AUTH } from "@/data/admin/dashboard"; */
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Rejection } from "@/components/email/rejection";

const resend = new Resend(process.env.RESEND_API_KEY);

function capitalizeFirstLetter(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { templateId, program, status, recipients } = body;

    const recipientList = recipients || ["contact.acmucr@gmail.com"];

    const subject = `[ACM ${capitalizeFirstLetter(program)}] Application Status Update`;
    if (status.toLowerCase() === "accept") {
      console.log("Sending acceptance email");
    } else if (status.toLowerCase() === "reject") {
      const docRef = doc(
        db,
        "templates",
        program.toLowerCase(),
        status.toLowerCase(),
        templateId,
      );
      const snapshot = await getDoc(docRef);

      if (!snapshot.exists()) {
        console.log(
          "No such document! Here is the templateId:",
          templateId,
          "Here is the program:",
          program,
          "and here is the status:",
          status,
        );
        throw new Error("No such template document found");
      }

      const data = snapshot.data();

      await resend.emails.send({
        from: "starlight@ucrhighlanders.org",
        to: recipientList,
        subject,
        react: Rejection({
          program: data.program,
          nextSeason: data.nextSeason,
          nextYear: data.nextYear,
        }),
      });
    } else if (status.toLowerCase() === "interview") {
      console.log("Sending interview email");
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
