import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
interface Project {
  project: string;
}

const COLUMNS: ColumnDef<Project>[] = [
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
    accessorKey: "project",
    header: () => (
      <div className="pt-2 pb-1 text-center text-white">Project</div>
    ),
    cell: ({ row }) => (
      <div className="text-center text-white">{row.getValue("project")}</div>
    ),
  },
];
export default COLUMNS;
