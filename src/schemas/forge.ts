import { z } from "zod";

export const schema = z.object({
  firstName: z.string().min(1, { message: "Last name is invalid" }),
  lastName: z.string().min(1, { message: "Last name is invalid" }),
  email: z.string().email({ message: "Invalid email address" }),
  discord: z.string().min(1, { message: "Discord username is invalid" }),
  pastProjects: z.string().min(1, { message: "past projects are invalid" }),
});
