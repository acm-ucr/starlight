import { ColumnDef } from "@tanstack/react-table";
export type SearchParams = {
  index: number;
  size: number;
  first: string;
  last: string;
  direction: "prev" | "next";
};

export type Tags = {
  text: string;
  value: "-1" | "0" | "1";
};

export type Column = {
  searchable: boolean;
  accessorKey?: string;
  id?: string;
};

export type ColumnType<T> = ColumnDef<T, string> & Column;
