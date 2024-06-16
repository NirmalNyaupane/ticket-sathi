"use client";
import {
  GetSingleEventQuery,
  Ticket,
  useGetTicketByEventIdQuery,
} from "@/__generated__/graphql";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@radix-ui/react-separator";
import { format } from "date-fns";
import { CalendarDays, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CalculateUpcomingTime from "../common/CalculateUpcomingTime";
import ConditionallyRender from "../common/ConditionallyRender";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { AuthState } from "@/redux/slices/auth.slice";
import useCustomToast from "@/hooks/useToast";
import { RootState } from "@/redux/store";
interface Props {
  events: GetSingleEventQuery["getSingleEvent"];
}
const EventDetails = ({ events }: Props) => {
  const isUserLoggedIn = useSelector((state:RootState) => state.auth.isUserLogin);

  const [ticketCount, setTicketCount] = useState(1);
  const router = useRouter();
  const toast = useCustomToast();
  const { data: tickets, loading: ticketLoading } = useGetTicketByEventIdQuery({
    variables: {
      ticketId: events.id,
    },
  });

  const [ticketName, setTicketName] = useState(
    tickets?.getTicketByEventId![0]?.name
  );
  const [ticketPrice, setTicketPrice] = useState(
    tickets?.getTicketByEventId![0]?.price
  );
  const [ticketId, setTicketId] = useState(tickets?.getTicketByEventId![0]?.id)

  const handleTicketChange = (value: Ticket) => {
    setTicketName(value.name);
    setTicketPrice(value.price);
    setTicketId(value.id);
  };

  if (ticketLoading) {
    return <p>Loading....</p>;
  }

  return (
    <div className="bg-gray-100 flex flex-col gap-4 px-7 rounded-lg py-6 max-h-[600px]">
      {/* heading */}
      <h2 className="text-2xl font-bold">Event Details</h2>
      <Separator decorative={true} className="bg-gray-400 h-1" />
      <CalculateUpcomingTime upcomingTime={new Date(events.eventStartDate)} />

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
        <ConditionallyRender
          condition={
            tickets?.getTicketByEventId &&
            tickets?.getTicketByEventId?.length > 0
              ? true
              : false
          }
          show={
            <Select
              defaultValue={ticketName}
              //@ts-ignore ts-ignore
              onValueChange={handleTicketChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={ticketName ?? "Select a ticket"} />
              </SelectTrigger>
              <SelectContent defaultValue={ticketName}>
                {tickets?.getTicketByEventId?.map((ticket) => {
                  return (
                    <SelectItem
                      key={ticket.id}
                      // @ts-ignore
                      value={ticket}
                      textValue={ticket.name}
                    >
                      {ticket.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          }
          elseShow={<p>There is no ticket to show</p>}
        />
        <ConditionallyRender
          condition={
            tickets?.getTicketByEventId &&
            tickets?.getTicketByEventId?.length > 0
              ? true
              : false
          }
          show={
            <div className="flex items-center justify-between">
              <div>
                <p>{`${ticketCount} X ${ticketName}(s)`} </p>
                <p className="text-2xl font-bold">{`NPR ${
                  ticketPrice! * ticketCount
                }`}</p>
              </div>

              <div className=" flex gap-3">
                <Button
                  className="font-bold"
                  onClick={() => {
                    setTicketCount((prev) => {
                      if (prev === 1) {
                        return prev;
                      } else {
                        return prev - 1;
                      }
                    });
                  }}
                >
                  -
                </Button>
                <span className="font-bold text-3xl">{ticketCount}</span>
                <Button
                  className="font-bold"
                  onClick={() => {
                    setTicketCount((prev) => {
                      if (prev === 10) {
                        return prev;
                      } else {
                        return prev + 1;
                      }
                    });
                  }}
                >
                  +
                </Button>
              </div>
            </div>
          }
        />

        <Button
          className="bg-red-500 hover:bg-red-400"
          disabled={
            tickets?.getTicketByEventId &&
            tickets?.getTicketByEventId?.length > 0
              ? false
              : true
          }
          onClick={() => {
            if (!isUserLoggedIn) {
              toast.error("You need to logged in for checkout");
              return;
            }
            router.push(`/checkout/${ticketId}?quantity=${ticketCount}`);
          }}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default EventDetails;
