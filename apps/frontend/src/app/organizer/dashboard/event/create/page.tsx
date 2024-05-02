"use client";
import EventCeateUpdate from "@/components/event/EventCreate";
import DashboardTopContent from "@/components/organizer/dashboard/DashboardTopContent";

const EventCreatePage = () => {
  return (
    <div className="">
      <DashboardTopContent text={"Event Create"} />
      <EventCeateUpdate action="create"/>
    </div>
  );
};

export default EventCreatePage;
