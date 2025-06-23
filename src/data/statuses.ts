export type Code = "1" | "0" | "-1";
export type Status = "accepted" | "pending" | "rejected";

export type StatusMapping = Record<Code, Status>;

export const STATUSES: StatusMapping = {
  "1": "accepted",
  "0": "pending",
  "-1": "rejected",
};
