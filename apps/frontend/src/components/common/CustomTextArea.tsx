import React from "react";
import { Textarea, TextareaProps } from "../ui/textarea";
import { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
interface Props extends TextareaProps {
  label?: string;
  className?: string;
  formReturn?: UseFormRegisterReturn;
  errorMessage?: string;
}
const CustomTextArea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ label, formReturn, className, errorMessage, ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        {label && <Label>{label}</Label>}
        <Textarea
          className={cn(
            `ring-gray-50 ring-1 focus-within:ring-gray-50 focus:ring-offset-0 w-full block ${
              errorMessage && "border-red-500"
            }`,
            className
          )}
          {...formReturn}
          {...props}
          ref={ref}
        />
        {errorMessage && (
          <p className=" text-[0.875rem] mt-2 font-medium text-red-500">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

CustomTextArea.displayName = "CustomTextArea";
export default CustomTextArea;
