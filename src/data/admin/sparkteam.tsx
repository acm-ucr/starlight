"use client";

import { Tags } from "@/types/dashboard";
import { Member } from "@/types/users";
import { generateSelect, generateStatus } from "./columns";
import { STATUSES } from "@/data/statuses";
import { ColumnType } from "@/types/dashboard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

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
        className="hover:cursor-pointer"
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
        className="hover:cursor-pointer"
      >
        {row.getValue("pastProjects")}
      </div>
    ),
  },
  {
    accessorKey: "team",
    header: "Team",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: ({ row }) => {
      const [team, setTeam] = useState("Select a Team");

      function handleSelect(projectTeam: string) {
        setTeam(projectTeam);
      }

      return (
        <div
          onClick={(e) => {
            row.getToggleSelectedHandler()(e);
            row.getToggleExpandedHandler()();
          }}
          className="hover:cursor-pointer"
        >
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="bg-starlight-table-selected cursor-pointer rounded-lg border-2 border-black px-2 text-center">
                {team}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => handleSelect("ULA")}>
                ULA
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleSelect("TSU")}>
                TSU
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleSelect("AISC")}>
                AISC
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },

  generateStatus(STATUSES),
];
export type SparkColumnsProps = typeof COLUMNS;
