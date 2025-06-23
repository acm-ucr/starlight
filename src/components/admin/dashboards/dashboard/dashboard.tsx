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
import { RowSelectionState } from "@tanstack/react-table";
import { useState, useEffect } from "react";

import { api } from "@/utils/api";
import Toolbar from "./toolbar";

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

const Dashboard = <T extends keyof DashboardTypeMap>({
  title,
  columns,
  searchParams,
  tags,
  statuses,
}: DashboardProps<T>) => {
  const [filters, setFilters] = useState<Filter[]>([
    { id: "status", value: Object.keys(statuses) },
  ]);
  const [data, setData] = useState<DashboardTypeMap[T][]>([]);
  const [selected, setSelected] = useState<RowSelectionState>({});
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

  const { getHeaderGroups, getRowModel, getFilteredSelectedRowModel } =
    useReactTable<DashboardTypeMap[T]>({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getExpandedRowModel: getExpandedRowModel(),
      getRowCanExpand: () => true,
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
      <Toolbar
        totalDBRowCount={meta.total}
        searchParams={searchParams}
        page={page}
        filters={filters}
        setFilters={setFilters}
        data={data}
        setData={setData}
        refetch={refetch}
        tags={tags}
        getFilteredSelectedRowModel={getFilteredSelectedRowModel}
        setSelected={setSelected}
        searchableItems={searchableItems}
        setExpanded={setExpanded}
      />
      <Table
        empty={empty}
        isLoading={isLoading}
        isRefetching={isRefetching}
        isFetchingNextPage={isFetchingNextPage}
        isFetching={isFetching}
        fetchNextPage={fetchNextPage}
        totalDBRowCount={meta.total}
        totalFetched={data.length}
        getHeaderGroups={getHeaderGroups}
        getRowModel={getRowModel}
      />
    </div>
  );
};

export default Dashboard;
