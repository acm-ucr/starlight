import { Code } from "@/data/statuses";

export type Member = {
  firstName: string;
  lastName: string;
  email: string;
  discord: string;
  status: Code;
  uid: number;
  interviewNotes: {
    spark: string;
    forge: string;
    create: string;
    das: string;
  };
  team: {
    spark: string;
    forge: string;
    create: string;
    das: string;
  };
};

export type Admin = {
  spark?: string;
  create?: string;
  forge?: string;
  das?: string;
} & Member;

export type DashboardTypeMap = {
  admin: Admin;
  member: Member;
};
