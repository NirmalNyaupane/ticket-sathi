"use client";
import { EmailVerificationEnum, UserRoleEnum } from "@/constants/enum";
import { loginFormValidation } from "@/lib/formvalidation/authvalidation";
import { loginReducer } from "@/redux/slices/auth.slice";
import { loginApi } from "@/services/auth.service";
import { showError } from "@/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { InputField, InputFieldWithRightIcon } from "../common/InputField";
import LoadingButton from "../common/LoadingButton";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { toast } from "../ui/use-toast";

type formData = z.infer<typeof loginFormValidation>;

const Login = ({ user }: { user: UserRoleEnum }) => {
  /******************* state **************************/
  const [isPasswordShow, setPasswordShow] = useState(false);
  const [keepMeLoggedIn, setKeepMeLoggedIn] = useState<boolean>(false);

  /********************** Hooks  *******************************/
  const router = useRouter();

  /************************ Methods *************************/
  const dispatch = useDispatch();
  /******* React hook form for form handling *****************/
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset
  } = useForm<formData>({
    resolver: zodResolver(loginFormValidation), //zod validaton
  });

  /******************** React query mutation  ****************/
  const loginMutation = useMutation({
    mutationFn: (data: formData) => {
      return loginApi(data);
    },
    onSuccess: (data) => {
      if (data.status === 200 || data.status === 201) {
        const jwt = data.data.access_token;

        if (!jwt) {
          toast({
            description: "Something went wrong",
            duration: 1000,
            variant: "destructive",
          });

          return null;
        }
        dispatch(loginReducer(data.data));
        reset();
      }
    },
    onError: (error: AxiosError<any, any>) => {
      toast({
        description: showError(error),
        duration: 1000,
        variant: "destructive",
      });

      if (error.response?.data?.is_verified === false) {
        router.push(
          `/email-verify?email=${getValues("email")}&action=${
            EmailVerificationEnum.NewRegister
          }`
        );
      }
    },
  });

  /*** Handle the form after submission ***/
  const handleFormSubmit = handleSubmit((data) => {
    loginMutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={handleFormSubmit}>
      <InputField
        type="email"
        label="Email"
        {...register("email")}
        errorMessage={errors.email?.message}
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
        onRightIconClicked={() => {
          setPasswordShow(!isPasswordShow);
        }}
        errorMessage={errors.password?.message}
        {...register("password")}
      />

      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={keepMeLoggedIn}
            onCheckedChange={() => setKeepMeLoggedIn(!keepMeLoggedIn)}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed
             peer-disabled:opacity-70"
          >
            Keep me logged in
          </label>
        </div>
        <div className="ml-auto font-medium text-red-500">Forget Password?</div>
      </div>

      <LoadingButton type="submit" isLoading={loginMutation.isPending}>
        Login
      </LoadingButton>

      {user === UserRoleEnum.USER && (
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
  );
};

export default Login;
