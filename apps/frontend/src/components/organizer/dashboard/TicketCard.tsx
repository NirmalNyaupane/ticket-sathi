import { Ticket as TicketType } from "@/__generated__/graphql";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "date-fns";
import { Ticket, CircleDotIcon, SatelliteDishIcon } from "lucide-react";
import React from "react";
import { BiSolidOffer } from "react-icons/bi";

interface TicketCardticket{
  ticket:TicketType
}

const TicketCard = ({ticket}:TicketCardticket) => {
  return (
    <div className="ticket p-2 border-2 border-gray-300 rounded-md flex flex-col gap-3">
      {/* ticket heading section  */}
      <div className="ticket-heading-section flex items-center gap-2 relative">
        <Ticket className="size-8" />
        <h2 className="text-xl font-semibold">{ticket.name}</h2>
      </div>
      <Separator />

      {/* ticket body section  */}
      <div className="ticket-body flex justify-between">
        <div className="flex items-center gap-2">
          <CircleDotIcon />
          <div>
            <h3 className="text-semibold text-gray-600">Status</h3>
            <p className="text-bold font-bold">{ticket.status}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <SatelliteDishIcon />
          <div>
            <h3 className="text-semibold text-gray-600">Total Used</h3>
            <p className="text-bold font-bold">
              0/{ticket.isUnlimited ? "Unlimited" : ticket.totalTicket}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <BiSolidOffer className="text-2xl" />
          <div>
            <h3 className="text-semibold text-gray-600">Discount</h3>
            <p className="text-bold font-bold">
              {ticket.earlyBirdOffer ? ticket.discount : "Not available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
