import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FC } from "react";

interface Propos {
  triggerButton: React.ReactNode;
  title: string;
  description: string;
  onActionClick: () => void;
  cancelButtonName?: string;
  okButtonName?: string;
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommonAlert: FC<Propos> = ({
  triggerButton,
  title,
  description,
  onActionClick,
  cancelButtonName,
  okButtonName,
  open,
  onOpenChange,
}: Propos) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{triggerButton}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelButtonName ?? "Cancel"}</AlertDialogCancel>
          <AlertDialogAction onClick={onActionClick}>
            {okButtonName ?? "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CommonAlert;
