"use client";
import {
  useGetMySalesQuery
} from "@/__generated__/graphql";
import DashboardTopContent from "@/components/organizer/dashboard/DashboardTopContent";
import { DataTable } from "@/components/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
export type Booking = {
  id: string;
  ticketName:string;
  userName:string;
  userEmail:string;
  eventName:string;
  ticketQuantity:string;
  discountAmount:string;
  totalAmount:string;
};

export const columns: ColumnDef<Booking>[] = [
  {
    accessorKey: "id",
    header: "No",
  },
  {
    accessorKey: "ticketName",
    header: "Ticket Name",
    enableSorting: false,
  },
  {
    accessorKey: "userName",
    header: "User Name",
    enableColumnFilter: false,
  },
  {
    accessorKey: "userEmail",
    header: "User Email",
    enableColumnFilter: false,
  },
  {
    accessorKey: "eventName",
    header: "Event Name",
    enableColumnFilter: false,
  },
  {
    accessorKey: "ticketQuantity",
    header: "Ticket Quantity",
    enableColumnFilter: false,
  },
  {
    accessorKey: "discountAmount",
    header: "Discount Amount",
    enableColumnFilter: false,
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    enableColumnFilter: false,
  },
];

const SalesPage = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const pageLimit = searchParams.get("pageLimit");
  const { data, loading } = useGetMySalesQuery({
    // variables: {
    //   query: {
    //     page: parseInt(page ?? "1"),
    //     pageLimit: parseInt(pageLimit ?? "10"),
    //   },
    // },
    notifyOnNetworkStatusChange: true,
  });

  if (loading) {
    return <p>Loading.............</p>;
  }
  
  const formatedData = data?.getMySales.map((data):Booking => {
    return {
      id:data.id,
      ticketName:data.ticket?.name??"",
      ticketQuantity:data.quantity,
      discountAmount:data.totalDiscountAmount.toString(),
      eventName:data.ticket?.event?.name??"",
      totalAmount:data.totalAmount.toString(), 
      userEmail:data.user?.email??"",
      userName:data.user?.fullName??""
    };
  });
  return (
    <>
      <DashboardTopContent text={"Sales"} />
      <DataTable
        columns={columns}
        data={formatedData!}
        // meta={data?.getMyEvents.meta}
      />
    </>
  );
};

export default SalesPage;
