import {
  MediaType,
  useRegisterUserMutation,
  UserRole,
  useUploadMediaMutation,
} from "@/__generated__/graphql";
import { OtpType } from "@/constants/enum";
import useCustomToast from "@/hooks/useToast";
import organizerRegisterValidation from "@/lib/formvalidation/organizer/organizerRegister";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import DragAndDropPdf from "../common/DragAndDropPdf";
import {
  InputField,
  InputFieldWithRightIcon,
  PhoneNumberInputField,
} from "../common/InputField";
import LoadingButton from "../common/LoadingButton";
import { Checkbox } from "../ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { showError } from "@/utils/helper";
type formData = z.infer<typeof organizerRegisterValidation>;

interface props {
  className?: string;
}

const RegisterOrganizer: FC<props> = ({ className }: props) => {
  /********************** state *********************************/
  const [isPasswordShow, setPasswordShow] = useState(false);
  const [isConfirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const [countryCode, setCountryCode] = useState<string>("");
  const [mediaIds, setMediaIds] = useState<string[]>([]);

  /******************* Hooks *******************/
  const toast = useCustomToast();

  const router = useRouter();

  /*************** Methods ***************************/
  const getCountryCode = (code: string) => {
    setCountryCode(code);
  };

  /** Form handling using react-hook-form ****************/
  const form = useForm<formData>({
    resolver: zodResolver(organizerRegisterValidation),
  });

  const handleFileChange = (files: File[]) => {
    form.setValue("document", files);
  };

  //mutation for file upload
  const [
    fileMutation,
    { loading: fileuploadLoading, data: fileData, error: fileErrors },
  ] = useUploadMediaMutation({
    onCompleted(data) {
      if (data.uploadMedia) {
        setMediaIds((prev) => {
          if (prev) {
            return [...prev, data.uploadMedia.id];
          } else {
            return [data.uploadMedia.id];
          }
        });
      }
    },
  });

  //mutation using generated registeruser mutation
  const [mutation, { loading, error, data }] = useRegisterUserMutation({
    onCompleted(data) {
      toast.sucess(data.registerUser.message);
      router.push(
        `/otp?email=${form.getValues("email")}&action=${OtpType.NewRegister}`
      );
    },
  });
  const formSubmit: SubmitHandler<formData> = async (e) => {
    const { document, confirmPassword, phone, ...restInput } = e;

    //upload all file
    for (let file of document) {
      if (!fileErrors) {
        //handle media upload
        await fileMutation({
          variables: {
            mediaType: MediaType.OrganizerDocument,
            file: file,
          },
        }).catch((error: any) => {
          toast.error(showError(error));
        });
      } else {
        break;
      }
    }

    if (fileData?.uploadMedia) {
      //register user
      mutation({
        variables: {
          data: {
            ...restInput,
            role: UserRole.Organizer,
            phone: countryCode + phone,
            documents: mediaIds.map((doc) => {
              return { id: doc };
            }),
          },
        },
      }).catch((error: any) => {
        toast.error(showError(error));
      });
    }
  };

  return (
    <Form {...form}>
      <form
        className={cn(`flex flex-col gap-2 ${className}`)}
        onSubmit={form.handleSubmit(formSubmit)}
      >
        <FormField
          name="fullName"
          control={form.control}
          render={({ field }) => {
            return (
              <InputField
                type="text"
                label="Full Name"
                formReturn={form.register("fullName")}
                {...field}
                errorMessage={form.formState.errors.fullName?.message}
              />
            );
          }}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            return (
              <InputField
                type="email"
                label="Email"
                errorMessage={form.formState.errors.email?.message}
                {...field}
              />
            );
          }}
        />

        <PhoneNumberInputField
          label="Phone number"
          formReturn={form.register("phone")}
          errorMessage={form.formState.errors.phone?.message}
          getCountryCode={getCountryCode}
        />

        <InputField
          label="Organizer name"
          {...form.register("organizerName")}
          errorMessage={form.formState.errors.organizerName?.message}
        />

        <InputField
          label="Address"
          {...form.register("address")}
          errorMessage={form.formState.errors.organizerName?.message}
        />

        <FormField
          control={form.control}
          name="isGstRegister"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Gst register</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <InputField
          label="ABN ACN number"
          {...form.register("abnAcn")}
          errorMessage={form.formState.errors.abnAcn?.message}
        />

        <p>Documents</p>
        <DragAndDropPdf
          onChange={handleFileChange}
          errorMessage={form.formState.errors.document?.message?.toString()}
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
          {...form.register("password")}
          errorMessage={form.formState.errors.password?.message}
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
          {...form.register("confirmPassword")}
          errorMessage={form.formState.errors.confirmPassword?.message}
          onRightIconClicked={() => {
            setConfirmPasswordShow(!isConfirmPasswordShow);
          }}
        />

        <LoadingButton isLoading={loading || fileuploadLoading}>
          Register
        </LoadingButton>
      </form>
    </Form>
  );
};

export default RegisterOrganizer;
