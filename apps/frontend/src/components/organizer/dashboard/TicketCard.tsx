import {
  Ticket as TicketType,
  useDeleteTicketMutation,
} from "@/__generated__/graphql";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  CircleDotIcon,
  Edit,
  SatelliteDishIcon,
  Ticket,
  Trash2,
} from "lucide-react";
import { useCallback, useState } from "react";
import { BiSolidOffer } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import CreateUpdateTicketModal from "./modals/CreateUpdateTicketModal";
import useCustomToast from "@/hooks/useToast";
import { showError } from "@/utils/helper";

interface TicketCardticket {
  ticket: TicketType;
}

const TicketCard = ({ ticket }: TicketCardticket) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const toast = useCustomToast();

  const handleMenuItemClick = () => {
    setOpenDialog(true);
  };

  const handleDelete = useCallback(() => {
    setDeleteDialog((prev) => !prev);
  }, []);

  const [deleteMutation] =
    useDeleteTicketMutation({
      onCompleted() {
        toast.sucess("Delete ticket sucessfully");
      },
    });
  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <h2 className="text-lg font-semibold leading-none tracking-tight">
            Edit Ticket
          </h2>
          <CreateUpdateTicketModal action="update" ticket={ticket} />
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        {/* <AlertDialogTrigger asChild>{triggerButton}</AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Ticket</AlertDialogTitle>
            <AlertDialogDescription>
              {`Are you sure want to delete the ticket ${ticket.name} ?`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-500"
              onClick={() => {
                deleteMutation({
                  variables: {
                    ticketId: ticket.id,
                  },
                }).catch((error) => {
                  toast.error(showError(error));
                });
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="ticket p-2 border-2 border-gray-300 rounded-md flex flex-col gap-3">
        {/* ticket heading section  */}
        <div className="ticket-heading-section flex items-center gap-2 w-full">
          <Ticket className="size-8" />
          <h2 className="text-xl font-semibold">{ticket.name}</h2>

          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link">
                  <BsThreeDotsVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={handleMenuItemClick}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={handleDelete}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
    </>
  );
};

export default TicketCard;
