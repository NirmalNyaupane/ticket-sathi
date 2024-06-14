import DashboardTopContent from "@/components/organizer/dashboard/DashboardTopContent";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";
import Link from "next/link";
import React from "react";
const links = [
  {
    name: "Details",
    url: `/admin/dashboard/commission/create`,
  },
  {
    name: "Tickets",
    url: `/admin/dashboard/commission/view`,
  },
];

const CommissionLayout = ({ children }: { children: React.ReactNode }) => {
  const heads = headers();

  const pathname = heads.get("next-url");
  return (
    <div className="space-y-3">
      <DashboardTopContent text="Commission" />
      <div className="flex text-md gap-3 font-bold mt-4">
        {links.map((link) => {
          return (
            <Link
              href={`${link.url}`}
              key={link.name + "oierjoooooer"}
              className={cn(
                "font-semibold",
                `${pathname == link.url ? "underline underline-offset-4" : ""}`
              )}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
      {children}
    </div>
  );
};

export default CommissionLayout;
