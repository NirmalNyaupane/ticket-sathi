import {
  GetMyTrashedCategoryDocument,
  useDeleteCategoryPermanentMutation,
  useRecoverFromTrashMutation,
} from "@/__generated__/graphql";
import CommonAlert from "@/components/common/CommonAlertDialog";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useCustomToast from "@/hooks/useToast";
import { showError } from "@/utils/helper";
import { Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaWindowRestore } from "react-icons/fa";

interface Props {
  categoryId: string;
  categoryName: string;
}
const TrashCategoryAction = ({ categoryId, categoryName }: Props) => {
  const toast = useCustomToast();
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);

  const handleRestoreButtonClick = useCallback(() => {
    setRestoreDialogOpen((pre) => !pre);
  }, []);

  const [deletDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteDialogOpen = useCallback(() => {
    setDeleteDialogOpen((prev) => !prev);
  }, []);

  const [deleteMutation] = useDeleteCategoryPermanentMutation({
    onCompleted() {
      toast.sucess("Delete category permanently");
    },
  });

  const [restoreMutation] = useRecoverFromTrashMutation({
    onCompleted() {
      toast.sucess("Category recovered sucessfully");
      this.client?.refetchQueries({
        include:[GetMyTrashedCategoryDocument]
      })
    },
  });

  return (
    <>
      <AlertDialog open={restoreDialogOpen} onOpenChange={setRestoreDialogOpen}>
        {/* <AlertDialogTrigger asChild>{triggerButton}</AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Restore category</AlertDialogTitle>
            <AlertDialogDescription>
              {`Restore the ${categoryName}`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                restoreMutation({
                  variables: {
                    categoryId,
                  },
                }).catch((error) => {
                  showError(error);
                });
              }}
            >
              {"Restore"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={deletDialogOpen} onOpenChange={setDeleteDialogOpen}>
        {/* <AlertDialogTrigger asChild>{triggerButton}</AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Permanently Delete</AlertDialogTitle>
            <AlertDialogDescription>
              {`Are you sure permanently delete the ${categoryName} ?`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-500"
              onClick={() => {
                deleteMutation({
                  variables: {
                    categoryId,
                  },
                }).catch((error) => {
                  toast.error(showError(error));
                });
              }}
            >
              {"Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
              onSelect={handleRestoreButtonClick}
            >
              <span className="mr-2 h-4 w-4">
                <FaWindowRestore />
              </span>
              <span>Restore</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={handleDeleteDialogOpen}
            >
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete Permanently</span>
              </>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default TrashCategoryAction;
