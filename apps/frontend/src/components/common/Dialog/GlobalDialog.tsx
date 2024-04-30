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
import { memo, ReactElement, useState } from "react";

interface props extends DialogProps {
  dialogButton: ReactElement;
  dialogTitle: string;
  isModelOpen?: boolean;
  closeModel?: () => void;
  dialogDescription?: string;
}
export function GlobalDialog({
  children,
  dialogButton,
  dialogTitle,
  dialogDescription,
  isModelOpen,
  closeModel
}: props) {
  return (
    <Dialog open={isModelOpen} onOpenChange={closeModel}>
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

export default memo(GlobalDialog);
