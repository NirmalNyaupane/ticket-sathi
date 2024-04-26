"use client";
import { useUpdateUserMutation } from "@/__generated__/graphql";
import {
  InputField,
  PhoneNumberInputField,
} from "@/components/common/InputField";
import LoadingButton from "@/components/common/LoadingButton";
import useCustomToast from "@/hooks/useToast";
import { updateUserDetails } from "@/lib/formvalidation/user/updateuserdetails.validation";
import { RootState } from "@/redux/store";
import { showError } from "@/utils/helper";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";
type UserData = z.infer<typeof updateUserDetails>;

const MyAccountpage = () => {
  const user = useSelector((state: RootState) => state.user);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserData>({
    defaultValues: {
      fullName: user.fullName,
      address: user.address ?? "",
      //TODO: extract only phone number according to country
      phone: user.phone.replace("+977", ""),
    },
  });

  const [mutate, { error, loading }] = useUpdateUserMutation({
    onCompleted(data, clientOptions) {
      console.log(data.updateUser.message)
      toast.sucess("Update user sucessfully");
    },
  });
  const toast = useCustomToast();
  const formSubmit = handleSubmit((data) => {
    mutate({
      variables: {
        data: data,
      },
    }).catch((error) => {
      toast.error(showError(error));
    });
  });

  return (
    <div className="rounded-lg p-4 md:w-[60%] lg:w-[40%] flex flex-col gap-6 bg-white">
      <div>
        <h2 className="font-semibold">Personal info</h2>
        <p className="text-gray-600">Update your personal information</p>
      </div>

      <form className="space-y-4" onSubmit={formSubmit}>
        <InputField
          label="Full Name"
          {...register("fullName")}
          errorMessage={errors.address?.message}
        />
        <InputField label="Email" disabled value={user.email} />
        <PhoneNumberInputField
          label="Phone"
          {...register("phone")}
          getCountryCode={(e) => console.log(e)}
          errorMessage={errors.phone?.message}
        />
        <InputField
          label="Address"
          {...register("address")}
          errorMessage={errors.address?.message}
        />
        <LoadingButton clasName="w-[100px]" isLoading={loading}>
          Save
        </LoadingButton>
      </form>
    </div>
  );
};

export default MyAccountpage;
