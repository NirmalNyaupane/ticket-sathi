"use client";
import { useGetSingleEventQuery } from "@/__generated__/graphql";
import DashboardTopContent from "@/components/organizer/dashboard/DashboardTopContent";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";
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

const EventViewLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const pathname = usePathname();
  const { data, loading } = useGetSingleEventQuery({
    variables: {
      eventId: params.id as string,
    },
  });

  return (
    <div>
      <DashboardTopContent
        text="Test Event"
        section3={
          <>
            <Badge className={badgeVariants({ variant: "active" })}>
              Approved
            </Badge>
            <Button className="bg-white text-red-700 hover:bg-white hover:text-red-500">
              <FaTrash />
            </Button>
          </>
        }
      />
      <p className="text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, ipsa
        similique! Similique libero, temporibus laudantium at ad nobis
        consequatur quos esse! Ratione, sint perferendis repellendus dignissimos
        maiores harum enim nostrum.
      </p>

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
      <div className="my-3">{children}</div>
    </div>
  );
};

export default EventViewLayout;
