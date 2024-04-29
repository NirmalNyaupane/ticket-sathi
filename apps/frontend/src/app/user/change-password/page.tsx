"use client";
import { useUpdateUserMutation } from "@/__generated__/graphql";
import { InputFieldWithRightIcon } from "@/components/common/InputField";
import LoadingButton from "@/components/common/LoadingButton";
import useCustomToast from "@/hooks/useToast";
import { changePasswordValidation } from "@/lib/formvalidation/user/changePasswordFormValidation";
import { showError } from "@/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type formData = z.infer<typeof changePasswordValidation>;
const ChangePassword = () => {
  const [isOldPasswordShow, setIsOldPasswordShow] = useState(false);
  const [isNewPasswordShow, setIsNewPasswordShow] = useState(false);
  const [isConfirmPasswordShow, setConfirmPasswordShow] = useState(false);

  const toast = useCustomToast();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<formData>({
    resolver: zodResolver(changePasswordValidation),
  });

  const [mutation, { error, data, loading }] = useUpdateUserMutation({
    onCompleted(data, clientOptions) {
      toast.sucess("Password changed sucessfully");
      reset();
    },
  });

  const formSubmit = handleSubmit((data) => {
    const { confirmPassword, ...restData } = data;

    mutation({
      variables: {
        data: restData,
      },
    }).catch((error) => {
      toast.error(showError(error));
    });
  });

  return (
    <div className="rounded-lg p-4 md:w-[60%] lg:w-[40%] flex flex-col gap-6 bg-white">
      <div>
        <h2 className="font-semibold">Change Password</h2>
        <p className="text-gray-600">Change your password</p>
      </div>

      <form className="space-y-4" onSubmit={formSubmit}>
        <InputFieldWithRightIcon
          label="Old Password"
          type={!isOldPasswordShow ? "password" : "text"}
          rightIcon={
            !isOldPasswordShow ? (
              <Eye className="cursor-pointer" />
            ) : (
              <EyeOff className=" cursor-pointer" />
            )
          }
          {...register("oldPassword")}
          errorMessage={errors.oldPassword?.message}
          onRightIconClicked={() => {
            setIsOldPasswordShow(!isOldPasswordShow);
          }}
        />
        <InputFieldWithRightIcon
          label="New Password"
          type={!isNewPasswordShow ? "password" : "text"}
          rightIcon={
            !isNewPasswordShow ? (
              <Eye className="cursor-pointer" />
            ) : (
              <EyeOff className=" cursor-pointer" />
            )
          }
          {...register("newPassword")}
          errorMessage={errors.newPassword?.message}
          onRightIconClicked={() => {
            setIsNewPasswordShow(!isNewPasswordShow);
          }}
        />
        <InputFieldWithRightIcon
          label="Confirm Password"
          type={!isConfirmPasswordShow ? "password" : "text"}
          rightIcon={
            !isConfirmPasswordShow ? (
              <Eye className="cursor-pointer" />
            ) : (
              <EyeOff className=" cursor-pointer" />
            )
          }
          {...register("confirmPassword")}
          errorMessage={errors.confirmPassword?.message}
          onRightIconClicked={() => {
            setConfirmPasswordShow(!isConfirmPasswordShow);
          }}
        />
        <LoadingButton clasName="w-[100px]" isLoading={loading}>
          Change
        </LoadingButton>
      </form>
    </div>
  );
};

export default ChangePassword;
