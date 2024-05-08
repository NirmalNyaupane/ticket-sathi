import { GlobalDialog } from "@/components/common/Dialog/GlobalDialog";
import CreateUpdateEventModal from "@/components/organizer/dashboard/modals/CreateEventModal";
import { Button } from "@/components/ui/button";

const TicketPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="bold text-lg font-bold">Tickets of Event</h2>
        <GlobalDialog
          dialogButton={<Button>Create Ticket</Button>}
          dialogTitle="Create Ticket"
        >
          <CreateUpdateEventModal />
        </GlobalDialog>
      </div>
    </div>
  );
};

export default TicketPage;
