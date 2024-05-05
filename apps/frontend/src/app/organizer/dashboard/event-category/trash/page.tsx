"use client";
import { useGetMyTrashedCategoryQuery } from "@/__generated__/graphql";
import DashboardTopContent from "@/components/organizer/dashboard/DashboardTopContent";
import TrashCategoryAction from "@/components/organizer/dashboard/TrashCategoryAction";
import { DataTable } from "@/components/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
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
    cell({ row }) {
      const id = row.getValue("id") as string;
      const name = row.getValue("name") as string;
      return <TrashCategoryAction categoryId={id} categoryName={name} />;
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
