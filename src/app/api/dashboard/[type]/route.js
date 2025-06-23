import { NextResponse } from "next/server";
import { db } from "@/utils/firebase";
import {
  doc,
  getDocs,
  getDoc,
  where,
  limit,
  getCountFromServer,
  startAfter,
  collection,
  query,
  orderBy,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { authenticate } from "@/utils/auth";
import { ATTRIBUTES, AUTH } from "@/data/admin/dashboard";

const types = new Set(["admins", "spark", "create", "forge", "das"]);

const typeKeyMap = {
  admins: "admin",
  spark: "spark",
  create: "create",
  forge: "forge",
  das: "das",
};

export const POST = async (req, context) => {
  const res = NextResponse;
  const params = await context.params;
  const { auth, message, user } = await authenticate(AUTH.POST);

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }

  const body = await req.json();

  if (types.has(params.type)) {
    const firestoreType = typeKeyMap[params.type];
    const element = {};
    ATTRIBUTES[params.type].forEach((attribute) => {
      element[attribute] = body[attribute];
    });

    await updateDoc(doc(db, "users", user.id), {
      ...element,
      timestamp: Timestamp.now(),
      [`roles.${firestoreType}`]: "0",
    });
  }

  return res.json({ message: "OK" }, { status: 200 });
};

export const GET = async (req, context) => {
  const size = req.nextUrl.searchParams.get("size");
  const last = req.nextUrl.searchParams.get("last");
  const res = NextResponse;

  const params = await context.params;

  const firestoreType = typeKeyMap[params.type];

  const { auth, message } = await authenticate(AUTH.GET[firestoreType]);

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }

  const output = [];

  try {
    let snapshot;
    if (last !== "undefined") {
      const lastDocument = await getDoc(doc(db, "users", last));

      snapshot = await getDocs(
        query(
          collection(db, "users"),
          orderBy(`roles.${firestoreType}`),
          where(`roles.${firestoreType}`, "in", ["-1", "0", "1"]),
          startAfter(lastDocument),
          limit(size),
        ),
      );
    } else {
      snapshot = await getDocs(
        query(
          collection(db, "users"),
          orderBy(`roles.${firestoreType}`),
          where(`roles.${firestoreType}`, "in", ["-1", "0", "1"]),
          limit(size),
        ),
      );
    }

    snapshot.forEach((doc) => {
      const data = doc.data();
      const element = {};
      ATTRIBUTES[firestoreType].forEach((attribute) => {
        element[attribute] = data[attribute];
      });
      output.push({
        ...element,
        uid: doc.id,
        timestamp: data.timestamp,
        status: data.roles[firestoreType],
        selected: false,
        hidden: false,
      });
    });

    const countFromServer = await getCountFromServer(
      query(
        collection(db, "users"),
        where(`roles.${firestoreType}`, "in", ["-1", "0", "1"]),
      ),
    );

    const total = countFromServer.data().count;
    const lastDoc = output.length > 0 ? output[output.length - 1].uid : "";

    return res.json(
      {
        message: "OK",
        items: output,
        total: total,
        last: lastDoc,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("[API] Error:", err);
    return res.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};
