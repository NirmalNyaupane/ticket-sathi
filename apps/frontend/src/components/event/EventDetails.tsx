import { Separator } from "@radix-ui/react-separator";
import { CalendarDays, MapPin } from "lucide-react";
import SelectMenu from "../common/SelectMenu";
import { Button } from "../ui/button";
import { GetSingleEventQuery } from "@/__generated__/graphql";
import { format } from "date-fns";
import { calculateRemainingDates } from "@/utils/helper";
import CalculateUpcomingTime from "../common/CalculateUpcomingTime";

interface Props {
  events: GetSingleEventQuery["getSingleEvent"];
}
const EventDetails = ({ events }: Props) => {


  const upcomingDate = calculateRemainingDates(new Date(events.eventStartDate));
  
  return (
    <div className="bg-gray-100 flex flex-col gap-4 px-7 rounded-lg py-6 max-h-[600px]">
      {/* heading */}
      <h2 className="text-2xl font-bold">Event Details</h2>
      <Separator decorative={true} className="bg-gray-400 h-1" />
      <CalculateUpcomingTime upcomingTime={new Date(events.eventStartDate)}  />

      <Separator decorative={true} className="bg-gray-400 h-1" />

      <div className="flex items-center gap-3">
        <CalendarDays />
        <div className="leading-[0.3rem]">
          <p className="text-gray-600 text-lg leading-3">Date and Times</p>
          <h2 className=" text-xl font-bold">
            {format(
              new Date(events.eventStartDate),
              "EEE, MMM dd, yyyy hh:mm a"
            )}
          </h2>
        </div>
      </div>

      <Separator decorative={true} className="bg-gray-400 h-1" />

      <div className="flex items-center gap-3">
        <MapPin />
        <div className="leading-[0.3rem]">
          <p className="text-gray-600 text-lg leading-3">Location</p>
          <h2 className=" text-xl font-bold">{events.venue}</h2>
        </div>
      </div>

      <Separator decorative={true} className="bg-gray-400 h-1" />

      <div className=" flex flex-col gap-4">
        <h2 className=" text-xl font-bold">Select Tickets</h2>
        <SelectMenu
          placeholder={"select tickets"}
          selectItems={[
            { label: "VIP", value: "VIP" },
            { label: "Common", value: "Common" },
          ]}
        />

        <div className="flex items-center justify-between">
          <div>
            <p>1 X VIP TICKETS(s) </p>
            <p className="text-2xl font-bold">NPR 1695</p>
          </div>

          <div className=" flex gap-3">
            <Button className="font-bold">-</Button>
            <span className="font-bold text-3xl">2</span>
            <Button className="font-bold">+</Button>
          </div>
        </div>

        <Button className="bg-red-500 hover:bg-red-400">Checkout</Button>
      </div>
    </div>
  );
};

export default EventDetails;
