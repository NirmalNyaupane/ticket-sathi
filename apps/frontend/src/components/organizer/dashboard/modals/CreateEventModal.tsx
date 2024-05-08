"use client";
import { InputField } from "@/components/common/InputField";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DiscountType } from "@/__generated__/graphql";
import LoadingButton from "@/components/common/LoadingButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { ticketValidation } from "@/lib/formvalidation/event/ticket.validation";
import { z } from "zod";
import { register } from "module";
type FormData = z.infer<typeof ticketValidation>;

const CreateUpdateEventModal = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(ticketValidation),
    mode: "onChange",
  });

  const [isUnlimited, setUnlimited] = useState(false);
  const [isEarlyBird, setEarlyBird] = useState(false);

  const unlimitedChanged = () => {
    setUnlimited((prev) => !prev);
  };

  useEffect(() => {
    form.setValue("isUnlimited", isUnlimited);
  }, [isUnlimited, isEarlyBird]);

  console.log(form.formState.errors);

  const formSubmit = form.handleSubmit((data) => {
    console.log(data);
  });
  return (
    <Form {...form}>
      <form onSubmit={formSubmit}>
        <InputField
          type="text"
          label="Name"
          {...form.register("name")}
          errorMessage={form.formState.errors.name?.message}
        />
        <InputField
          type="number"
          label="Price"
          {...form.register("price")}
          errorMessage={form.formState.errors.price?.message}
          min={0}
          onKeyDown={(e) => {
            if (e.key === "-") {
              e.preventDefault();
            }
          }}
        />

        <FormField
          control={form.control}
          name="isUnlimited"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow my-2">
              <FormControl>
                <Checkbox
                  checked={isUnlimited}
                  onCheckedChange={() => unlimitedChanged()}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Unlimited ticket</FormLabel>
                <FormDescription>
                  Check this field if ticket is unlimited
                </FormDescription>
              </div>
              {form.formState.errors.isUnlimited?.message && (
                <p className=" text-[0.875rem] mt-2 font-medium text-red-500">
                  {form.formState.errors.isUnlimited?.message}
                </p>
              )}
            </FormItem>
          )}
        />

        {!isUnlimited && (
          <InputField
            type="number"
            label="Total Tickets"
            errorMessage={form.formState.errors.totalTicket?.message}
            {...form.register("totalTicket")}
          />
        )}

        <FormField
          control={form.control}
          name="earlyBirdOffer"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow my-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={() => {
                    field.onChange(field.value);
                    setUnlimited(field.value);
                  }}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Early bird offer</FormLabel>
                <FormDescription>
                  Check this field if this ticket have early bird offer
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="discountType"
          render={() => {
            return (
              <FormItem>
                <FormLabel>Discount Type</FormLabel>
                <Select>
                  <SelectTrigger className="w-[100%]">
                    <SelectValue placeholder="Select Discount Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={DiscountType.Percentage}>
                      Percentage
                    </SelectItem>
                    <SelectItem value={DiscountType.Flat}>Flat</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            );
          }}
        />

        <InputField
          type="number"
          label="Discount"
          {...form.register("discount")}
          errorMessage={form.formState.errors.discount?.message}
        />
        <LoadingButton>Create</LoadingButton>
      </form>
    </Form>
  );
};

export default CreateUpdateEventModal;
