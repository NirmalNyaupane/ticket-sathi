import React from "react";
import { InputField } from "../common/InputField";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { UseFormReturn } from "react-hook-form";
import { bookingValidator } from "@/lib/formvalidation/booking/bookingValidator";
import { z } from "zod";
type FormData = z.infer<typeof bookingValidator>;
const BillingConfirmation = ({ form }: { form: UseFormReturn<FormData> }) => {
  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Billing Confirmation</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <InputField
          label="Full Name"
          type="text"
          {...form.register("fullName")}
          errorMessage={form.formState.errors.fullName?.message}
        />
        <div className="md:flex gap-3">
          <InputField
            label="Email"
            type="email"
            {...form.register("email")}
            errorMessage={form.formState.errors.email?.message}
          />
          <InputField
            label="Address"
            type="text"
            {...form.register("address")}
            errorMessage={form.formState.errors.address?.message}
          />
        </div>
        <div className="md:flex gap-3">
          <InputField
            label="Country"
            type="text"
            value={"Nepal"}
            {...form.register("country")}
            errorMessage={form.formState.errors.country?.message}
          />
          <InputField
            label="State"
            type="text"
            {...form.register("state")}
            errorMessage={form.formState.errors.state?.message}
          />
        </div>
        <div className="md:flex gap-3">
          <InputField
            label="City"
            type="text"
            {...form.register("city")}
            errorMessage={form.formState.errors.city?.message}
          />
          <InputField
            label="Zip/Postal code"
            type="text"
            {...form.register("zipCode")}
            errorMessage={form.formState.errors.zipCode?.message}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BillingConfirmation;
