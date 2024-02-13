"use client";
import organizerRegisterFormValidation from "@/lib/formvalidation/organizerRegister";
import { cn } from "@/lib/utils";
import { registerOrganizerApi } from "@/services/organizer.service";
import { OrganizerRegisterFormData } from "@/types/auth/AuthType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import CustomTextArea from "../common/CustomTextArea";
import DragAndDropImage from "../common/DragAndDropImage";
import { InputField } from "../common/InputField";
import LoadingButton from "../common/LoadingButton";
import SocialMedia from "../common/SocialMedia";
import { FormField } from "../ui/form";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";
import { showError } from "@/utils/helper";
import { AxiosError } from 'axios';
import { Dispatch, SetStateAction } from "react";

interface props {
  className?: string;
  setNextPage:Dispatch<SetStateAction<number>>;
}

const RegisterOrganizer = ({ className, setNextPage}: props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control
  } = useForm<OrganizerRegisterFormData>({
    resolver: zodResolver(organizerRegisterFormValidation),
    defaultValues: {
      social_links: [{ name: "", url: "" }]
    }
  });

  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: OrganizerRegisterFormData) => {
      return registerOrganizerApi(data);
    },
    onSuccess: () => {
      toast({
        variant: "default",
        className: "bg-green-600 text-white font-bold",
        description: "Organizer registered sucessfully",
        duration: 1000,
      });
      setNextPage(3);
    },
    onError(error: AxiosError<any, any>) {
      toast({
        variant: "default",
        description: showError(error),
        duration: 1000
      })
    },
  })

  const formSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <form
      className={cn(`flex flex-col gap-2 ${className}`)}
      onSubmit={formSubmit}
    >
      <InputField
        type="text"
        label="Organizer Name"
        {...register("organizer_name")}
        errorMessage={errors.organizer_name?.message}
      />

      <InputField
        type="text"
        label="Address"
        {...register("address")}
        errorMessage={errors.address?.message}
      />

      <div className="space-y-1">
        <Label>Social Links</Label>
        <SocialMedia control={control} error={errors.social_links} />
      </div>

      <div className="space-y-1">
        <Label>Logo</Label>

        <FormField
          name="logo"
          control={control}
          render={({ field }) => {
            return (
              <DragAndDropImage
                className="h-[200px]"
                onChange={(e) => {
                  field.onChange(e);
                }}
                errorMessage={errors.logo?.message as string}
              />
            );
          }}
        />
      </div>

      <CustomTextArea
        label="Description"
        {...register("description")}
        errorMessage={errors.description?.message}
      />

      <InputField
        type="url"
        label="Website"
        {...register("website")}
        errorMessage={errors.website?.message}
      />
      <LoadingButton type="submit" isLoading={isPending}>
        Submit
      </LoadingButton>
    </form>
  );
};

export default RegisterOrganizer;
