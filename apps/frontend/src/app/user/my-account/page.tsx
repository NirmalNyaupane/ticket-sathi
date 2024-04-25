"use client";
import {
  InputField,
  PhoneNumberInputField,
} from "@/components/common/InputField";
import LoadingButton from "@/components/common/LoadingButton";
import React from "react";

const MyAccountpage = () => {
  return (
    <div className="bg-gray-100 rounded-lg p-4 md:w-[60%] lg:w-[40%] flex flex-col gap-6">
      <div>
        <h2 className="font-semibold">Personal info</h2>
        <p className="text-gray-600">Update your personal information</p>
      </div>

      <form className="space-y-4">
        <InputField label="Full Name" />
        <InputField label="Email" disabled />
        <PhoneNumberInputField
          label="Phone"
          getCountryCode={(e) => console.log(e)}
        />
        <InputField label="Address" />
        <LoadingButton clasName="w-[100px]">Save</LoadingButton>
      </form>

    </div>
  );
};

export default MyAccountpage;
