import { Separator } from "@radix-ui/react-separator";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { InputField } from "../common/InputField";
import { Button } from "../ui/button";

const CheckoutSummary = () => {
  return (
    <Card x-chunk="dashboard-01-chunk-5">
      <CardHeader>
        <CardTitle>Checkout Summary</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-12 gap-4">
        <div className="col-start-1 col-end-6">Ticket name</div>
        <div className="col-start-6 col-end-7">1</div>
        <div className="col-start-9 col-end-12">NPR 1000</div>
        <div className="col-start-1 col-end-6">Ticket quantity</div>
        <div className="col-start-9 col-end-12">NPR 100</div>
        <div className="col-start-1 col-end-6">Sub total</div>
        <div className="col-start-9 col-end-12">NPR 100</div>
        <div className="col-start-1 col-end-6">Discount</div>
        <div className="col-start-9 col-end-12">NPR 100</div>
        <div className="col-start-1 col-end-6">Tax</div>
        <div className="col-start-9 col-end-12">NPR 100</div>

        <Separator className="col-start-1 col-end-12 h-1 bg-muted" />

        <div className="col-start-1 col-end-6">Total</div>
        <div className="col-start-9 col-end-12 font-bold">NPR 100</div>

        <Separator className="col-start-1 col-end-12 h-1 bg-muted" />
        <div className="col-start-1 col-end-8">
          <InputField type="text" placeholder="Coupon code" />
        </div>
        <div className="col-start-9 col-end-12">
          <Button>Apply</Button>
        </div>
        <div className="col-start-1 col-end-12">
          <Button className="w-full">Confirm & Pay</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CheckoutSummary;
