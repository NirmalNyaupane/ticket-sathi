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
import { Edit, Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { BsThreeDotsVertical } from "react-icons/bs";
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
  },
  {
    accessorKey: "action",
    header: "Action",
    cell(props) {
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
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Move to trash</span>
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
