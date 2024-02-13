"use client";
import CustomTextArea from "@/components/common/CustomTextArea";
import { InputField } from "@/components/common/InputField";
import LoadingButton from "@/components/common/LoadingButton";
import categoryValidation from "@/lib/formvalidation/organizer/categoryValidation";
import { EventCategoryFormData } from "@/types/organizer/eventCategoryType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { CreateEventCategoryApi } from "@/services/organizer/eventCategory.service";
import { useToast } from "@/components/ui/use-toast";
import { AxiosError } from 'axios';
import { showError } from "@/utils/helper";

interface CategoryData {
    id: string;
    category_name: string;
    description: string;
}

interface CreateProps {
    action: "create"
}

interface UpdateProps {
    action: "update",
    category: CategoryData
}

type props = CreateProps | UpdateProps;

const CategoryModal = (props: props) => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm<EventCategoryFormData>({
        resolver: zodResolver(categoryValidation),
        ...(props.action === "update" ? { defaultValues: { ...props.category } } : {})
    });

    const { toast } = useToast();

    const createEvent = useMutation({
        mutationFn: (data: EventCategoryFormData) => {
            return CreateEventCategoryApi(data);
        },

        onSuccess: (data) => {
            if (data.status === 200 || data.status === 201) {
                toast({
                    description: "Category Created Sucessfully",
                    duration: 1000,
                    variant: "default",
                    className: "bg-green-600 text-white font-bold",
                })
                reset();
            }
        },

        onError: (error: AxiosError<any, any>) => {
            toast({
                description: showError(error),
                duration: 1000,
                variant: "destructive"
            })
        },
    })

    const handleForm = handleSubmit((data) => {
        if (props.action === "create") {
            createEvent.mutate(data);
        }
    })

    return (
        <form className="space-y-3" onSubmit={handleForm}>
            <InputField label="Name" errorMessage={errors.category_name?.message} {...register("category_name")} />
            <CustomTextArea
                label="Description"
                errorMessage={errors.description?.message}
                {...register("description")}
            />
            <LoadingButton type="submit" isLoading={createEvent.isPending}>Submit</LoadingButton>
        </form>
    )
}

export default CategoryModal