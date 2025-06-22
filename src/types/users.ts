import { StatusMapping } from "@/data/statuses";

export type Member = {
  firstName: string;
  lastName: string;
  email: string;
  discord: string;
  status: StatusMapping;
};

export type Admin = {
  spark?: string;
  create?: string;
  forge?: string;
  das?: string;
} & Member;
