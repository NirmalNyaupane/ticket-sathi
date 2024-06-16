import {
  DiscountType,
  GetTicketByIdQuery
} from "@/__generated__/graphql";
import { Separator } from "@radix-ui/react-separator";
import { useSearchParams } from "next/navigation";
import { memo } from "react";
import { InputField } from "../common/InputField";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import LoadingButton from "../common/LoadingButton";

const CheckoutSummary = ({
  ticket,
  loading
}: {
  ticket: GetTicketByIdQuery["getTicketById"];
  loading:boolean;
}) => {
  const serachParam = useSearchParams();
  const quantity = Number(serachParam.get("quantity") ?? 1);

  //total amount
  let totalAmount = quantity * ticket.price;
  let discountAmount = 0;

  if (ticket.earlyBirdOffer) {
    if (new Date(ticket.discountEndDate) > new Date()) {
      //discount is available
      if (ticket.discountType === DiscountType.Flat && ticket.discount) {
        discountAmount = ticket.discount * quantity;
      } else if (
        ticket.discountType === DiscountType.Percentage &&
        ticket.discount
      ) {
        discountAmount = (totalAmount * ticket.discount) / 100;
      }
    }
  }
  const tax = (totalAmount*10)/100;
  const subTotal = totalAmount-tax;
  totalAmount = totalAmount - discountAmount;

  return (
    <Card x-chunk="dashboard-01-chunk-5">
      <CardHeader>
        <CardTitle>Checkout Summary</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-12 gap-4">
        <div className="col-start-1 col-end-6">{ticket.name}</div>
        <div className="col-start-6 col-end-7">{quantity}</div>
        <div className="col-start-9 col-end-12">
          NPR {subTotal}
        </div>

        <div className="col-start-1 col-end-6">Sub total</div>
        <div className="col-start-9 col-end-12">NPR {subTotal}</div>
        <div className="col-start-1 col-end-6">Discount</div>
        <div className="col-start-9 col-end-12">NPR {discountAmount}</div>
        <div className="col-start-1 col-end-6">Tax</div>
        <div className="col-start-9 col-end-12">NPR {tax}</div>

        <Separator className="col-start-1 col-end-12 h-1 bg-muted" />

        <div className="col-start-1 col-end-6">Total</div>
        <div className="col-start-9 col-end-12 font-bold">NPR {totalAmount}</div>

        <Separator className="col-start-1 col-end-12 h-1 bg-muted" />
        <div className="col-start-1 col-end-8">
          <InputField type="text" placeholder="Coupon code" />
        </div>
        <div className="col-start-9 col-end-12">
          <Button>Apply</Button>
        </div>
        <div className="col-start-1 col-end-12">
          <LoadingButton className="w-full" type="submit" isLoading={loading}>Confirm & Pay</LoadingButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(CheckoutSummary);
