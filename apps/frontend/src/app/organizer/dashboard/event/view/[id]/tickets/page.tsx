import { GlobalDialog } from "@/components/common/Dialog/GlobalDialog";
import CreateUpdateTicketModal from "@/components/organizer/dashboard/modals/CreateUpdateTicketModal";
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
          <CreateUpdateTicketModal />
        </GlobalDialog>
      </div>
    </div>
  );
};

export default TicketPage;
