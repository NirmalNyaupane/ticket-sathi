"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogProps } from "@radix-ui/react-dialog";
import { ReactElement, useState } from "react";

interface props extends DialogProps {
  dialogButton: ReactElement;
  dialogTitle: string;
  open?: boolean;
  dialogDescription?: string;
}
export function GlobalDialog({
  children,
  dialogButton,
  dialogTitle,
  dialogDescription,
}: props) {
  const [open, setOpen] = useState(false);

  const openCloseModel = () => {
    setOpen(!open);
  };

  return (
    <Dialog open={open} onOpenChange={openCloseModel}>
      <DialogTrigger asChild>{dialogButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] overflow-auto">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          {dialogDescription && (
            <DialogDescription>{dialogDescription}</DialogDescription>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default GlobalDialog;
