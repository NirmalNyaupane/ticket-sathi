import DefaultNavBar from "@/components/common/navbar/DefaultNavBar";
import Footer from "@/components/common/navbar/Footer";
import { userNavItems } from "@/constants/navbar/links";
const eventLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="bg-gray-900">
        <DefaultNavBar linkItems={userNavItems} className="py-5"/>
      </div>
      <div className="flex flex-col min-h-screen">
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default eventLayout;
