import { EmailVerificationEnum, UserRoleEnum } from "@/constants/enum";
import { registerValidation } from "@/lib/formvalidation/authvalidation";
import { cn } from "@/lib/utils";
import { userRegisterApi } from "@/services/auth.service";
import { UserRegisterPayload } from "@/types/auth/AuthType";
import { ApiFailureError } from "@/types/generics/ApiGenericsType";
import { showError } from "@/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, memo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { z } from "zod";
import {
  InputField,
  InputFieldWithRightIcon,
  PhoneNumberInputField,
} from "../common/InputField";
import LoadingButton from "../common/LoadingButton";
import { Button } from "../ui/button";
import { FormField } from "../ui/form";
import { useToast } from "../ui/use-toast";
type formData = z.infer<typeof registerValidation>;

interface props {
  role: UserRoleEnum;
  className?: string;
}

const Register: FC<props> = ({ role, className }: props) => {
  /********************** state *********************************/
  const [isPasswordShow, setPasswordShow] = useState(false);
  const [isConfirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const [countryCode, setCountryCode] = useState<string>("");

  /******************* Hooks *******************/
  const { toast } = useToast();
  const router = useRouter();
  /*************** Methods ***************************/
  const getCountryCode = (code: string) => {
    setCountryCode(code);
  };

  /** Form handling using react-hook-form ****************/
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    reset,
  } = useForm<formData>({
    resolver: zodResolver(registerValidation),
  });

  /**************** Mutation query using react-query ******************/
  const { mutate, isPending } = useMutation({
    mutationFn: (data: UserRegisterPayload) => {
      return userRegisterApi(data);
    },
    onSuccess: (data) => {
      if (data.status === 200 || data.status === 201) {
        toast({
          variant: "default",
          className: "bg-green-600 text-white font-bold",
          description: "User registered sucessfully",
          duration: 1000,
        });
        router.push(
          `/email-verify?email=${getValues("email")}&action=${
            EmailVerificationEnum.NewRegister
          }`
        );
        reset();
      }
    },
    onError: (error: AxiosError<ApiFailureError<any>>) => {
      toast({
        variant: "destructive",
        description: showError(error),
        className: "font-bold",
        duration: 1000,
      });
    },
  });

  const formSubmit: SubmitHandler<formData> = async (e) => {
    const { confirmPassword, phone_number, ...restData } = e;
    const newPhoneNumber = countryCode.concat(getValues("phone_number"));
    const sendData = { ...restData, role: role, phone_number: phone_number };

    mutate(sendData);
  };

  return (
    <>
      <form
        className={cn(`flex flex-col gap-2 ${className}`)}
        onSubmit={handleSubmit(formSubmit)}
      >
        <FormField
          name="full_name"
          control={control}
          render={({ field }) => {
            return (
              <InputField
                type="text"
                label="Full Name"
                formReturn={register("full_name")}
                {...field}
                errorMessage={errors.full_name?.message}
              />
            );
          }}
        />

        <FormField
          control={control}
          name="email"
          render={({ field }) => {
            return (
              <InputField
                type="email"
                label="Email"
                errorMessage={errors.email?.message}
                {...field}
              />
            );
          }}
        />

        <PhoneNumberInputField
          label="Phone number"
          formReturn={register("phone_number")}
          errorMessage={errors.phone_number?.message}
          getCountryCode={getCountryCode}
        />

        <InputField
          type="text"
          label="Address"
          {...register("address")}
          errorMessage={errors.address?.message}
        />

        <InputFieldWithRightIcon
          label="Password"
          type={!isPasswordShow ? "password" : "text"}
          rightIcon={
            !isPasswordShow ? (
              <Eye className="cursor-pointer" />
            ) : (
              <EyeOff className=" cursor-pointer" />
            )
          }
          {...register("password")}
          errorMessage={errors.password?.message}
          onRightIconClicked={() => {
            setPasswordShow(!isPasswordShow);
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

        <LoadingButton isLoading={isPending}>Register</LoadingButton>

        {role === UserRoleEnum.USER && (
          <>
            <p className="leading-7 [&:not(:first-child)]:mt-6 text-center">
              OR SIGN UP USING
            </p>
            <div className="text-center my-3">
              <Button className="bg-white text-black border-black border-2 hover:text-white">
                <FaGoogle />
              </Button>
            </div>
          </>
        )}
      </form>
    </>
  );
};

export default memo(Register);
