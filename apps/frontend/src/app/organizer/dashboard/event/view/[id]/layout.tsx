"use client";
import {
  EventStatus,
  GetSingleEventQuery,
  useGetSingleEventQuery,
} from "@/__generated__/graphql";
import ConditionallyRender from "@/components/common/ConditionallyRender";
import DashboardTopContent from "@/components/organizer/dashboard/DashboardTopContent";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Pencil, X } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { createContext, useState } from "react";
import { FaTrash } from "react-icons/fa";

const links = [
  {
    name: "Details",
    url: (id: string) => `/organizer/dashboard/event/view/${id}/details`,
  },
  {
    name: "Tickets",
    url: (id: string) => `/organizer/dashboard/event/view/${id}/tickets`,
  },
];

export const EventContext = createContext<{
  event: GetSingleEventQuery["getSingleEvent"] | undefined;
  action: "EDIT" | "VIEW";
  setAction: React.Dispatch<React.SetStateAction<"EDIT" | "VIEW">> | undefined;
}>({
  event: undefined,
  action: "EDIT",
  setAction: undefined,
});

const EventViewLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const pathname = usePathname();
  const [action, setAction] = useState<"EDIT" | "VIEW">("VIEW");

  const { data, loading } = useGetSingleEventQuery({
    variables: {
      eventId: params.id as string,
    },
  });

  const getVariants = (
    status: EventStatus
  ):
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "pending"
    | "active" => {
    if (status === EventStatus.Approved) {
      return "active";
    } else if (status === EventStatus.Pending) {
      return "pending";
    } else {
      return "destructive";
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <DashboardTopContent
        text="Test Event"
        section3={
          <div className="flex items-center">
            <Badge
              className={badgeVariants({
                variant: getVariants(
                  data?.getSingleEvent.status ?? EventStatus.Approved
                ),
              })}
            >
              {data?.getSingleEvent.status}
            </Badge>
            <Button className="bg-white text-red-700 hover:bg-white hover:text-red-500">
              <FaTrash />
            </Button>
            <Button
              className="bg-white text-black hover:bg-white"
              onClick={() =>
                setAction((prev) => {
                  if (prev === "EDIT") {
                    return "VIEW";
                  } else {
                    return "EDIT";
                  }
                })
              }
            >
              <ConditionallyRender
                condition={action === "EDIT"}
                show={<X />}
                elseShow={<Pencil />}
              />
            </Button>
          </div>
        }
      />
      <p className="text-gray-500">{data?.getSingleEvent.description}</p>

      <div className="flex text-md gap-3 font-bold mt-4">
        {links.map((link) => {
          return (
            <Link
              href={`${link.url(params.id as string)}`}
              key={link.name + "oierjer"}
              className={cn(
                "font-semibold",
                `${
                  pathname == link.url(params.id as string)
                    ? "underline underline-offset-4"
                    : ""
                }`
              )}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
      <Separator />
      <EventContext.Provider
        value={{ event: data?.getSingleEvent, action, setAction }}
      >
        <div className="my-3">{children}</div>
      </EventContext.Provider>
    </div>
  );
};

export default EventViewLayout;
