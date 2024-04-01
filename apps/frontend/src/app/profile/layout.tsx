import DefaultNavBar from "@/components/common/navbar/DefaultNavBar";
import { userNavItems } from "@/constants/navbar/links";
const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div>
                <DefaultNavBar linkItems={userNavItems} className="py-5" />
            </div>
            <div className="max-width flex flex-col min-h-screen">
                <div className="flex-1">{children}</div>
            </div>
        </>
    );
};

export default ProfileLayout;
