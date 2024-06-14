import DashboardTopContent from "@/components/organizer/dashboard/DashboardTopContent";
import React from "react";

const CommissionLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <DashboardTopContent text="Commission" />
      {children}
    </div>
  );
};

export default CommissionLayout;
