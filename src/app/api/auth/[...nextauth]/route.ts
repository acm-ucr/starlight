import NextAuth from "next-auth";
import { getAuthOptions } from "@/utils/auth";

export const dynamic = "force-dynamic";

const handler = NextAuth(getAuthOptions());

export const GET = handler;
export const POST = handler;
