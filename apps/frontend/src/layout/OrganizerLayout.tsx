'use client'
import OrganizerAdminNavbar from "@/components/organizer/layout/OrganizerAdminNavbar";
import SideBar from "@/components/organizer/layout/SideBar";
import { useToast } from "@/components/ui/use-toast";
import { UserRole } from "@/constants/enum";
import useOrganizerDataFetch from "@/hooks/useOrganizerDataFetch";
import { addOrganizer } from "@/redux/slices/organizer.slice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";


export const OrganizerProviderLayout = ({ children }: { children: React.ReactNode }) => {
    const state = useSelector((state: RootState) => state.auth!);
    const { toast } = useToast();
    const router = useRouter();
    const dispatch = useDispatch();

    const { data, isLoading, isSuccess } = useOrganizerDataFetch({
        enabled: state.role === UserRole.ORGANIZER,
    });

    const checkRole = () => {
        if (state.role !== UserRole.ORGANIZER) {
            toast({
                description: "You are not authorized",
                duration: 1000,
                variant: "destructive"
            })
            router.push("/organizer/auth/login")
        }
    }
    // useEffect(() => {
    //     checkRole();
    // }, [state]);

    if (isLoading) {
        return <p>Loading.....................</p>
    }

    if (isSuccess) {
        console.log("sucess");
    }

    if (isSuccess) {
        dispatch(addOrganizer(data.data.data));
    }

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