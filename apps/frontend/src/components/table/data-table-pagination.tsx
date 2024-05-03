import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { useCallback, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { GetMyEventsQuery } from "@/__generated__/graphql";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  lastPage: number;
  nextPage: number | null;
  previousPage: number | null;
}

interface PaginationProps {
  meta: GetMyEventsQuery["getMyEvents"]["meta"];
}

export function DataTablePagination({ meta }: PaginationProps) {
  const [pageLimit, setPageLimit] = useState(10);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const param = new URLSearchParams(searchParams.toString());
      param.set(name, value);
      return param.toString();
    },
    [searchParams]
  );

  return (
    <div className="flex items-center justify-end px-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${pageLimit}`}
            onValueChange={(value: string) => {
              setPageLimit(parseInt(value));
              router.push(
                pathName + "?" + createQueryString("pageLimit", value)
              );
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {meta.currentPage} of {meta.lastPage}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              router.push(pathName + "?" + createQueryString("page", "1"));
            }}
            disabled={meta.currentPage === 1 ? true : false}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              router.push(
                pathName +
                  "?" +
                  createQueryString("page", meta.prevPage?.toString() ?? "1")
              );
            }}
            disabled={!meta.prevPage}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              router.push(
                pathName +
                  "?" +
                  createQueryString("page", meta.nextPage?.toString() ?? "1")
              );
            }}
            disabled={!meta.nextPage}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              router.push(
                pathName +
                  "?" +
                  createQueryString("page", meta.lastPage.toString())
              );
            }}
            disabled={meta.currentPage === meta.lastPage}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
