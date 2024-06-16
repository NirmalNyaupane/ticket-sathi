"use client";
import {
  useCreateBookingMutation,
  useGetTicketByIdQuery,
} from "@/__generated__/graphql";
import BillingConfirmation from "@/components/checkout/BillingConfirmation";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { bookingValidator } from "@/lib/formvalidation/booking/bookingValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
type FormData = z.infer<typeof bookingValidator>;
import { PaymentMethod as PaymentMethodEnum } from "@/__generated__/graphql";
import useCustomToast from "@/hooks/useToast";
import { showError } from "@/utils/helper";
const CheckOut = () => {
  const params = useParams();
  const serachParam = useSearchParams();
  const quantity = Number(serachParam.get("quantity") ?? 1);
  const toast = useCustomToast();
  const form = useForm<FormData>({
    defaultValues: {
      paymentMethod: PaymentMethodEnum.Esewa,
    },
    resolver: zodResolver(bookingValidator),
  });

  const { data, loading } = useGetTicketByIdQuery({
    variables: {
      ticketId: params.id as string,
    },
  });

  const [mutation, { loading: createLoading }] = useCreateBookingMutation({
    onCompleted(data, clientOptions) {
      toast.sucess("Order is booked redirecting to the payment section");
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  const formSubmit = form.handleSubmit((data) => {
    mutation({
      variables: {
        data: {
          ...data,
          ticketId: params.id as string,
          ticketQuantity: quantity,
        },
      },
    }).catch((error) => {
      toast.error(showError(error));
    });
  });

  return (
    <div className="max-width flex flex-col gap-3 mt-2">
      <h2 className="font-bold text-2xl">Order Confirmation</h2>
      <Separator />
      <Form {...form}>
        <form onSubmit={formSubmit}>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
              <BillingConfirmation form={form} />
              <CheckoutSummary
                ticket={data?.getTicketById!}
                loading={createLoading}
              />
            </div>
            <PaymentMethod form={form} />
          </main>
        </form>
      </Form>
    </div>
  );
};

export default CheckOut;
