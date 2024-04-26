"use client";
import { useCreateCategoryMutation } from "@/__generated__/graphql";
import CustomTextArea from "@/components/common/CustomTextArea";
import { InputField } from "@/components/common/InputField";
import LoadingButton from "@/components/common/LoadingButton";
import useCustomToast from "@/hooks/useToast";
import categoryValidation from "@/lib/formvalidation/organizer/categoryValidation";
import { EventCategoryFormData } from "@/types/organizer/eventCategoryType";
import { showError } from "@/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface CategoryData {
  id: string;
  name: string;
  description: string;
}

interface CreateProps {
  action: "create";
}

interface UpdateProps {
  action: "update";
  category: CategoryData;
}

type props = CreateProps | UpdateProps;

const CategoryModal = (props: props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<EventCategoryFormData>({
    resolver: zodResolver(categoryValidation),
    ...(props.action === "update"
      ? { defaultValues: { ...props.category } }
      : {}),
  });

  const toast = useCustomToast();

  const [mutate, { loading }] = useCreateCategoryMutation({
    onCompleted() {
      toast.sucess("Category created sucessfully");
      reset()
    },
  });

  const handleForm = handleSubmit((data) => {
    if (props.action === "create") {
      mutate({
        variables: {
          data,
        },
      }).catch((error) => {
        toast.error(showError(error));
      });
    }
  });

  return (
    <form className="space-y-3" onSubmit={handleForm}>
      <InputField
        label="Name"
        errorMessage={errors.name?.message}
        {...register("name")}
      />
      <CustomTextArea
        label="Description"
        errorMessage={errors.description?.message}
        {...register("description")}
      />
      <LoadingButton type="submit" isLoading={loading}>
        Submit
      </LoadingButton>
    </form>
  );
};

export default CategoryModal;
