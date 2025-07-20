import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

export interface EmailTemplate {
  currentSeason: string;
  currentYear: string;
  status: "accept" | "reject" | "interview";
}

const COLUMNS: ColumnDef<EmailTemplate>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="w-min pt-2 pb-1 pl-2">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="text-white"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="pt-2 pb-1 pl-2">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "currentSeason",
    header: () => (
      <div className="pt-2 pb-1 text-center text-white">Current Season</div>
    ),
    cell: ({ row }) => (
      <div className="text-center text-white">
        {row.getValue("currentSeason")}
      </div>
    ),
  },
  {
    accessorKey: "currentYear",
    header: () => (
      <div className="pt-2 pb-1 text-center text-white">Current Year</div>
    ),
    cell: ({ row }) => (
      <div className="text-center text-white">
        {row.getValue("currentYear")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => (
      <div className="pt-2 pb-1 text-center text-white">Status</div>
    ),
    cell: ({ row }) => (
      <div className="text-center text-white">{row.getValue("status")}</div>
    ),
  },
];
export default COLUMNS;
