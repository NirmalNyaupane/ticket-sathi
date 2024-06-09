"use client";
import { EventStatus } from "@/__generated__/graphql";
import DashboardTopContent from "@/components/organizer/dashboard/DashboardTopContent";
import { DataTable } from "@/components/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useGetAllOrganizerQuery } from "../../../../__generated__/graphql";
import { format } from "date-fns";
export type Event = {
  id: string;
  createdAt: string;
  name: string;
  status: string;
  address: string;
  action?: string;
};

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "id",
    header: "No",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    enableSorting: false,
    cell({cell}) {
      const date = new Date(cell?.getValue() as string);

      return <p>{format(date, "MMM dd, yyyy hh:mm a")}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    enableColumnFilter: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    enableColumnFilter: false,
    cell({ cell }) {
      const status = cell.getValue() as EventStatus;

      switch (status) {
        case EventStatus.Approved:
          return (
            <p className="w-fit bg-green-700 text-white font-semibold px-2 rounded-full">
              {status}
            </p>
          );

        case EventStatus.Pending:
          return (
            <p className="w-fit bg-yellow-500 text-white font-semibold px-2 rounded-full">
              {status}
            </p>
          );

        case EventStatus.Rejected:
          return (
            <p className="w-fit bg-red-500 text-white font-semibold px-2 rounded-full">
              {status}
            </p>
          );
      }
    },
  },
  {
    accessorKey: "address",
    header: "Address",
    enableColumnFilter: false,
  },
  {
    accessorKey: "action",
    header: "Action",
    cell({ cell, row, column }) {
      const id = row.getValue("id");
      return (
        <Link href={`/admin/dashboard/organizers/${id}`}>
          <Eye className="cursor-pointer" />
        </Link>
      );
    },
  },
];

const AdminOrganizer = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const pageLimit = searchParams.get("pageLimit");
  const { data, loading } = useGetAllOrganizerQuery({
    variables: {
      query: {
        page: parseInt(page ?? "1"),
        pageLimit: parseInt(pageLimit ?? "10"),
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  if (loading || !data?.getAllOrganizer) {
    return <p>Loading.............</p>;
  }
  const formatedData = data?.getAllOrganizer.data.map((data) => {
    return {
      id: data.id.toString(),
      createdAt: data.createdAt,
      name: data.organizerName,
      status: data.status,
      address: data.address,
    };
  });
  return (
    <>
      <DashboardTopContent text={"Organizers"} />
      <DataTable
        columns={columns}
        data={formatedData!}
        meta={data?.getAllOrganizer.meta}
      />
    </>
  );
};

export default AdminOrganizer;
