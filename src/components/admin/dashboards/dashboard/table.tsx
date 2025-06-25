"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useQueryClient, UseInfiniteQueryResult } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  flexRender,
  RowModel,
  HeaderGroup,
  RowSelectionState,
} from "@tanstack/react-table";
import {
  SortAsc,
  SortDesc,
  ArrowRightLeft,
  Loader,
  Trash2,
  RotateCcw,
} from "lucide-react";

import { DashboardTypeMap } from "@/types/users";
import { SearchParams, Tags } from "@/types/dashboard";
import { COLORS } from "@/data/tags";
import { cn } from "@/utils/tailwind";
import toaster from "@/utils/toaster";
import { api } from "@/utils/api";

import Loading from "@/components/loading";
import Select from "@/components/select";
import { Button } from "@/components/ui/button";
import { InputWithClear } from "@/components/ui/input";
import {
  Table as Datatable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export interface Filter {
  id: string;
  value: string[];
}

interface TableWithToolbarProps<T extends keyof DashboardTypeMap> {
  empty: string;
  totalDBRowCount: number;
  getHeaderGroups: () => HeaderGroup<DashboardTypeMap[T]>[];
  getRowModel: () => RowModel<DashboardTypeMap[T]>;
  fetchNextPage: UseInfiniteQueryResult["fetchNextPage"];
  isLoading: boolean;
  totalFetched: number;
  isRefetching: boolean;
  isFetchingNextPage: boolean;
  isFetching: boolean;
  data: DashboardTypeMap[T][];
  setData: React.Dispatch<React.SetStateAction<DashboardTypeMap[T][]>>;
  searchParams: SearchParams;
  page: string;
  filters: Filter[];
  setFilters: React.Dispatch<React.SetStateAction<Filter[]>>;
  refetch: UseInfiniteQueryResult["refetch"];
  tags: Tags[];
  getFilteredSelectedRowModel: () => RowModel<DashboardTypeMap[T]>;
  searchableItems: (string | undefined)[];
  setExpanded: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  setSelected: React.Dispatch<React.SetStateAction<RowSelectionState>>;
}

const Table = <T extends keyof DashboardTypeMap>({
  empty,
  totalDBRowCount,
  getHeaderGroups,
  getRowModel,
  fetchNextPage,
  isLoading,
  totalFetched,
  isRefetching,
  isFetchingNextPage,
  isFetching,
  data,
  setData,
  searchParams,
  page,
  filters,
  setFilters,
  refetch,
  tags,
  getFilteredSelectedRowModel,
  searchableItems,
  setExpanded,
  setSelected,
}: TableWithToolbarProps<T>) => {
  const tableContainerRef = useRef(null);
  const queryClient = useQueryClient();
  const isMounted = useRef(true);
  const didMount = useRef(false);

  const [search, setSearch] = useState({
    search: searchableItems[0] ?? "",
  });

  const rows = getFilteredSelectedRowModel().rows.map(
    ({ original }) => original,
  );

  const [popup, setPopup] = useState({
    title: "",
    text: "",
    color: "",
    visible: false,
    onClick: () => {},
    button: "",
  });

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollTop, scrollHeight, clientHeight } = containerRefElement;
        if (
          scrollHeight - scrollTop - clientHeight < 500 &&
          !isFetching &&
          totalFetched < totalDBRowCount
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount],
  );

  const rowVirtualizer = useVirtualizer({
    count: getRowModel().rows.length,
    estimateSize: () => 60,
    getScrollElement: () => tableContainerRef.current,
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (el) => el.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (didMount.current) {
      if (isMounted.current) setSearch({ search: searchableItems[0] ?? "" });
    } else {
      didMount.current = true;
    }
  }, [searchableItems]);

  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached]);

  useEffect(() => {
    rowVirtualizer.measure();
  }, [getRowModel().rows.length]);

  const handleDelete = async () => {
    const ids = rows.map(({ uid }) => uid);
    const prev = data;
    const keep = data.filter(({ uid }) => !ids.includes(uid));
    setData(keep);
    setExpanded({});
    try {
      await api({
        method: "DELETE",
        url: `/api/dashboard/${page}`,
        body: rows.map(({ uid }) => ({ uid })),
      });
      queryClient.invalidateQueries({ queryKey: [page, searchParams] });
      if (isMounted.current) {
        toaster("Successfully Deleted", "success");
        setSelected({});
      }
    } catch {
      if (isMounted.current) {
        setData(prev);
        toaster("Deletion Failed. Please try again", "error");
      }
    }
  };

  const confirmDelete = () => {
    if (rows.length === 0)
      return toaster("No rows selected for deletion", "error");
    setPopup({
      title: "Delete Confirmation",
      text: "Are you sure you want to delete these row(s)? This action is irreversible.",
      color: "red",
      visible: true,
      onClick: handleDelete,
      button: "confirm",
    });
  };

  const handleReload = async () => {
    await queryClient.resetQueries({ queryKey: [page, searchParams] });
    if (isMounted.current) {
      setExpanded({});
      setSelected({});
      refetch();
      toaster(
        `Fetched ${page.charAt(0).toUpperCase() + page.slice(1)} Successfully`,
        "success",
      );
    }
  };

  const onClick = async (value: string) => {
    if (rows.length === 0) return toaster("No items selected.", "error");
    const notPending = rows.some((obj) => obj.status !== "0");
    if (notPending)
      return toaster("Only pending items can be changed!", "error");

    const ids = rows.map(({ uid }) => uid);
    const prev = data;
    const keep = data.map((item) =>
      ids.includes(item.uid) ? { ...item, status: value } : item,
    );
    setData(keep);
    try {
      await api({
        method: "PUT",
        url: `/api/dashboard/${page}`,
        body: { objects: rows, status: value, attribute: "status" },
      });
      queryClient.invalidateQueries({ queryKey: [page, searchParams] });
      if (isMounted.current) {
        setSelected({});
        toaster("Operation Completed", "success");
      }
    } catch {
      if (isMounted.current) {
        setData(prev);
        toaster("Operation Failed", "error");
      }
    }
  };

  const value = filters.find(({ id }) => id === search.search)?.value || "";
  const onChange = (id: string, value: string[]) =>
    setFilters((prev) =>
      prev.filter((f) => f.id !== search.search).concat({ id, value }),
    );
  const cleanItems = searchableItems.filter(Boolean) as string[];

  const rows2 = getRowModel().rows;
  const virtualItems = rowVirtualizer.getVirtualItems();

  return (
    <>
      {/* Toolbar */}
      <div className="my-2 flex w-full flex-col items-center gap-3 lg:flex-row">
        <div className="flex gap-3">
          {tags.map((tag, i) => (
            <Button
              key={i}
              onClick={() => onClick(tag.value)}
              className={cn(
                COLORS[tag.text]?.background,
                COLORS[tag.text]?.text,
                COLORS[tag.text]?.hover,
                "text-nowrap capitalize",
              )}
            >
              {tag.text}
            </Button>
          ))}
        </div>
        <div className="flex w-full items-center gap-2 lg:flex-row">
          <div className="z-10 w-2/12">
            <Select
              items={cleanItems}
              user={search}
              setUser={setSearch}
              field="search"
              placeholder={cleanItems[0] ?? ""}
            />
          </div>
          <InputWithClear
            placeholder="Search"
            maxLength={100}
            onClear={() => onChange(search.search ?? "", [])}
            onChange={(e) => onChange(search.search ?? "", [e.target.value])}
            value={value}
          />
          <div className="text-white">
            Rows:<span className="mx-2">{totalDBRowCount}</span>
          </div>
          <RotateCcw
            size={30}
            onClick={handleReload}
            className="text-white duration-150 hover:cursor-pointer hover:opacity-70"
          />
          <Trash2
            size={30}
            onClick={confirmDelete}
            className="mx-2 text-white duration-150 hover:cursor-pointer hover:opacity-70"
          />
        </div>
      </div>

      {/* Table */}
      <Datatable
        className="relative grid max-h-[75vh] overflow-y-scroll bg-white"
        ref={tableContainerRef}
        onScroll={(e) => fetchMoreOnBottomReached(e.currentTarget)}
      >
        <TableHeader className="bg-starlight-gray-tertiary sticky top-0 z-10 grid text-white">
          {getHeaderGroups().map(({ headers, id }) => (
            <TableRow key={id} className="flex w-full justify-between">
              {headers.map(({ id, column, getContext, getSize }) => (
                <TableHead
                  key={id}
                  className="flex"
                  style={{ width: getSize() }}
                >
                  <div className="flex items-center text-white">
                    {flexRender(column.columnDef.header, getContext())}
                    {column.getCanSort() && (
                      <ArrowRightLeft
                        className="text-hackathon-gray-200 mx-2 w-4 rotate-90 hover:cursor-pointer hover:opacity-50"
                        onClick={column.getToggleSortingHandler()}
                      />
                    )}
                    {column.getIsSorted() === "asc" && (
                      <SortDesc
                        onClick={column.getToggleSortingHandler()}
                        className="mx-2 w-4 text-white hover:cursor-pointer hover:opacity-50"
                      />
                    )}
                    {column.getIsSorted() === "desc" && (
                      <SortAsc
                        onClick={column.getToggleSortingHandler()}
                        className="mx-2 w-4 text-white hover:cursor-pointer hover:opacity-50"
                      />
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody
          className="relative grid"
          style={{
            height:
              isLoading || isRefetching || rows2.length === 0
                ? "100%"
                : `${rowVirtualizer.getTotalSize()}px`,
          }}
        >
          {isLoading || isRefetching ? (
            <TableRow className="absolute inset-0 flex items-center justify-center">
              <TableCell className="flex items-center justify-center py-4 text-center">
                <Loading />
              </TableCell>
            </TableRow>
          ) : rows2.length === 0 ? (
            <TableRow className="bg-starlight-gray-tertiary w-full text-center text-white">
              <TableCell className="items-center" colSpan={12}>
                {empty}
              </TableCell>
            </TableRow>
          ) : (
            virtualItems.map((virtualRow) => {
              const { id, getVisibleCells, getIsSelected } =
                rows2[virtualRow.index];
              return (
                <TableRow
                  key={id}
                  data-index={virtualRow.index}
                  className={`${getIsSelected() && "bg-starlight-das"} flex justify-between`}
                  ref={(node) => rowVirtualizer.measureElement(node)}
                >
                  {getVisibleCells().map(({ id, column, getContext }) => (
                    <TableCell
                      key={id}
                      className="overflow-hidden break-words whitespace-normal"
                      style={{ width: column.getSize() }}
                    >
                      {flexRender(column.columnDef.cell, getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Datatable>

      <div className="bg-starlight-gray-tertiary flex w-full items-center justify-end rounded-b p-4 text-lg">
        {isFetchingNextPage && (
          <Loader
            size={20}
            className="text-starlight-blue-primary animate-spin"
          />
        )}
        <div className="mx-2 text-white">{rows2.length} row(s)</div>
      </div>

      <AlertDialog open={popup.visible}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{popup.title}</AlertDialogTitle>
            <AlertDialogDescription>{popup.text}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setPopup({ ...popup, visible: false })}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                popup.onClick();
                setPopup({ ...popup, visible: false });
              }}
            >
              {popup.button}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Table;
