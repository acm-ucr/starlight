import NextAuth from "next-auth";
import { getAuthOptions } from "@/utils/auth";

export const dynamic = "force-dynamic";
const handler = async (req: Request, res: Response) => {
  return NextAuth(getAuthOptions())(req, res);
};

export { handler as GET, handler as POST };
