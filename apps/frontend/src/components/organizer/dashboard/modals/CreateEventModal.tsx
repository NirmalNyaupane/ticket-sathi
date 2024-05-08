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
import React from "react";
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
const CreateUpdateEventModal = () => {
  const form = useForm();
  return (
    <Form {...form}>
      <form>
        <InputField type="text" label="Name" />
        <InputField type="number" label="Price" />

        <FormField
          control={form.control}
          name="mobile"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow my-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Unlimited ticket</FormLabel>
                <FormDescription>
                  Check this field if ticket is unlimited
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <InputField type="number" label="Total Tickets" />

        <FormField
          control={form.control}
          name="mobile"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow my-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
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
          name="category"
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

        <InputField type="number" label="Discount" />
        <LoadingButton>Create</LoadingButton>
      </form>
    </Form>
  );
};

export default CreateUpdateEventModal;
