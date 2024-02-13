"use client";
import { EmailVerificationEnum } from "@/constants/enum";
import { otpValidation } from "@/lib/formvalidation/authvalidation";
import { otpVerificationApi, resendOtpApi } from "@/services/auth.service";
import { ApiFailureError } from "@/types/generics/ApiGenericsType";
import CountDown from "@/utils/CountDown";
import { showError } from "@/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import OtpInput from "react-otp-input";
import { z } from "zod";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { InputField } from "./InputField";
import LoadingButton from "./LoadingButton";

type otptype = z.infer<typeof otpValidation>;

const EmailVerification = ({
  email,
  purpose,
}: {
  email: string;
  purpose: EmailVerificationEnum;
}) => {
  /***************** State ********************************/
  const [otp, setOtp] = useState("");
  const [isResentInCounting, setIsResentInCounting] = useState(true);

  /** Hooks */
  const { toast } = useToast();

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<otptype>({
    resolver: zodResolver(otpValidation),
  });

  useEffect(() => {
    setValue("otp", otp);
  }, [otp]);

  /*************** mutation for new password ******************************************/
  const newRegisterOtpVerification = useMutation({
    mutationFn: async () => {
      return await otpVerificationApi(email, otp);
    },
    onSuccess: (data) => {
      if (data.status === 200 || data.status === 201) {
        toast({
          variant: "default",
          className: "bg-green-600 text-white font-bold",
          description: "Email verify sucessfully",
          duration: 1000,
        });
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

  //resend otp mutation
  const resendEmailMutation = useMutation({
    mutationFn: () => {
      return resendOtpApi(email);
    },
    onSuccess: (data) => {
      if (data.status === 200 || data.status === 201) {
        toast({
          variant: "default",
          className: "bg-green-600 text-white font-bold",
          description: "OTP send sucessfully",
          duration: 1000,
        });
        setIsResentInCounting(true);
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

  //hadle api call after countinue botton is called based on the purpose
  const handleCountinue = handleSubmit((data) => {
    if (purpose === EmailVerificationEnum.NewRegister) {
      newRegisterOtpVerification.mutate();
    }
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center">Email Verification</h2>
      <p>
        We just sent a 6 digit code to your email {email}. Enter the code here:
      </p>

      <form className="space-y-6" onSubmit={handleCountinue}>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={5}
          renderSeparator={<span className="min-w-3 md:min-w-5"></span>}
          renderInput={(props) => (
            <InputField
              {...props}
              type="number"
              className="block min-w-[50px] min-h-[50px] md:min-w-[60px] md:min-h-[60px] text-center"
            />
          )}
        />
        {errors.otp && (
          <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-red-500">
            {errors.otp.message}
          </p>
        )}

        <LoadingButton
          className="block w-full"
          type="submit"
          isLoading={resendEmailMutation.isPending}
        >
          Countinue
        </LoadingButton>
      </form>
      <div className="flex justify-end gap-2">
        <p>Did&apos;t receive OTP?</p>
        {isResentInCounting ? (
          <p className="text-red-500 text-right">
            Resent OTP in{" "}
            <CountDown
              onCountDownComplete={() => setIsResentInCounting(false)}
            />
          </p>
        ) : (
          <p
            className=" text-red-500 text-right cursor-pointer"
            onClick={() => {
              resendEmailMutation.mutate();
            }}
          >
            Resend Otp
          </p>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
