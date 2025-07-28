import { NextResponse } from "next/server";
import { db } from "@/utils/firebase";
import { getDoc, doc, collection, getDocs, setDoc } from "firebase/firestore";
import { authenticate } from "@/utils/auth";
import { AUTH } from "@/data/admin/dashboard";

type TemplatePayload = {
  program: string;
  season: string;
  year: string;
  status: string;
  projectName: string;
  location: string;
  timeful: string;
  repo: string;
  beginningWeekOf: string; // comes in as string
};

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

export const POST = async (req: Request) => {
  const res = NextResponse;
  const { auth, message } = await authenticate(AUTH.POST);
  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }

  try {
    const body = (await req.json()) as Partial<TemplatePayload>;

    const {
      program,
      season,
      year,
      status,
      location,
      timeful,
      repo,
      beginningWeekOf,
    } = body;

    if (
      !program ||
      !season ||
      !year ||
      !status ||
      !location ||
      !timeful ||
      !repo ||
      !beginningWeekOf
    ) {
      return res.json({ message: "Invalid request body" }, { status: 400 });
    }

    const programDocRef = doc(db, "templates", program.toLowerCase());
    await setDoc(programDocRef, { merge: true });

    const collectionRef = collection(programDocRef, status.toLowerCase());
    const docId = `${season.toLowerCase()}${year}`;
    const docRef = doc(collectionRef, docId);

    const data = {
      program: program.toLowerCase(),
      season,
      year,
      status,
      location,
      timeful,
      repo,
      beginningWeekOf: new Date(beginningWeekOf),
    };

    await setDoc(docRef, data);

    return res.json(
      { message: "Document created successfully", id: docRef.id },
      { status: 201 },
    );
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${(err as Error).message}` },
      { status: 500 },
    );
  }
};
/* export const DELETE = async (req: Request) => {
  const res = NextResponse;
  const { auth, message} = await authenticate (AUTH.DELETE);
  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }
  try{
    
  }
} */
