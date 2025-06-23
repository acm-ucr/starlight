import type { UseInfiniteQueryResult } from "@tanstack/react-query";
import type { RowModel, HeaderGroup } from "@tanstack/react-table";
import { DashboardTypeMap } from "@/types/users";
import { flexRender } from "@tanstack/react-table";
import { SortAsc, SortDesc, ArrowRightLeft, Loader } from "lucide-react";
import Loading from "@/components/loading";
import {
  Table as Datatable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { useRef, useEffect, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

interface TableProps<T extends keyof DashboardTypeMap = "admin"> {
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
}

const Table = ({
  getHeaderGroups,
  getRowModel,
  fetchNextPage,
  empty,
  isLoading,
  isRefetching,
  isFetching,
  isFetchingNextPage,
  totalFetched,
  totalDBRowCount,
}: TableProps) => {
  const tableContainerRef = useRef(null);

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

  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached]);

  const { rows } = getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 60,
    getScrollElement: () => tableContainerRef.current,
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  useEffect(() => {
    rowVirtualizer.measure();
  }, [rows.length]);

  const virtualItems = rowVirtualizer.getVirtualItems();

  return (
    <>
      <div>
        <Datatable
          className="relative grid max-h-[75vh] overflow-y-scroll bg-white"
          ref={tableContainerRef}
          onScroll={(e) => {
            fetchMoreOnBottomReached(e.currentTarget);
          }}
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
                          className={`text-hackathon-gray-200 mx-2 w-4 rotate-90 hover:cursor-pointer hover:opacity-50 ${
                            column.getIsSorted() && "hidden"
                          }`}
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
            className="relative grid min-h-[70vh]"
            style={{
              height:
                isLoading || isRefetching || rows.length === 0
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
            ) : (
              <>
                {rows.length === 0 && (
                  <TableRow className="bg-starlight-gray-tertiary w-full text-center text-white">
                    <TableCell
                      className="items-center justify-center"
                      colSpan={12}
                    >
                      {empty}
                    </TableCell>
                  </TableRow>
                )}

                {virtualItems.map((virtualRow) => {
                  const {
                    id,
                    getVisibleCells,
                    getIsSelected,
                    /* original,
                      getIsExpanded,
                      getAllCells, */
                  } = rows[virtualRow.index];

                  return (
                    <React.Fragment key={id}>
                      <TableRow
                        data-index={virtualRow.index}
                        className={`${getIsSelected() && "bg-starlight-das"} flex justify-between`}
                        ref={(node) => rowVirtualizer.measureElement(node)}
                      >
                        {getVisibleCells().map(({ id, column, getContext }) => (
                          <TableCell
                            key={id}
                            className="overflow-hidden break-words whitespace-normal"
                            style={{
                              width: column.getSize(),
                            }}
                          >
                            {flexRender(column.columnDef.cell, getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                      {/* {getIsExpanded() && (
                          <div className="flex w-full flex-col">
                            <TableRow className="flex w-full justify-between bg-hackathon-gray-100 text-xs">
                              {subcolumns?.map(({ header }, index) =>
                                index === 0 ? (
                                  <TableCell
                                    key={index}
                                    colSpan={getAllCells().length}
                                    className="w-[20px] bg-hackathon-gray-100 text-xs"
                                  >
                                    {header}
                                  </TableCell>
                                ) : (
                                  <TableCell
                                    key={index}
                                    colSpan={getAllCells().length}
                                    className="w-[150px] bg-hackathon-gray-100 text-xs"
                                  >
                                    {header}
                                  </TableCell>
                                ),
                              )}
                            </TableRow>
                            <TableRow className="flex w-full justify-between">
                              {subcolumns?.map(({ accessorKey }, index) =>
                                index === 0 ? (
                                  <TableCell
                                    key={index}
                                    colSpan={getAllCells().length}
                                    className="w-[20px] text-xs"
                                  >
                                    {original[accessorKey]}
                                  </TableCell>
                                ) : (
                                  <TableCell
                                    key={index}
                                    colSpan={getAllCells().length}
                                    className="w-[150px] text-xs"
                                  >
                                    {original[accessorKey]}
                                  </TableCell>
                                ),
                              )}
                            </TableRow>
                          </div>
                        )} */}
                    </React.Fragment>
                  );
                })}
              </>
            )}
          </TableBody>
        </Datatable>
      </div>
      <div className="bg-starlight-gray-tertiary flex w-full items-center justify-end rounded-b p-4 text-lg">
        {isFetchingNextPage && (
          <Loader
            size={20}
            className="text-starlight-blue-primary animate-spin"
          />
        )}
        <div className="mx-2 text-white">
          {getRowModel().rows.length} row(s)
        </div>
      </div>
    </>
  );
};

export default Table;
