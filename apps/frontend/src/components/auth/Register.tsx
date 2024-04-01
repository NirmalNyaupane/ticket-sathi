import { useRegisterUserMutation } from "@/__generated__/graphql";
import { OtpType, UserRole } from "@/constants/enum";
import useCustomToast from "@/hooks/useToast";
import { registerValidation } from "@/lib/formvalidation/authvalidation";
import { cn } from "@/lib/utils";
import { showError } from "@/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, memo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { z } from "zod";
import DragAndDropPdf from "../common/DragAndDropPdf";
import {
  InputField,
  InputFieldWithRightIcon,
  PhoneNumberInputField,
} from "../common/InputField";
import LoadingButton from "../common/LoadingButton";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { FormField } from "../ui/form";
type formData = z.infer<typeof registerValidation>;

interface props {
  role: UserRole;
  className?: string;
}

const Register: FC<props> = ({ role, className }: props) => {
  /********************** state *********************************/
  const [isPasswordShow, setPasswordShow] = useState(false);
  const [isConfirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const [countryCode, setCountryCode] = useState<string>("");

  /******************* Hooks *******************/
  const customToast = useCustomToast();

  const router = useRouter();
  /*************** Methods ***************************/
  const getCountryCode = (code: string) => {
    setCountryCode(code);
  };

  /** Form handling using react-hook-form ****************/
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    control,
  } = useForm<formData>({
    resolver: zodResolver(registerValidation),
  });

  const handleFileChange = (files: File[]) => {
    console.log(files)
  }

  //mutation using generated registeruser mutation 
  const [mutation, { loading, error, data }] = useRegisterUserMutation({
    onCompleted(data, clientOptions) {
      customToast.sucess(data.registerUser.message);
      router.push(`/otp?email=${getValues("email")}&action=${OtpType.NewRegister}`)
    },
  });
  const formSubmit: SubmitHandler<formData> = async (e) => {
    const { confirmPassword, phone, ...data } = e;
    console.log(e.phone)
    mutation({
      variables: {
        data: {
          ...data,
          phone: countryCode + phone,
          //@ts-ignore
          role
        }
      }
    }).catch((e) => {
      customToast.error(showError(e))
    })

  };


  return (
    <>
      <form
        className={cn(`flex flex-col gap-2 ${className}`)}
        onSubmit={handleSubmit(formSubmit)}
      >
        <FormField
          name="fullName"
          control={control}
          render={({ field }) => {
            return (
              <InputField
                type="text"
                label="Full Name"
                formReturn={register("fullName")}
                {...field}
                errorMessage={errors.fullName?.message}
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
          formReturn={register("phone")}
          errorMessage={errors.phone?.message}
          getCountryCode={getCountryCode}
        />

        {/* only for organizer */}
        {
          role === UserRole.ORGANIZER && (
            <>
              <InputField label="Organizer name" />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={true}
                // onCheckedChange={() => setKeepMeLoggedIn(!keepMeLoggedIn)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed
             peer-disabled:opacity-70"
                >
                  Gst register
                </label>
              </div>
              <InputField label="ABN ACN number" />

              <p>documents</p>
              <DragAndDropPdf onChange={handleFileChange} />
            </>
          )
        }

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
        
        <LoadingButton isLoading={loading}>Register</LoadingButton>

        {role === UserRole.USER && (
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
