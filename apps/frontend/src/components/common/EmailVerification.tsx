"use client";
import { useVerifyOtpMutation } from "@/__generated__/graphql";
import { OtpType } from "@/constants/enum";
import useCustomToast from "@/hooks/useToast";
import { otpValidation } from "@/lib/formvalidation/authvalidation";
import CountDown from "@/utils/CountDown";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import OtpInput from "react-otp-input";
import { z } from "zod";
import { InputField } from "./InputField";
import LoadingButton from "./LoadingButton";
import { showError } from "@/utils/helper";

type otptype = z.infer<typeof otpValidation>;

const EmailVerification = ({
  email,
  purpose,
}: {
  email: string;
  purpose: OtpType;
}) => {
  /***************** State ********************************/
  const [otp, setOtp] = useState("");
  const [isResentInCounting, setIsResentInCounting] = useState(true);

  /** Hooks */
  const toast = useCustomToast();
  const router = useRouter();

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
  const [newRegister, { loading }] = useVerifyOtpMutation({
    onCompleted(data, clientOptions) {
      toast.sucess("Email is verified, now you can login");
      router.push("/");
    },
  })



  //hadle api call after countinue botton is called based on the purpose
  const handleCountinue = handleSubmit((data) => {
    if (purpose === OtpType.NewRegister) {
      newRegister({
        variables: {
          data: {
            email,
            otp
          }
        }
      }).catch((e) => {
        toast.error(showError(e))
      });
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
          numInputs={6}
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
          isLoading={loading}
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
          // onClick={() => {
          //   resendEmailMutation.mutate();
          // }}
          >
            Resend Otp
          </p>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
