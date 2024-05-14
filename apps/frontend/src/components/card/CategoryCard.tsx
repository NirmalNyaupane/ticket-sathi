"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useCustomToast from "@/hooks/useToast";
import { showError } from "@/utils/helper";
import { Edit, Trash2 } from "lucide-react";
import { forwardRef, useCallback, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  GetMyCategoryDocument,
  useMovedcategoryMutation,
} from "../../__generated__/graphql";
import CategoryModal from "../organizer/dashboard/modals/CategoryModal";
import { AlertDialogFooter, AlertDialogHeader } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Dialog, DialogContent } from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
interface Props {
  id: string;
  categoryName: string;
  totalEvent: number;
  description: string;
}
const CategoryCard = forwardRef<HTMLDivElement, Props>(
  ({ categoryName, totalEvent, id, description }, ref) => {
    const toast = useCustomToast();
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);

    const handleMenuItemClick = () => {
      setOpenDialog(true);
    };

    const handleMoveToCategory = useCallback(() => {
      setDeleteDialog((prev) => !prev);
    }, []);

    const [mutation] = useMovedcategoryMutation({
      onCompleted() {
        this.client?.refetchQueries({
          include: [GetMyCategoryDocument],
        });
        toast.sucess("Category moved to trash sucessfully");
      },
    });
    return (
      <>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <h2 className="text-lg font-semibold leading-none tracking-tight">
              Edit Category
            </h2>
            <CategoryModal
              action="update"
              category={{ id, name: categoryName, description }}
            />
          </DialogContent>
        </Dialog>

        <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
          {/* <AlertDialogTrigger asChild>{triggerButton}</AlertDialogTrigger> */}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Move category to trash</AlertDialogTitle>
              <AlertDialogDescription>
                {`Are you sure move the ${categoryName} into trash ?`}
                <p>{`All events associated with ${categoryName} will be moved into trash`}</p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 hover:bg-red-500"
                onClick={() => {
                  mutation({
                    variables: {
                      categoryId: id,
                    },
                  }).catch((error) => {
                    toast.error(showError(error));
                  });
                }}
              >
                {"Move"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Card
          className="w-[350px] max-h-[200px] space-y-1 shadow-sm relative"
          ref={ref}
        >
          <CardHeader className="space-y-2 px-4 py-1 relative">
            <CardTitle className="text-[1.2rem]">{categoryName}</CardTitle>
            <CardDescription className="line-clamp-4 text-[0.9rem]">
              {description}
            </CardDescription>
          </CardHeader>

          <CardContent className="absolute top-0 right-0">
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
                    onSelect={handleMoveToCategory}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Move to trash</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>

          <CardFooter className="px-4 flex-col items-start w-fit">
            <div className="font-bold">Total Event</div>
            <div className="font-bold text-center">{totalEvent}</div>
          </CardFooter>
        </Card>
      </>
    );
  }
);
CategoryCard.displayName = "Card";
export default CategoryCard;
