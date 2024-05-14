import { Separator } from "@radix-ui/react-separator";
import { Ticket, CircleDotIcon, SatelliteDishIcon } from "lucide-react";
import React from "react";
import { BiSolidOffer } from "react-icons/bi";

const TicketCard = () => {
  return (
    <div className="ticket p-2 border-2 border-gray-300 rounded-md flex flex-col gap-3">
      {/* ticket heading section  */}
      <div className="ticket-heading-section flex items-center gap-2">
        <Ticket className="size-8" />
        <div>
          <h2 className="text-xl font-semibold">VVIP</h2>
          <p className="text-gray-600">
            30 Jun, 2023 10:00 AM - 30 Jun, 2023 10:00 AM
          </p>
        </div>
      </div>
      <Separator />

      {/* ticket body section  */}
      <div className="ticket-body flex justify-between">
        <div className="flex items-center gap-2">
          <CircleDotIcon />
          <div>
            <h3 className="text-semibold text-gray-600">Status</h3>
            <p className="text-bold font-bold">ACTIVE</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <SatelliteDishIcon />
          <div>
            <h3 className="text-semibold text-gray-600">Total Used</h3>
            <p className="text-bold font-bold">0/100</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <BiSolidOffer className="text-2xl" />
          <div>
            <h3 className="text-semibold text-gray-600">Discount</h3>
            <p className="text-bold font-bold">10%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
