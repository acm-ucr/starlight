import { NextResponse } from "next/server";
import { db } from "@/utils/firebase";
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { authenticate } from "@/utils/auth";
import { ATTRIBUTES } from "@/data/admin/dashboard";

const types = new Set(["admin", "spark", "create", "forge", "das"]);

export const POST = async (req, { params }) => {
  const res = NextResponse;
  const { auth, message, user } = await authenticate();

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }
  const body = await req.json();
  try {
    if (types.has(params.type)) {
      const element = {};
      ATTRIBUTES[params.type].forEach((attribute) => {
        element[attribute] = body[attribute];
      });

      updateDoc(doc(db, "users", user.id), {
        ...element,
        timestamp: Timestamp.now(),
        [`roles.${params.type}`]: "0",
      });
    }

    return res.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};
