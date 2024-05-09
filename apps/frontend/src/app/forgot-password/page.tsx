"use client";
import { useForgotPasswordRequestMutation } from "@/__generated__/graphql";
import { InputField } from "@/components/common/InputField";
import LoadingButton from "@/components/common/LoadingButton";
import useCustomToast from "@/hooks/useToast";
import { emailValidation } from "@/lib/formvalidation/authvalidation";
import { showError } from "@/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
type EmailType = z.infer<typeof emailValidation>;

const ForgotPasswordPage = () => {
  const [mutation, { loading, data }] = useForgotPasswordRequestMutation({
    onCompleted(data, clientOptions) {
      toast.sucess(
        "Request sucessfully, please check your email for futher process"
      );
    },
  });

  const toast = useCustomToast();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<EmailType>({
    resolver: zodResolver(emailValidation),
  });

  const formSubmit = handleSubmit((data) => {
    // console.log(data.email)
    mutation({ variables: { data } }).catch((error) => {
      toast.error(showError(error));
    });
  });
  return (
    <>
      <div className="max-width flex justify-center flex-col items-center h-screen">
        <div className="w-[90%] md:w-[50%] lg:w-[40%] flex flex-col gap-10">
          <div className="w-fit">
            <Link href={"/"}>
              <Image
                src={"/logo.png"}
                width={100}
                height={50}
                alt="logo"
                className="rounded-md"
              />
            </Link>
          </div>

          <div className=" border border-gray-300 p-5 md:p-10 rounded-md space-y-4">
            <h2 className="text-xl font-bold text-center">Forgot Password</h2>
            <p>
              Please enter your email in the field below and check your email
              after clicking send link.
            </p>
            <form onSubmit={formSubmit} className="space-y-5">
              <InputField
                type="text"
                label="Email"
                {...register("email")}
                errorMessage={errors.email?.message}
              />
              <LoadingButton type="submit" isLoading={loading}>
                Send Link
              </LoadingButton>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
