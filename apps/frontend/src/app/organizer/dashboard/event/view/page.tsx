"use client";
import {
  EventStatus,
  EventType,
  useGetMyEventsQuery,
} from "@/__generated__/graphql";
import DashboardTopContent from "@/components/organizer/dashboard/DashboardTopContent";
import { DataTable } from "@/components/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { format, formatDate } from "date-fns";
import { Eye } from "lucide-react";
import Link from "next/link";
export type Event = {
  id: string;
  name: string;
  type: EventType;
  status: EventStatus;
  startDate: string;
  endDate: string;
  venue: string;
  action?: string;
};

export const columns: ColumnDef<Event>[] = [
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
    accessorKey: "type",
    header: "Event Type",
    enableColumnFilter: false,
  },
  {
    accessorKey: "status",
    header: "Event Status",
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
    accessorKey: "startDate",
    header: "Event Start Date",
    enableColumnFilter: false,
    cell({cell}) {
        const date = new Date(cell.getValue() as string);

        return <p>{format(date,"MMM dd, yyyy hh:mm a")}</p>
    },
  },
  {
    accessorKey: "endDate",
    header: "Event End Date",
    enableColumnFilter: false,
  },
  {
    accessorKey: "venue",
    header: "Venue",
    enableColumnFilter: false,
  },
  {
    accessorKey: "action",
    header: "Action",
    cell({ cell, row, column }) {
      const id = row.getValue("id");
      return (
        <Link href={`/organizer/dashboard/event/${id}`}>
          <Eye className="cursor-pointer" />
        </Link>
      );
    },
  },
];

const EventPage = () => {
  const { data, loading, error } = useGetMyEventsQuery({
    variables: {
      query: {
        page: 1,
        pageLimit: 15,
      },
    },
  });

  if (loading) {
    return <p>Loading.............</p>;
  }
  const formatedData = data?.getMyEvents.data.map((data): Event => {
    return {
      id: data.id.toString(),
      name: data.name,
      type: data.type,
      status: data.status,
      startDate: data.eventStartDate,
      endDate: data.eventEndDate,
      venue: data.venue,
    };
  });
  return (
    <>
      <DashboardTopContent text={"Events"} />
      <DataTable columns={columns} data={formatedData!} />
    </>
  );
};

export default EventPage;
