"use client";
import {
  useCreateUpdateCommissionMutation,
  useGetCommissionQuery,
} from "@/__generated__/graphql";
import { InputField } from "@/components/common/InputField";
import LoadingButton from "@/components/common/LoadingButton";
import useCustomToast from "@/hooks/useToast";
import { createCommissionValidator } from "@/lib/formvalidation/admin/adminValidator";
import { showError } from "@/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type formData = z.infer<typeof createCommissionValidator>;
const CreateCommission = () => {
  const { data, loading } = useGetCommissionQuery();
  const [mutate, { loading: createLoading }] =
    useCreateUpdateCommissionMutation({
      onCompleted() {
        toast.sucess("commission update sucessfully");
      },
    });
  const toast = useCustomToast();
  const form = useForm<formData>({
    resolver: zodResolver(createCommissionValidator),
    mode: "onChange",
    defaultValues: {
      commission: data?.getCommission[0]?.commission ?? 0,
    },
  });

  const handleFormSubmit = form.handleSubmit((data) => {
    mutate({
      variables: {
        data: {
          commission: Number(data.commission),
        },
      },
    }).catch((error) => {
      toast.error(showError(error));
    });
  });

  if (loading) {
    return <p>loading...</p>;
  }
  return (
    <form className="md:w-[50%] lg:w-[30%] space-y-8" onSubmit={handleFormSubmit}>
      <InputField
        min={0}
        placeholder="commission"
        type="number"
        onKeyDown={(key) => {
          if (key.key === "-") {
            key.preventDefault();
          }
        }}
        errorMessage={form.formState.errors.commission?.message}
        {...form.register("commission")}
      />
      <LoadingButton
        type="submit"
        isLoading={createLoading}
      >
        Submit
      </LoadingButton>
    </form>
  );
};

export default CreateCommission;
