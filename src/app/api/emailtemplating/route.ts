import { NextResponse } from "next/server";
import { db } from "@/utils/firebase";
import { getDoc, doc, collection, getDocs } from "firebase/firestore";
import { authenticate } from "@/utils/auth";
import { AUTH } from "@/data/admin/dashboard";

export const GET = async (req: Request) => {
  const res = NextResponse;
  const { auth, message } = await authenticate(AUTH.GET);

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }

  const url = new URL(req.url);
  const program = url.searchParams.get("program");

  if (!program) {
    return res.json(
      { message: "Missing `program` query parameter" },
      { status: 400 },
    );
  }
  try {
    const programDocSnap = await getDoc(doc(db, "templates", program));
    if (!programDocSnap.exists()) {
      return res.json(
        { message: `Document "${program}" not found` },
        { status: 404 },
      );
    }
    const acceptCollection = collection(db, "templates", program, "accept");
    const rejectCollection = collection(db, "templates", program, "reject");
    const interviewCollection = collection(
      db,
      "templates",
      program,
      "interview",
    );

    const [acceptSnap, rejectSnap, interviewSnap] = await Promise.all([
      getDocs(acceptCollection),
      getDocs(rejectCollection),
      getDocs(interviewCollection),
    ]);

    const acceptDocs = acceptSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
    const rejectDocs = rejectSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
    const interviewDocs = interviewSnap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    const allTemplates = [...acceptDocs, ...rejectDocs, ...interviewDocs];
    return res.json(
      { message: "OK", templates: allTemplates },
      { status: 200 },
    );
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};
