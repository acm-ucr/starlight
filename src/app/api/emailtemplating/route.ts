import { NextResponse } from "next/server";
import { db } from "@/utils/firebase";
import {
  getDoc,
  doc,
  collection,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { authenticate } from "@/utils/auth";
import { AUTH } from "@/data/admin/dashboard";
import { TemplateFields } from "@/types/emails";

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
    const body = await req.json();
    const { program, season, year, status } = body;

    if (!program || !season || !year || !status) {
      return res.json({ message: "Missing required fields" }, { status: 400 });
    }

    const programDocRef = doc(db, "templates", program.toLowerCase());
    await setDoc(programDocRef, { merge: true });

    const collectionRef = collection(programDocRef, status.toLowerCase());
    const docId = `${program}${season.toLowerCase()}${year}${status.toLowerCase()}`;
    const docRef = doc(collectionRef, docId);

    let data: TemplateFields;

    if (status.toLowerCase() === "accept") {
      data = {
        program: program.toLowerCase(),
        season,
        year,
        status,
        location: body.location,
        timeful: body.timeful,
        repo: body.repo,
        beginningWeekOf: new Date(body.beginningWeekOf),
        contactForHelpBy: new Date(body.contactForHelpBy),
      };
    } else if (status.toLowerCase() === "reject") {
      data = {
        program: program.toLowerCase(),
        season,
        year,
        status,
        nextYear: body.nextYear,
        nextSeason: body.nextSeason,
      };
    } else if (status.toLowerCase() === "interview") {
      data = {
        program: program.toLowerCase(),
        season,
        year,
        status,
        calendly: body.calendly,
        completeBy: new Date(body.completeBy),
      };
    } else {
      return res.json(
        { message: `Invalid status: ${status}` },
        { status: 400 },
      );
    }

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

export const DELETE = async (req: Request) => {
  const res = NextResponse;
  const { auth, message } = await authenticate(AUTH.DELETE);
  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }
  try {
    const { program, templateIds }: { program: string; templateIds: string[] } =
      await req.json();
    if (!program || !templateIds || !templateIds.length) {
      return res.json({ message: "Invalid request body" }, { status: 400 });
    }

    const programRef = doc(db, "templates", program);
    const programSnap = await getDoc(programRef);

    if (!programSnap.exists()) {
      return res.json(
        { message: `Program "${program}" not found` },
        { status: 404 },
      );
    }

    const deletedFrom: string[] = [];
    const statusNames = ["accept", "reject", "interview"];

    for (const templateId of templateIds) {
      for (const status of statusNames) {
        const statusColRef = collection(db, "templates", program, status);
        const docRef = doc(statusColRef, templateId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          await deleteDoc(docRef);
          deletedFrom.push(`${status}:${templateId}`);
        }
      }
    }

    if (deletedFrom.length === 0) {
      return res.json(
        { message: `No templates found with the provided IDs` },
        { status: 404 },
      );
    }

    return res.json(
      { message: `Deleted templates from: ${deletedFrom.join(", ")}` },
      { status: 200 },
    );
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${(err as Error).message}` },
      { status: 500 },
    );
  }
};
