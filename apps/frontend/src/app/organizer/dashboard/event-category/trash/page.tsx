"use client";
import { useGetMyTrashedCategoryQuery } from "@/__generated__/graphql";
import DashboardTopContent from "@/components/organizer/dashboard/DashboardTopContent";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaWindowRestore } from "react-icons/fa";
export type Category = {
  id: string;
  name: string;
  deletedAt: string;
  action?: string;
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "No",
  },
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: false,
  },
  {
    accessorKey: "deletedAt",
    header: "Deleted At",
    cell({ cell }) {
      const date = new Date(cell.getValue() as string);

      return <p>{format(date, "MMM dd, yyyy hh:mm a")}</p>;
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell() {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="link">
              <BsThreeDotsVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="cursor-pointer"
                // onSelect={handleMenuItemClick}
              >
                <span className="mr-2 h-4 w-4">
                  <FaWindowRestore />
                </span>
                <span>Restore</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete Permanently</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const TrashPage = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const pageLimit = searchParams.get("pageLimit");
  const { data, loading } = useGetMyTrashedCategoryQuery({
    variables: {
      query: {
        page: parseInt(page ?? "1"),
        pageLimit: parseInt(pageLimit ?? "10"),
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  if (loading) {
    return <p>Loading.............</p>;
  }
  const formatedData = data?.getMyTrashedCategory.data.map((data): Category => {
    return {
      id: data.id.toString(),
      name: data.name,
      deletedAt: data.deletedAt,
    };
  });
  return (
    <>
      <DashboardTopContent text={"Events"} />
      <DataTable
        columns={columns}
        data={formatedData!}
        meta={data?.getMyTrashedCategory.meta}
      />
    </>
  );
};

export default TrashPage;
