import { z } from "zod";
import { PROGRAMS } from "@/data/programs";

export const schema = z.object({
  firstName: z.string().min(1, { message: "Last name is invalid" }),
  lastName: z.string().min(1, { message: "Last name is invalid" }),
  email: z.string().email({ message: "Invalid email address" }),
  discord: z.string().min(1, { message: "Discord username is invalid" }),
  program: z.enum(Object.values(PROGRAMS) as [string, ...string[]], {
    message: "Please select your PROGRAM",
  }),
});
