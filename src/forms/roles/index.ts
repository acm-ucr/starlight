import { title as LeadTitle, description as LeadDescription } from "./admin";
import {
  title as DirectorTitle,
  description as DirectorDescription,
} from "./director";

interface meta {
  title: string;
  description: string;
}

export const roles = (role: string): meta => {
  if (role === "admin")
    return { title: LeadTitle, description: LeadDescription };
  if (role === "director")
    return { title: DirectorTitle, description: DirectorDescription };

  return { title: "", description: "" };
};
