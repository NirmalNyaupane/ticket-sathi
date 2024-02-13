'use client'
import { cn } from '@/lib/utils';
import { FolderInputIcon, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { BiCalendarEvent, BiChat, BiSolidCoupon } from 'react-icons/bi';
import { BsPeopleFill } from 'react-icons/bs';
import { CiLogout } from "react-icons/ci";
import './scrollbar.css';

const SideBar = () => {
    const sidebarItems = [
        {
            name: "Dashboard",
            icon: <Home />,
            links: ["/organizer/dashboard"]
        },

        {
            name: "Event Category",
            icon: <FolderInputIcon />,
            links: ["/organizer/dashboard/event-category"]
        },

        {
            name: "Event",
            icon: <span className='text-[1.75rem]'><BiCalendarEvent /></span>,
            links: ["/organizer/event"]
        },

        {
            name: "Employees",
            icon: <span className='text-[1.75rem]'><BsPeopleFill /></span>,
            links: ["/organizer/employees"]
        },
        {
            name: "Coupons",
            icon: <span className='text-[1.75rem]'><BiSolidCoupon /></span>,
            links: ["/organizer/employees"]
        },
        {
            name: "Chat",
            icon: <span className='text-[1.75rem]'><BiChat /></span>,
            links: ["/organizer/employees"]
        },
    ]


    return (
        <div className='md:w-[30%] lg:w-[18%] flex flex-col gap-3 overflow-y-auto side-nav-items 
        absolute md:static      
        -translate-x-[100%] md:translate-x-0'>
            {
                sidebarItems.map((items) => {
                    return <NavItems key={items.name} link={items.links} name={items.name} icon={items.icon} />
                })
            }

            <div className={"flex items-center gap-3 px-2 rounded-md hover:bg-gray-200  py-2 mr-3 transition-all cursor-pointer mt-auto text-red-500 font-medium"}>
                <div className='text-[1.75rem]'><CiLogout /></div>
                <div className='text-lg'>Signout</div>
            </div>
        </div>
    )
}

interface NavItemsProps {
    link: Array<string>;
    name: string;
    icon: React.ReactNode;
}

const NavItems = ({ link, name, icon }: NavItemsProps) => {
    const path = usePathname();

    const isActive = (): boolean => {
        return link.includes(path);
    }

    return (
        <Link href={link?.[0]} className={cn(`flex items-center gap-3 px-2 rounded-md hover:bg-gray-200 
            py-2 mr-3 transition-all ${isActive() && "bg-gray-200"}`)}>
            <div>{icon}</div>
            <div className='text-md'>{name}</div>
        </Link>
    )
}

export default SideBar;