'use client'
import { UserRole } from "@/__generated__/graphql";
import OrganizerAdminNavbar from "@/components/organizer/layout/OrganizerAdminNavbar";
import SideBar from "@/components/organizer/layout/SideBar";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";


export const OrganizerProviderLayout = ({ children }: { children: React.ReactNode }) => {
    const state = useSelector((state: RootState) => state.auth!);
    const router = useRouter();

    const checkRole = () => {
        return state.role === UserRole.Organizer;
    }

    useEffect(() => {
        if (!checkRole()) {
            router.push("/organizer/auth/login");
        }
    }, [state]);


    return (
        <div className='relative w-full'>
            <OrganizerAdminNavbar />
            <main className='max-width flex mt-3 h-[calc(100vh-100px)] relative overflow-x-hidden'>
                <SideBar />
                <div className='overflow-y-auto nav-items h-[calc(100vh-100px)] w-[100%] md:w-[70%] lg:w-[78%] main-page absolute right-0 space-y-2'>
                    {children}
                </div>
            </main>
        </div>
    )
}
export default OrganizerProviderLayout;