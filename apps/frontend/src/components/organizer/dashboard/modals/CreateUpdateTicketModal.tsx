"use client";
import {
  CreateTicketMutation,
  CreateTicketMutationVariables,
  DiscountType,
  useCreateTicketMutation,
} from "@/__generated__/graphql";
import DatePicker from "@/components/common/DatePicker";
import { InputField } from "@/components/common/InputField";
import LoadingButton from "@/components/common/LoadingButton";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCustomToast from "@/hooks/useToast";
import { ticketValidation } from "@/lib/formvalidation/event/ticket.validation";
import { showError } from "@/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
type FormData = z.infer<typeof ticketValidation>;

const CreateUpdateTicketModal = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(ticketValidation),
    mode: "onChange",
  });

  const [isUnlimited, setUnlimited] = useState(false);
  const [isEarlyBird, setEarlyBird] = useState(false);
  const params = useParams();
  const toast = useCustomToast();

  const [mutation, { loading, error }] = useCreateTicketMutation({
    onCompleted() {
      toast.sucess("Ticket created sucessfully");
    },
  });

  const unlimitedChanged = () => {
    setUnlimited((prev) => !prev);
  };

  const earlyBirdChanged = () => {
    setEarlyBird((prev) => !prev);
  };

  useEffect(() => {
    form.setValue("isUnlimited", isUnlimited);
  }, [isUnlimited]);

  useEffect(() => {
    form.setValue("earlyBirdOffer", isEarlyBird);
  }, [isEarlyBird]);

  const formSubmit = form.handleSubmit((data) => {
    const sendData = { ...data } as CreateTicketMutationVariables["data"];
    sendData.eventId = params.id as string;
    if (data.isUnlimited) {
      sendData.totalTicket = null;
    }
    if (!data.earlyBirdOffer) {
      sendData.discount = null;
      sendData.discountEndDate = null;
      sendData.discountType = undefined;
    }

    console.log(sendData)

    mutation({
      variables: {
        data: sendData,
      },
    }).catch((error) => {
      toast.error(showError(error));
    });
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
                  checked={isEarlyBird}
                  onCheckedChange={() => {
                    earlyBirdChanged();
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

        {isEarlyBird && (
          <>
            <FormField
              control={form.control}
              name="discountType"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Discount Type</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
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

            <FormField
              control={form.control}
              name="discountEndDate"
              render={({ field }) => {
                return (
                  <DatePicker
                    placeholder="Discount end date"
                    label="Event end date"
                    disablePastDate={true}
                    className="block"
                    withTime
                    onValueChange={field.onChange}
                    errorMessage={
                      form.formState.errors.discountEndDate?.message
                    }
                  />
                );
              }}
            />

            <InputField
              type="number"
              label="Discount"
              {...form.register("discount")}
              errorMessage={form.formState.errors.discount?.message}
            />
          </>
        )}

        <LoadingButton isLoading={loading}>Create</LoadingButton>
      </form>
    </Form>
  );
};

export default CreateUpdateTicketModal;
