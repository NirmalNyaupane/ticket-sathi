"use client";

import * as React from "react";
import { differenceInCalendarDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarProps } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "../ui/label";

interface DatePickerProps
  extends Omit<CalendarProps, "className" | "classNames" | "showOutsideDays"> {
  placeholder: string;
  label?: string;
  className?: string;
  disablePastDate?: boolean;
}

const DatePicker = ({
  placeholder,
  label,
  disablePastDate = false,
  className,
  ...props
}: DatePickerProps) => {
  const [date, setDate] = React.useState<Date>();
  function isPastDate(date: Date) {
    return differenceInCalendarDays(date, new Date()) < 0;
  }
  return (
    <Popover>
      {label && <Label>{label}</Label>}
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP")
          ) : (
            <span>{placeholder ?? "Pick a date"}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn(`w-auto p-0`, className)}>
        <Calendar
          mode="single"
          selected={date}
          //@ts-ignore
          onSelect={setDate}
          initialFocus
          disabled={disablePastDate && isPastDate}
          {...props}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
