"use client";
import { useGetSingleEventQuery } from "@/__generated__/graphql";
import { useParams } from "next/navigation";
import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
const EventViewLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const { data, loading } = useGetSingleEventQuery({
    variables: {
      eventId: params.id as string,
    },
  });
  console.log(data);
  return (
    <div>
      <Card x-chunk="dashboard-07-chunk-0">
        <CardHeader>
          <CardTitle>Test Event</CardTitle>
          <CardDescription>This is a test category </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <span className="bg-yellow-700 p-1 rounded-md">Pending</span>
          <Button
            variant={"outline"}
            className="bg-red-500 text-white hover:bg-red-500 hover:text-white"
          >
            {" "}
            <FaTrash />
          </Button>
        </CardContent>
      </Card>
      <div className="flex text-md gap-3 font-bold">
        <Link href={`/organizer/dashboard/event/view/${params.id}/details`}>
          Details
        </Link>
        <Link href={`/organizer/dashboard/event/view/${params.id}/tickets`}>
          Tickets
        </Link>
      </div>

      {children}
    </div>
  );
};

export default EventViewLayout;
