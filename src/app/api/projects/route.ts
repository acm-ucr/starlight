import { NextResponse } from "next/server";
import { db } from "@/utils/firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { authenticate } from "@/utils/auth";
import { AUTH } from "@/data/admin/dashboard";

export const GET = async (req: Request) => {
  const res = NextResponse;
  const { auth, message } = await authenticate(AUTH.POST);

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }

  try {
    const { program }: { program: string } = await req.json();
    if (!program) {
      return res.json({ message: "Invalid request body" }, { status: 400 });
    }

    const docSnap = await getDoc(doc(db, "projects", program));
    if (!docSnap.exists()) {
      return res.json(
        { message: `Document "${program}" not found` },
        { status: 404 },
      );
    }

    const data = docSnap.data();
    const projects = data.projects || [];

    return res.json({ message: "OK", projects }, { status: 200 });
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
    const { program, project }: { program: string; project: string } =
      await req.json();
    if (!program || !project) {
      return res.json({ message: "Invalid request body" }, { status: 400 });
    }

    const docRef = doc(db, "projects", program);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return res.json(
        { message: `Document "${program}" not found` },
        { status: 404 },
      );
    }
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${err}` },
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
    const { program, projects }: { program: string; projects: string[] } =
      await req.json();
    if (!program || !Array.isArray(projects)) {
      return res.json({ message: "Invalid request body" }, { status: 400 });
    }
    const docRef = doc(db, "projects", program);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return res.json(
        { message: `Document "${program}" not found` },
        { status: 404 },
      );
    }
    const currentProjects = docSnap.data().projects || [];
    const updatedProjects = currentProjects.filter(
      (proj: string) => !projects.includes(proj),
    );
    await updateDoc(docRef, {
      projects: updatedProjects,
    });
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};
