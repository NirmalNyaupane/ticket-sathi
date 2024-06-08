"use client";
import { cn } from "@/lib/utils";
import { FolderInputIcon, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BiCalendarEvent, BiChat, BiSolidCoupon } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import "./scrollbar.css";
import ConditionallyRender from "@/components/common/ConditionallyRender";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

type ChildrenItems = {
  name: string;
  links: string[];
};

type SideBarItems = {
  name: string;
  icon: React.ReactNode;
} & (
  | {
      hasChildren: false;
      links: string[];
    }
  | {
      hasChildren: true;
      name: string;
      children: ChildrenItems[];
    }
);

const AdminSideBar = () => {
  const sidebarItems: SideBarItems[] = [
    {
      name: "Dashboard",
      icon: <Home />,
      links: ["/admin/dashboard"],
      hasChildren: false,
    },

    {
      name: "Organizers",
      icon: <FolderInputIcon />,
      hasChildren: false,
      links: ["/admin/dashboard/organizers"],
    },

    {
      name: "Event",
      icon: (
        <span className="text-[1.75rem]">
          <BiCalendarEvent />
        </span>
      ),
      hasChildren: false,
      links: ["/admin/dashboard/event"],
    },
    {
      name: "Commission",
      icon: (
        <span className="text-[1.75rem]">
          <BsPeopleFill />
        </span>
      ),
      hasChildren: false,
      links: ["/organizer/dashboard/commission"],
    },

  ];

  return (
    <div
      className="md:w-[30%] lg:w-[18%] flex flex-col gap-3 overflow-y-auto side-nav-items 
        absolute md:static      
        -translate-x-[100%] md:translate-x-0"
    >
      {sidebarItems.map((items) => {
        return (
          <ConditionallyRender
            key={items.name}
            condition={!items.hasChildren}
            show={
              <NavItems
                key={items.name}
                link={!items.hasChildren ? items.links : []}
                name={items.name}
                icon={items.icon}
              />
            }
            elseShow={
              <>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1" className="p-0 border-none">
                    <AccordionTrigger className="hover:no-underline w-full p-0 hover:bg-gray-200 rounded-md">
                      {" "}
                      <NavItems
                        key={items.name}
                        name={items.name}
                        icon={items.icon}
                      />
                    </AccordionTrigger>
                    <AccordionContent className="hover:bg-none">
                      {items.hasChildren &&
                        items.children.map((children) => {
                          return (
                            <React.Fragment key={children.name}>
                              {/* <Separator orientation="vertical"/> */}
                              <NavItems
                                name={children.name}
                                link={children.links}
                              />
                            </React.Fragment>
                          );
                        })}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </>
            }
          />
        );
      })}

      <div
        className={
          "flex items-center gap-3 px-2 rounded-md hover:bg-gray-200  py-2 mr-3 transition-all cursor-pointer mt-auto text-red-500 font-medium w-full"
        }
      >
        <div className="text-[1.75rem]">
          <CiLogout />
        </div>
        <div className="text-lg">Signout</div>
      </div>
    </div>
  );
};

interface NavItemsProps {
  link?: Array<string>;
  name: string;
  icon?: React.ReactNode;
}

const NavItems = ({ link, name, icon }: NavItemsProps) => {
  const path = usePathname();

  const isActive = (): boolean => {
    if (!link) return false;
    return link.includes(path);
  };

  return (
    <ConditionallyRender
      condition={link?.[0] ? true : false}
      show={
        <Link
          href={link?.[0] ?? ""}
          className={cn(`flex items-center gap-3 px-2 rounded-md hover:bg-gray-200
            py-2 mr-3 transition-all ${isActive() && "bg-gray-200"}`)}
        >
          <div>{icon}</div>
          <div className="text-md">{name}</div>
        </Link>
      }
      elseShow={
        <div
          className={cn(`flex items-center gap-3 px-2 rounded-md hover:bg-gray-200
          py-2 mr-3 transition-all ${isActive() && "bg-gray-200"}`)}
        >
          <div>{icon}</div>
          <div className="text-md">{name}</div>
        </div>
      }
    />
  );
};

export default AdminSideBar;
