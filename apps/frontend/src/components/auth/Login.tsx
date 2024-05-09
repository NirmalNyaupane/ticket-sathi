"use client";
import { useLoginMutation, UserRole } from "@/__generated__/graphql";
import { OtpType } from "@/constants/enum";
import useCustomToast from "@/hooks/useToast";
import { loginFormValidation } from "@/lib/formvalidation/authvalidation";
import { loginReducer } from "@/redux/slices/auth.slice";
import { showError } from "@/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
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
import Link from "next/link";
import ConditionallyRender from "../common/ConditionallyRender";

type formData = z.infer<typeof loginFormValidation>;

const Login = ({ user }: { user: UserRole }) => {
  /******************* state **************************/
  const [isPasswordShow, setPasswordShow] = useState(false);
  const [keepMeLoggedIn, setKeepMeLoggedIn] = useState<boolean>(false);

  /********************** Hooks  *******************************/
  const router = useRouter();
  const toast = useCustomToast();
  /************************ Methods *************************/
  const dispatch = useDispatch();
  /******* React hook form for form handling *****************/
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm<formData>({
    resolver: zodResolver(loginFormValidation), //zod validaton
  });

  /******************** React query mutation  ****************/
  const [loginMutation, { loading }] = useLoginMutation({
    onCompleted: (data) => {
      const jwt = data.login.accessToken;

      if (!jwt) {
        toast.error("Something went wrong");
        return null;
      }

      reset();
      toast.sucess("Login sucessfully");
      dispatch(
        loginReducer({
          accessToken: data.login.accessToken,
          role: data.login.role,
          isVerified: data.login.isVerified,
          id: data.login.id,
          isUserLogin: true,
        })
      );
    },
  });

  /*** Handle the form after submission ***/
  const handleFormSubmit = handleSubmit((data) => {
    loginMutation({
      variables: {
        data,
      },
    }).catch((e) => {
      toast.error(showError(e));
      if (e.networkError.statusCode === 401) {
        router.push(
          `/otp/?email=${getValues("email")}&action=${OtpType.NewRegister}`
        );
      }
    });
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
        <div className="ml-auto font-medium text-red-500">
          <Link href={"/forgot-password"}>Forget Password?</Link>
        </div>
      </div>

      <LoadingButton type="submit" isLoading={loading}>
        Login
      </LoadingButton>

      <ConditionallyRender
        condition={user === UserRole.User}
        show={
          <>
            <p className="leading-7 [&:not(:first-child)]:mt-6 text-center">
              OR SIGN UP USING
            </p>
            <div className="text-center my-3">
              <Button
                className="bg-white text-black border-black border-2 hover:text-white"
                type="button"
              >
                <FaGoogle />
              </Button>
            </div>
          </>
        }
      />
    </form>
  );
};

export default Login;
