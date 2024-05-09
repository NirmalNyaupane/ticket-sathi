import DefaultNavBar from "@/components/common/navbar/DefaultNavBar";
import { userNavItems } from "@/constants/navbar/links";

const EventLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DefaultNavBar linkItems={userNavItems} />
      {children}
    </>
  );
};

export default EventLayout;