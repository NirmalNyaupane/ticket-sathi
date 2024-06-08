import AdminSideBar from "@/components/admin/AdminSidebar";
import OrganizerAdminNavbar from "@/components/organizer/layout/OrganizerAdminNavbar";
import React from "react";

const OrganizerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <OrganizerAdminNavbar />
      <main className="max-width flex mt-3 h-[calc(100vh-100px)] relative overflow-x-hidden">
        <AdminSideBar />
        <div className="overflow-y-auto nav-items h-[calc(100vh-100px)] w-[100%] md:w-[70%] lg:w-[78%] main-page absolute right-0 space-y-2">
          {children}
        </div>
      </main>
    </main>
  );
};

export default OrganizerLayout;
