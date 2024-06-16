import React from "react";
import { InputField } from "../common/InputField";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const BillingConfirmation = () => {
  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Billing Confirmation</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <InputField label="Full Name" type="text" />
        <div className="md:flex gap-3">
          <InputField label="Email" type="email" />
          <InputField label="Address" type="email" />
        </div>
        <div className="md:flex gap-3">
          <InputField label="Country" type="text" value={"Nepal"} />
          <InputField label="State" type="text" />
        </div>
        <div className="md:flex gap-3">
          <InputField label="City" type="text" />
          <InputField label="Zip/Postal code" type="text" />
        </div>
      </CardContent>
    </Card>
  );
};

export default BillingConfirmation;
