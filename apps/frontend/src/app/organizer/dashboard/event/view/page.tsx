"use client";
import { EventStatus, EventType } from "@/__generated__/graphql";
import { DataTable } from "@/components/table/data-table";
import { ColumnDef } from "@tanstack/react-table";

export type Event = {
  id: string;
  name: string;
  // cover: string;
  type: EventType;
  status: EventStatus;
  startDate: string;
  endDate: string;
  venue: string;
};

export const columns: ColumnDef<Event>[] = [
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
];

const data: Event[] = [
  {
    id: "728ed52f",

    status: EventStatus.Pending,
    type: EventType.Concert,
    name: "Test Event",
    startDate: "2024-02-01",
    endDate: "2024-04-02",
    venue: "Nepal hall",
  },
  {
    id: "728ed52f",

    status: EventStatus.Pending,
    type: EventType.Concert,
    name: "Test Event",
    startDate: "2024-02-01",
    endDate: "2024-04-02",
    venue: "Nepal hall",
  },
  {
    id: "728ed52f",

    status: EventStatus.Pending,
    type: EventType.Concert,
    name: "Test Event",
    startDate: "2024-02-01",
    endDate: "2024-04-02",
    venue: "Nepal hall",
  },
  {
    id: "728ed52f",

    status: EventStatus.Approved,
    type: EventType.Concert,
    name: "Test Event",
    startDate: "2024-02-01",
    endDate: "2024-04-02",
    venue: "Nepal hall",
  },
  {
    id: "728ed52f",

    status: EventStatus.Pending,
    type: EventType.Concert,
    name: "Test Event",
    startDate: "2024-02-01",
    endDate: "2024-04-02",
    venue: "Nepal hall",
  },
  {
    id: "728ed52f",

    status: EventStatus.Rejected,
    type: EventType.Concert,
    name: "Test Event",
    startDate: "2024-02-01",
    endDate: "2024-04-02",
    venue: "Nepal hall",
  },
  {
    id: "728ed52f",

    status: EventStatus.Pending,
    type: EventType.Concert,
    name: "Test Event",
    startDate: "2024-02-01",
    endDate: "2024-04-02",
    venue: "Nepal hall",
  },
  {
    id: "728ed52f",

    status: EventStatus.Approved,
    type: EventType.Concert,
    name: "Test Event",
    startDate: "2024-02-01",
    endDate: "2024-04-02",
    venue: "Nepal hall",
  },
  {
    id: "728ed52f",

    status: EventStatus.Rejected,
    type: EventType.Concert,
    name: "Test Event",
    startDate: "2024-02-01",
    endDate: "2024-04-02",
    venue: "Nepal hall",
  },
  {
    id: "728ed52f",

    status: EventStatus.Pending,
    type: EventType.Concert,
    name: "Test Event",
    startDate: "2024-02-01",
    endDate: "2024-04-02",
    venue: "Nepal hall",
  },
  {
    id: "728ed52f",

    status: EventStatus.Rejected,
    type: EventType.Concert,
    name: "Test Event",
    startDate: "2024-02-01",
    endDate: "2024-04-02",
    venue: "Nepal hall",
  },
  {
    id: "728ed52f",

    status: EventStatus.Pending,
    type: EventType.Concert,
    name: "Test Event",
    startDate: "2024-02-01",
    endDate: "2024-04-02",
    venue: "Nepal hall",
  },
  {
    id: "728ed52f",

    status: EventStatus.Approved,
    type: EventType.Concert,
    name: "Test Event",
    startDate: "2024-02-01",
    endDate: "2024-04-02",
    venue: "Nepal hall",
  },
  {
    id: "728ed52f",

    status: EventStatus.Pending,
    type: EventType.Concert,
    name: "Test Event",
    startDate: "2024-02-01",
    endDate: "2024-04-02",
    venue: "Nepal hall",
  },
  {
    id: "728ed52f",

    status: EventStatus.Pending,
    type: EventType.Concert,
    name: "Test Event",
    startDate: "2024-02-01",
    endDate: "2024-04-02",
    venue: "Nepal hall",
  },
  {
    id: "728ed52f",

    status: EventStatus.Approved,
    type: EventType.Concert,
    name: "Test Event",
    startDate: "2024-02-01",
    endDate: "2024-04-02",
    venue: "Nepal hall",
  },
  {
    id: "728ed52f",

    status: EventStatus.Pending,
    type: EventType.Concert,
    name: "Test Event",
    startDate: "2024-02-01",
    endDate: "2024-04-02",
    venue: "Nepal hall",
  },
  {
    id: "728ed52f",

    status: EventStatus.Rejected,
    type: EventType.Concert,
    name: "Test Event",
    startDate: "2024-02-01",
    endDate: "2024-04-02",
    venue: "Nepal hall",
  },
];
const EventPage = () => {
  return <DataTable columns={columns} data={data} />;
};

export default EventPage;
