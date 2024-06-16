"use client";
import BillingConfirmation from "@/components/checkout/BillingConfirmation";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import { Separator } from "@/components/ui/separator";

const CheckOut = () => {
  return (
    <div className="max-width flex flex-col gap-3 mt-2">
      <h2 className="font-bold text-2xl">Order Confirmation</h2>
      <Separator/>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <BillingConfirmation />
          <CheckoutSummary />
        </div>
      <PaymentMethod/>
      </main>
    </div>
  );
};

export default CheckOut;
