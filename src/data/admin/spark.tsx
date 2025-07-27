import { Tags } from "@/types/dashboard";
import { Member } from "@/types/users";
import { generateSelect, generateStatus } from "./columns";
import { STATUSES } from "@/data/statuses";
import { ColumnType } from "@/types/dashboard";
import InterviewNotes from "@/components/admin/dashboards/dashboard/interviewNotes";

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

export const COLUMNS: ColumnType<Member>[] = [
  generateSelect(),
  {
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    id: "name",
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
        className="p-2 hover:cursor-pointer"
      >
        {row.getValue("name")}
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
        className="p-2 hover:cursor-pointer"
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
        className="p-2 hover:cursor-pointer"
      >
        {row.getValue("discord")}
      </div>
    ),
  },
  {
    accessorKey: "pastProjects",
    header: "Past Projects",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: ({ row }) => (
      <div
        onClick={(e) => {
          row.getToggleSelectedHandler()(e);
          row.getToggleExpandedHandler()();
        }}
        className="p-2 hover:cursor-pointer"
      >
        {row.getValue("pastProjects")}
      </div>
    ),
  },
  generateStatus(STATUSES),
  {
    accessorKey: "interviewNotes",
    header: "Interview Notes",
    enableColumnFilter: false,
    filterFn: "includesString",
    searchable: true,
    cell: ({ row }) => (
      <div className="p-2 hover:cursor-pointer">
        <InterviewNotes
          uid={row.original.uid}
          currentNotes={row.original.interviewNotes?.spark}
          status={row.getValue("status")}
        />
      </div>
    ),
  },
];
export type SparkColumnsProps = typeof COLUMNS;
