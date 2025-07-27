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
  deleteField,
} from "firebase/firestore";
import { authenticate } from "@/utils/auth";
import { ATTRIBUTES, AUTH } from "@/data/admin/dashboard";
import send from "@/utils/email";

const types = new Set(["admin", "spark", "create", "forge", "das"]);

const typeKeyMap = {
  admin: "admin",
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
    try {
      await updateDoc(doc(db, "users", user.id), {
        ...element,
        timestamp: Timestamp.now(),
        [`roles.${firestoreType}`]: "0",
      });
      send({
        email: user.email,
        id: "confirmation",
        name: user.firstName,
        track: params.type,
        subject: `ACM ${params.type} Thank you for applying!`,
        preview: `Thank you for applying to ACM ${params.type}`,
      });
    } catch (err) {
      return res.json({ message: `error: ${err}` }, { status: 500 });
    }
  }

  return res.json({ message: "OK" }, { status: 200 });
};

export const GET = async (req, context) => {
  const size = req.nextUrl.searchParams.get("size");
  const last = req.nextUrl.searchParams.get("last");
  const affiliation = req.nextUrl.searchParams.get("affiliation");
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
      if (firestoreType === "admin" && affiliation) {
        snapshot = await getDocs(
          query(
            collection(db, "users"),
            orderBy(`roles.${firestoreType}`),
            where(`roles.${firestoreType}`, "in", ["-1", "0", "1"]),
            where(`affiliation`, `array-contains`, affiliation),
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
            startAfter(lastDocument),
            limit(size),
          ),
        );
      }
    } else {
      if (firestoreType === "admin" && affiliation) {
        snapshot = await getDocs(
          query(
            collection(db, "users"),
            orderBy(`roles.${firestoreType}`),
            where(`roles.${firestoreType}`, "in", ["-1", "0", "1"]),
            where(`affiliation`, `array-contains`, affiliation),
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

    const countFromServer = affiliation
      ? await getCountFromServer(
          query(
            collection(db, "users"),
            where(`roles.${firestoreType}`, "in", ["-1", "0", "1"]),
            where(`affiliation`, `array-contains`, affiliation),
          ),
        )
      : await getCountFromServer(
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

export const PUT = async (req, context) => {
  const res = NextResponse;
  const { objects, status } = await req.json();
  const params = await context.params;
  const firestoreType = typeKeyMap[params.type];
  const { auth, message } = await authenticate(AUTH.PUT[firestoreType]);

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }
  try {
    if (types.has(params.type)) {
      objects.map(async (object) => {
        await updateDoc(doc(db, "users", object.uid), {
          [`roles.${firestoreType}`]: status,
          [`interviewNotes.${params.type}`]: object.interviewNotes,
        });
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

export const DELETE = async (req, context) => {
  const res = NextResponse;
  const params = await context.params;
  const firestoreType = typeKeyMap[params.type];
  const { auth, message } = await authenticate(AUTH.DELETE[firestoreType]);
  const objects = await req.json();

  if (auth !== 200) {
    return res.json(
      { message: `Authentication Error: ${message}` },
      { status: auth },
    );
  }
  try {
    if (types.has(params.type)) {
      await Promise.all(
        objects.map(async ({ uid }) => {
          await updateDoc(doc(db, "users", uid), {
            [`roles.${firestoreType}`]: deleteField(),
          });
        }),
      );
    }
    return res.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    return res.json(
      { message: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
};
