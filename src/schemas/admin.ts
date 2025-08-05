import { z } from "zod";
import { AFFLIATIONS } from "@/data/information";

export const schema = z.object({
  firstName: z.string().min(1, { message: "Last name is invalid" }),
  lastName: z.string().min(1, { message: "Last name is invalid" }),
  email: z.string().email({ message: "Invalid email address" }),
  discord: z.string().min(1, { message: "Discord username is invalid" }),
  affiliation: z
    .array(z.enum(AFFLIATIONS as [string, ...string[]]))
    .min(1, { message: "Please select at least one affiliation option" }),
});
