"use client";
import { useViewEventsTicketQuery } from "@/__generated__/graphql";
import ConditionallyRender from "@/components/common/ConditionallyRender";
import TicketCard from "@/components/organizer/dashboard/TicketCard";
import { useParams } from "next/navigation";

const AdminTicketPage = () => {
  const params = useParams();
  const { data, loading, error } = useViewEventsTicketQuery({
    variables: {
      eventId: params.id as string,
    },
  });
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="bold text-lg font-bold">Tickets of Event</h2>
      </div>
      <ConditionallyRender
        condition={loading}
        show={<>loading....</>}
        elseShow={
          <div className="ticket-section grid md:grid-cols-2 gap-3 mt-3">
            {data?.viewEventsTicket?.map((ticket) => {
              return <TicketCard key={ticket.id} ticket={ticket} />;
            })}
          </div>
        }
      />
    </>
  );
};

export default AdminTicketPage;
