"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import socialMedias from "@/constants/SocialMedia";
import loginFormValidation from "@/lib/formvalidation/organizerRegister";
import { Trash2 } from "lucide-react";
import { Control, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { FormField } from "../ui/form";
import { InputField } from "./InputField";
type formData = z.infer<typeof loginFormValidation>;

interface SocialLinks {
  name: string;
  url: string;
}

interface SocialMediaprops {
  error: any;
  control: Control<formData>;
  data?: SocialLinks[];
}

const SocialMedia = ({ error, control }: SocialMediaprops) => {
  const { fields, append, remove } = useFieldArray({
    name: "social_links",
    control: control,
  });

  console.log(control._getWatch("social_links").length);

  return (
    <div className="flex flex-col gap-2 border border-gray-300 p-4 rounded-lg">
      {fields.map((items, index) => {
        return (
          <div
            className="social-media flex flex-col md:flex-row gap-2 relative"
            key={items.id}
          >
            <FormField
              control={control}
              name={`social_links.${index}.name`}
              render={({ field }) => {
                return (
                  <div className="">
                    <Select onValueChange={(e) => field.onChange(e)}>
                      <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Select site" />
                      </SelectTrigger>
                      <SelectContent>
                        {socialMedias.map((socialMedia) => {
                          return (
                            <SelectItem
                              key={socialMedia.link}
                              value={socialMedia.name}
                            >
                              {socialMedia.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    {error?.[index]?.name && (
                      <p className=" text-[0.875rem] mt-1 font-medium text-red-500">
                        {error?.[index]?.name?.message}
                      </p>
                    )}
                  </div>
                );
              }}
            />

            <FormField
              name={`social_links.${index}.url`}
              control={control}
              render={({ field }) => {
                return (
                  <InputField
                    placeholder="eg. www.social-site.com"
                    errorMessage={error?.[index]?.url?.message}
                    {...field}
                  />
                );
              }}
            />

            <div className="flex justify-end items-center text-gray-500">
              <Trash2
                className="cursor-pointer text-right"
                onClick={() => {
                  if (control._getWatch("social_links").length === 1)
                    return null;
                  remove(index);
                }}
              />
            </div>
          </div>
        );
      })}

      {error && !Array.isArray(error) && (
        <p className=" text-[0.875rem] mt-2 font-medium text-red-500">
          {error.message}
        </p>
      )}
      <Button
        className="text-sm text-red-500 cursor-pointer font-semibold w-fit bg-white px-0 hover:bg-white"
        onClick={() => {
          append({ name: "", url: "" });
        }}
      >
        + Add social link
      </Button>
    </div>
  );
};

export default SocialMedia;
