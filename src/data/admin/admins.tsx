import { Tags } from "@/types/dashboard";
import { Admin } from "@/types/users";
import { generateSelect, generateStatus } from "./columns";
import { STATUSES } from "@/data/statuses";
import { ColumnType } from "@/types/dashboard";

export const TAGS: Tags[] = [
  {
    text: "accept",
    value: "1",
  },
  {
    text: "reject",
    value: "-1",
  },
];

export const COLUMNS: ColumnType<Admin>[] = [
  generateSelect(),
  {
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    id: "fullName",
    accessorKey: "name",
    header: "Name",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: ({ row }) => (
      <div
        onClick={(e) => {
          row.getToggleSelectedHandler()(e);
          row.getToggleExpandedHandler()();
        }}
        className="hover:cursor-pointer"
      >
        {row.getValue("fullName")}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: ({ row }) => (
      <div
        onClick={(e) => {
          row.getToggleSelectedHandler()(e);
          row.getToggleExpandedHandler()();
        }}
        className="hover:cursor-pointer"
      >
        {row.getValue("email")}
      </div>
    ),
  },
  {
    accessorKey: "discord",
    header: "Discord",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: ({ row }) => (
      <div
        onClick={(e) => {
          row.getToggleSelectedHandler()(e);
          row.getToggleExpandedHandler()();
        }}
        className="hover:cursor-pointer"
      >
        {row.getValue("discord")}
      </div>
    ),
  },
  generateStatus(STATUSES),
];
export type AdminColumnsProps = typeof COLUMNS;
