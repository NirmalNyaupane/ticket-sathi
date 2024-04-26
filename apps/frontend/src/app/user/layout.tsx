import DefaultNavBar from "@/components/common/navbar/DefaultNavBar";
import Footer from "@/components/common/navbar/Footer";
import { userNavItems } from "@/constants/navbar/links";
import ProfileLayout from "@/layout/ProfileLayout";
const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>
        <DefaultNavBar linkItems={userNavItems} className="py-5" />
      </div>
      <div className="flex flex-col gap-5 bg-muted/40">
        <ProfileLayout>{children}</ProfileLayout>
        <Footer />
      </div>
    </>
  );
};

export default UserLayout;
