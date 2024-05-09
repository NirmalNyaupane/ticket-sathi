"use client";
import {
  CreateEventMutationVariables,
  EventType,
  MediaType,
  useCreateEventMutation,
  useGetMyCategoryQuery,
  useUploadMediaMutation,
} from "@/__generated__/graphql";
import CustomTextArea from "@/components/common/CustomTextArea";
import DatePicker from "@/components/common/DatePicker";
import DragAndDropImage from "@/components/common/DragAndDropImage";
import { InputField } from "@/components/common/InputField";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCustomToast from "@/hooks/useToast";
import createEventValidation from "@/lib/formvalidation/event/createEvent.validation";
import { showError } from "@/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DragDropMultipleImages from "../common/DragAndDropMultipleImage";
import LoadingButton from "../common/LoadingButton";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";

type FormData = z.infer<typeof createEventValidation>;

type Props = {} & (
  | {
      action: "create";
    }
  | {
      action: "update";
      data: CreateEventMutationVariables["data"];
    }
);

const EventCeateUpdate: React.FC<Props> = (props: Props) => {
  const [imageIds, setImageIds] = useState<string[]>([]);

  const toast = useCustomToast();
  const form = useForm<FormData>({
    resolver: zodResolver(createEventValidation),
  });
  //get categories
  const {
    data: categories,
    error,
    fetchMore,
  } = useGetMyCategoryQuery({
    variables: {
      query: {
        page: 1,
        pageLimit: 10,
      },
    },
  });

  const [mediaMutation, { loading: mediaLoading, error: mediaError }] =
    useUploadMediaMutation();

  const [eventMutation, { loading: eventLoading, error: eventError }] =
    useCreateEventMutation({
      onCompleted() {
        toast.sucess("Event is created");
        form.reset();
        setImageIds([]);
      },
    });
  const formSubmit = form.handleSubmit(async (data) => {
    const { cover, images, ...restData } = data;
    //first upload a cover picture
    const coverResponse = await mediaMutation({
      variables: {
        mediaType: MediaType.EventCover,
        file: cover,
      },
    }).catch((error) => {
      toast.error(showError(error));
    });

    const imagesResponse = await Promise.all(
      images?.map((image: File) => {
        return mediaMutation({
          variables: {
            mediaType: MediaType.EventImage,
            file: image,
          },
        });
      })
    ).catch((error) => {
      toast.error(showError(error));
    });

    const imagesIds = imagesResponse?.map(
      (image) => image.data?.uploadMedia.id
    ) as string[];

    if (coverResponse && imagesIds) {
      await eventMutation({
        variables: {
          data: {
            ...restData,
            ...(imageIds && imagesIds?.length > 0 ? { images: imagesIds } : {}),
            cover: coverResponse.data?.uploadMedia.id!,
          },
        },
      }).catch((error) => {
        toast.error(showError(error));
      });
    }
  });

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Form {...form}>
        <form
          className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 my-2"
          onSubmit={formSubmit}
        >
          <div className="grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Event Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <InputField
                        type="text"
                        label="Name"
                        errorMessage={form.formState.errors.name?.message}
                        {...form.register("name")}
                      />
                      <CustomTextArea
                        label="Description"
                        {...form.register("description")}
                        errorMessage={
                          form.formState.errors.description?.message
                        }
                      />
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="type"
                          render={({ field }) => {
                            return (
                              <FormItem>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormLabel htmlFor="status">
                                    Event Type
                                  </FormLabel>
                                  <FormControl>
                                    <SelectTrigger
                                      id="status"
                                      aria-label="Select status"
                                    >
                                      <SelectValue placeholder="Select types" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {Object.values(EventType).map((type) => {
                                      return (
                                        <SelectItem value={type} key={type}>
                                          {type}
                                        </SelectItem>
                                      );
                                    })}
                                  </SelectContent>
                                </Select>
                              </FormItem>
                            );
                          }}
                        />
                        {form.formState.errors.type?.message && (
                          <p className=" text-[0.875rem] mt-2 font-medium text-red-500">
                            {form.formState.errors.type?.message}
                          </p>
                        )}
                      </div>
                      <InputField
                        type="text"
                        label="Venue"
                        {...form.register("venue")}
                        errorMessage={form.formState.errors.venue?.message}
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-07-chunk-1">
                  <CardHeader>
                    <CardTitle>Images</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="images"
                      render={({ field }) => {
                        return (
                          <DragDropMultipleImages
                            onChange={field.onChange}
                            errorMessage={
                              form.formState.errors.images?.message as string
                            }
                          />
                        );
                      }}
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle>Event Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="categoryId"
                          render={({ field }) => {
                            return (
                              <FormItem>
                                <FormLabel htmlFor="status">Category</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger
                                    id="status"
                                    aria-label="Select status"
                                  >
                                    <SelectValue placeholder="Select categories" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {categories?.getMyCategory.data.map(
                                      (category) => {
                                        return (
                                          <SelectItem
                                            value={category.id}
                                            key={category.id}
                                          >
                                            {category.name}
                                          </SelectItem>
                                        );
                                      }
                                    )}
                                  </SelectContent>
                                </Select>
                              </FormItem>
                            );
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card
                  className="overflow-hidden"
                  x-chunk="dashboard-07-chunk-4"
                >
                  <CardHeader>
                    <CardTitle>Cover Images</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="cover"
                      render={({ field }) => {
                        return (
                          <DragAndDropImage
                            // onChange={(value) => {
                            //   form.setValue("cover", value);
                            // }}
                            onChange={field.onChange}
                            errorMessage={
                              form.formState.errors.cover?.message as string
                            }
                          />
                        );
                      }}
                    />
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-07-chunk-5">
                  <CardHeader>
                    <CardTitle>Event Date</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <FormField
                        control={form.control}
                        name="eventStartDate"
                        render={({ field }) => {
                          return (
                            <DatePicker
                              placeholder="Event start date"
                              label="Event start date"
                              disablePastDate={true}
                              className="block"
                              withTime
                              onValueChange={field.onChange}
                              errorMessage={
                                form.formState.errors.eventStartDate?.message
                              }
                            />
                          );
                        }}
                      />
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name="eventEndDate"
                        render={({ field }) => {
                          return (
                            <DatePicker
                              placeholder="Event end date"
                              label="Event end date"
                              disablePastDate={true}
                              withTime
                              onValueChange={field.onChange}
                              errorMessage={
                                form.formState.errors.eventEndDate?.message
                              }
                            />
                          );
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          <LoadingButton
            isLoading={mediaLoading || eventLoading}
            clasName="w-fit"
          >
            Create Event
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
};

export default memo(EventCeateUpdate);
