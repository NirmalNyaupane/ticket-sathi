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
import { string } from "zod";

interface DatePickerProps
  extends Omit<CalendarProps, "className" | "classNames" | "showOutsideDays"> {
  placeholder: string;
  label?: string;
  className?: string;
  disablePastDate?: boolean;
  withTime?: boolean;
  errorMessage?: string;
  onValueChange: (date: Date) => void;
}

const DatePicker = ({
  placeholder,
  label,
  disablePastDate = false,
  withTime = false,
  className,
  onValueChange,
  errorMessage,
  ...props
}: DatePickerProps) => {
  const [date, setDate] = React.useState<Date>(new Date());

  const [timeValue, setTimeValue] = React.useState<string>("00:00");

  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    if (!date) {
      return;
    }
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    const newSelectedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes
    );

    if (isNaN(newSelectedDate.getTime())) {
      return;
    }

    setDate(newSelectedDate);
    setTimeValue(time);
  };

  function isPastDate(date: Date) {
    return differenceInCalendarDays(date, new Date()) < 0;
  }

  React.useEffect(() => {
    onValueChange(date);
  }, [date, onValueChange]);

  return (
    <Popover>
      {label && <Label>{label}</Label>}
      <div className="flex gap-1">
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
        {withTime && (
          <>
            <Label
              id="time-select"
              className={cn(
                "flex border rounded-md justify-start text-left font-normal hover:bg-none"
              )}
            >
              <input
                id="time-select"
                className={cn(
                  "flex justify-center items-center text-left font-normal"
                )}
                type="time"
                value={timeValue}
                onChange={handleTimeChange}
              />
            </Label>
          </>
        )}
      </div>
      {errorMessage && (
        <p className=" text-[0.875rem] mt-2 font-medium text-red-500">
          {errorMessage}
        </p>
      )}
    </Popover>
  );
};

export default DatePicker;
