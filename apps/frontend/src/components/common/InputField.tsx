"use client";
import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import countryCode from "@/lib/countryCode";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface InputFieldProps extends InputProps {
  label?: string;
  errorMessage?: string;
  formReturn?: UseFormRegisterReturn;
  className?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, label, errorMessage, formReturn, ...restProps }, ref) => {
    return (
      <>
        <div className="w-full space-y-1">
          {label && <Label>{label}</Label>}
          <Input
            className={cn(
              `ring-gray-50 ring-1 focus-within:ring-gray-50 focus:ring-offset-0 w-full block ${errorMessage && "border-red-500"
              }`,
              className
            )}
            {...formReturn}
            ref={ref}
            {...restProps}
          />
          {errorMessage && (
            <p className=" text-[0.875rem] mt-2 font-medium text-red-500">
              {errorMessage}
            </p>
          )}
        </div>
      </>
    );
  }
);
InputField.displayName = "InputField";

interface InputFieldWithRightIconProps extends InputFieldProps {
  rightIcon?: React.ReactElement;
  onRightIconClicked?: () => void;
}
const InputFieldWithRightIcon = React.forwardRef<
  HTMLInputElement,
  InputFieldWithRightIconProps
>(
  (
    {
      className,
      label,
      formReturn,
      errorMessage,
      rightIcon,
      onRightIconClicked,
      ...restProps
    },
    ref
  ) => {
    return (
      <div className="w-full space-y-1">
        {label && <Label>{label}</Label>}
        <div className="relative">
          <Input
            className={cn(
              `ring-gray-50 ring-1 focus-within:ring-gray-50 focus:ring-offset-0 w-full block ${errorMessage && "border-red-500"
              }`,
              className
            )}
            ref={ref}

            {...formReturn}
            {...restProps}
          />
          {rightIcon && (
            <span
              className="font-light text-sm absolute top-2 right-2"
              onClick={onRightIconClicked}
            >
              {rightIcon}
            </span>
          )}

          {errorMessage && (
            <p className=" text-[0.875rem] mt-2 font-medium text-red-500">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    );
  }
);
InputFieldWithRightIcon.displayName = "InputFieldWithRightIcon";

interface PhoneNumberInputFieldProps extends Omit<InputFieldProps, "type"> {
  getCountryCode: (code: string) => void;
}
const PhoneNumberInputField = React.forwardRef<
  HTMLInputElement,
  PhoneNumberInputFieldProps
>(({ label, formReturn, className, getCountryCode, errorMessage, ...restProps }, ref) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("+977");

  useEffect(() => {
    getCountryCode(value)
  }, [getCountryCode, value])

  return (
    <>
      <div className="w-full space-y-1">
        {label && <Label>{label}</Label>}
        <div className="flex gap-1 items-center">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={`w-[70px] justify-between ${errorMessage && "border-red-500"
                  }`}
              >
                {value ? (
                  <Image
                    src={
                      countryCode.find(
                        (singleCountry) => singleCountry.phone[0] === value
                      )?.image as string
                    }
                    alt={""}
                    width={20}
                    height={20}
                  ></Image>
                ) : (
                  "Select framework..."
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search framework..." />
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandGroup className="px-0 overflow-y-auto">
                  {countryCode.map((country) => (
                    <CommandItem
                      key={country.name}
                      value={country.name}
                      onSelect={(currentValue) => {
                        setValue(country.phone[0]);
                        setOpen(false);
                      }}
                      className="px-0"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === country.name ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <span className="flex items-center gap-2">
                        <Image
                          src={country.image}
                          alt="flat"
                          height={20}
                          width={20}
                        ></Image>
                        {country.name}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <InputField
            type="number"
            className={cn(`${errorMessage && "border-red-500"}`, className)}
            ref={ref}
            {...formReturn}
            {...restProps}
          />
        </div>
        {errorMessage && (
          <p className=" text-[0.875rem] mt-2 font-medium text-red-500">
            {errorMessage}
          </p>
        )}
      </div>
    </>
  );
});
PhoneNumberInputField.displayName = "PhoneNumberInputField";
export { InputField, InputFieldWithRightIcon, PhoneNumberInputField };
