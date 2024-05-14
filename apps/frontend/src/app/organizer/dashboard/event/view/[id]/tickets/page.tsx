"use client";
import { useViewEventsTicketQuery } from "@/__generated__/graphql";
import ConditionallyRender from "@/components/common/ConditionallyRender";
import { GlobalDialog } from "@/components/common/Dialog/GlobalDialog";
import CreateUpdateTicketModal from "@/components/organizer/dashboard/modals/CreateUpdateTicketModal";
import TicketCard from "@/components/organizer/dashboard/TicketCard";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

const TicketPage = () => {
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
        <GlobalDialog
          dialogButton={<Button>Create Ticket</Button>}
          dialogTitle="Create Ticket"
        >
          <CreateUpdateTicketModal />
        </GlobalDialog>
      </div>
      <ConditionallyRender
        condition={loading}
        show={<>loading....</>}
        elseShow={
          <div className="ticket-section space-y-3 mt-2">
           {
            data?.viewEventsTicket?.map((ticket)=>{
              return <TicketCard key={ticket.id} ticket={ticket} />
            })
           }
          </div>
        }
      />
    </>
  );
};

export default TicketPage;
