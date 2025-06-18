import NextAuth from "next-auth";
import { getAuthOptions } from "@/utils/auth";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const handler = NextAuth(getAuthOptions());

export const GET = (req: NextRequest) => handler(req);
export const POST = (req: NextRequest) => handler(req);
