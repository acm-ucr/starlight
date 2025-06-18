import NextAuth from "next-auth";
import { getAuthOptions } from "@/utils/auth";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export const GET = (req: NextRequest) => {
  return NextAuth(getAuthOptions())(req);
};

export const POST = (req: NextRequest) => {
  return NextAuth(getAuthOptions())(req);
};
