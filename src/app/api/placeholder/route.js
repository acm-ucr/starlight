import { NextResponse } from "next/server";
import { db } from "@/utils/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { authenticate } from "@/utils/auth";

export const POST = async (req) => {
  const res = NextResponse;
  const { auth, message, user } = await authenticate();

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }

  try {
    const body = await req.json();
    await setDoc(
      doc(db, "users", user.id),
      {
        ...body,
        timestamp: Timestamp.now(),
        roles: {
          ...user.roles,
          admins: 0,
        },
      },
      { merge: true },
    );

    return res.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};
