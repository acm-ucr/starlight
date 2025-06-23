import { Label } from "@/components/ui/label";
import { SearchParams, Tags } from "@/types/dashboard";
import { DashboardTypeMap } from "@/types/users";
import Filters from "@/components/admin/dashboards/dashboard/filters";
import Table from "@/components/admin/dashboards/dashboard/table";
import { ColumnType } from "@/types/dashboard";
import {
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";

import { useState, useEffect } from "react";

import { api } from "@/utils/api";

interface DashboardProps<T extends keyof DashboardTypeMap> {
  title: string;
  searchParams: SearchParams;
  statuses: Record<string, string>;
  columns: ColumnType<DashboardTypeMap[T]>[];
  tags: Tags[];
  dashboardType: T;
}

export interface Filter {
  id: string;
  value: string[];
}

const Dashboard = ({
  title,
  columns,
  searchParams,
  tags,
  statuses,
  dashboardType,
}: DashboardProps) => {
  const [filters, setFilters] = useState<Filter[]>([
    { id: "status", value: Object.keys(statuses) },
  ]);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [meta, setMeta] = useState<{ total: number; last: string }>({
    total: 0,
    last: "",
  });

  const page = title.toLowerCase();
  const empty = `No ${title} Available`;

  const fetchData = async ({ pageParam }: { pageParam?: string }) => {
    const { size = 20 } = searchParams;

    const res = await api({
      url: `/api/dashboard/${page}?size=${size}&last=${pageParam}`,
      method: "GET",
    });

    setMeta({ total: res.total, last: res.last });

    return { items: res.items, last: res.last, total: res.total };
  };

  const {
    data: queryData,
    fetchNextPage,
    refetch,
    isFetching,
    isRefetching,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [page, searchParams],
    queryFn: fetchData,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.last,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (queryData) {
      const flattenedData = queryData.pages.flatMap((page) => page.items || []);
      setData(flattenedData);
    }
  }, [queryData, isLoading, isFetching]);

  const {
    getHeaderGroups,
    getRowModel,
    getFilteredSelectedRowModel,
    toggleAllRowsSelected,
  } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: (_row) => true,
    onRowSelectionChange: setSelected,
    enableRowSelection: true,
    onExpandedChange: setExpanded,
    state: {
      rowSelection: selected,
      columnFilters: filters,
      expanded,
    },
  });

  const searchableItems = columns
    .filter(({ searchable }) => searchable)
    .map(({ accessorKey }) => accessorKey);

  return (
    <div className="bg-starlight-gray-secondary w-10/12">
      <div className="mt-8 ml-5 flex items-center gap-x-8">
        <Label className="text-starlight-tags-white text-2xl font-bold">
          {title}
        </Label>
        <Filters
          statuses={statuses}
          filters={filters}
          setFilters={setFilters}
        />
      </div>
      <Table
        /* page={page}
          meta={meta}
          columns={columns} */
        empty={empty}
        isLoading={isLoading}
        isRefetching={isRefetching}
        isFetchingNextPage={isFetchingNextPage}
        isFetching={isFetching}
        totalDBRowCount={meta.total}
        totalFetched={data.length}
        getHeaderGroups={getHeaderGroups}
        getRowModel={getRowModel}
      />
    </div>
  );
};

export default Dashboard;
