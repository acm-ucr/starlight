import { Table, Row, CellContext } from "@tanstack/react-table";
import Checkbox from "@/components/checkbox";
import { Badge } from "@/components/ui/badge";
import type { ColorKeys } from "@/data/tags";

export const generateSelect = <TData extends object>() => ({
  id: "select",
  searchable: false,
  size: 50,
  header: ({ table }: { table: Table<TData> }) => (
    <div className="p-2">
      <Checkbox
        id="select-all"
        checked={table.getIsAllRowsSelected()}
        onClick={(e) => {
          table.getToggleAllRowsSelectedHandler()(e);
          table.getToggleAllRowsExpandedHandler()(e);
        }}
      />
    </div>
  ),
  cell: ({ row }: { row: Row<TData> }) => (
    <div className="p-2">
      <Checkbox
        id="select-one"
        checked={row.getIsSelected()}
        onClick={(e) => {
          row.getToggleSelectedHandler()(e);
          row.getToggleExpandedHandler()();
        }}
      />
    </div>
  ),
});

export const generateStatus = <TData extends object>(
  statuses: Record<string, string>,
) => {
  return {
    accessorKey: "status",
    header: "Status",
    enableColumnFilter: true,
    searchable: false,
    filterFn: (row: Row<TData>, col: string, filter: string[]) => {
      const status = row.getValue(col) as string;
      return filter.includes(status);
    },

    cell: ({ row }: CellContext<TData, string>) => (
      <div className="p-2">
        <Badge type={row.getValue("status") as ColorKeys}>
          {statuses[row.getValue("status") as keyof typeof statuses]}
        </Badge>
      </div>
    ),
  };
};
