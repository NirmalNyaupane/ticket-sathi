"use client";
import {
  EventStatus,
  GetSingleEventQuery,
  useGetParticularEventForAdminQuery,
  useUpdateEventStatusByAdminMutation,
} from "@/__generated__/graphql";
import LoadingButton from "@/components/common/LoadingButton";
import DashboardTopContent from "@/components/organizer/dashboard/DashboardTopContent";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import useCustomToast from "@/hooks/useToast";
import { changeOrganzierStatusValidator } from "@/lib/formvalidation/admin/adminValidator";
import { cn } from "@/lib/utils";
import { showError } from "@/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { createContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
type MessageForm = z.infer<typeof changeOrganzierStatusValidator>;
const links = [
  {
    name: "Details",
    url: (id: string) => `/admin/dashboard/event/${id}/details`,
  },
  {
    name: "Tickets",
    url: (id: string) => `/admin/dashboard/event/${id}/tickets`,
  },
];

export const AdminEventContext = createContext<{
  event: GetSingleEventQuery["getSingleEvent"] | undefined;
  action: "EDIT" | "VIEW";
  setAction: React.Dispatch<React.SetStateAction<"EDIT" | "VIEW">> | undefined;
}>({
  event: undefined,
  action: "EDIT",
  setAction: undefined,
});

const EventViewLayout = ({ children }: { children: React.ReactNode }) => {
  const [action, setAction] = useState<"EDIT" | "VIEW">("VIEW");
  const [openDialog, setOpenDialog] = useState(false);

  const params = useParams();
  const pathname = usePathname();

  const form = useForm<MessageForm>({
    resolver: zodResolver(changeOrganzierStatusValidator),
  });
  const { data, loading } = useGetParticularEventForAdminQuery({
    variables: {
      eventId: params.id! as string,
    },
  });

  const [eventStatus, changeEventStatus] = useState(
    data?.getParticularEventForAdmin.status
  );

  const [mutate, { loading: changeStatus }] =
    useUpdateEventStatusByAdminMutation({
      onCompleted(data, clientOptions) {
        toast.sucess("Change status successfully");
      },
    });
  const toast = useCustomToast();

  const handleMessageFormSubmit = form.handleSubmit((data) => {
    mutate({
      variables: {
        data: {
          eventId: params.id as string,
          status: EventStatus.Rejected,
          rejectedReason: data.message,
        },
      },
      onCompleted(data, clientOptions) {
        changeEventStatus(EventStatus.Rejected);
        toast.sucess("sucessfully updated");
      },
    }).catch((error) => {
      toast.error(showError(error));
    });
  });

  const handleChangeStatus = (status: EventStatus) => {
    if (status !== EventStatus.Rejected) {
      mutate({
        variables: {
          data: {
            status: status,
            eventId: params.id as string,
          },
        },
        onCompleted() {
          changeEventStatus(status);
        },
      }).catch((error) => {
        toast.error(showError(error));
      });
    } else {
      setOpenDialog(true);
    }
  };

  const getVariants = (
    status: EventStatus
  ):
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "pending"
    | "active" => {
    if (status === EventStatus.Approved) {
      return "active";
    } else if (status === EventStatus.Pending) {
      return "pending";
    } else {
      return "destructive";
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <h2 className="text-lg font-semibold leading-none tracking-tight">
            Reject Reason
          </h2>
          <form onSubmit={handleMessageFormSubmit}>
            <Textarea {...form.register("message")} />
            {form.formState.errors.message && (
              <p className="text-[0.875rem] mt-2 font-medium text-red-500">
                {form.formState.errors.message.message}
              </p>
            )}
            <LoadingButton type="submit" isLoading={changeStatus}>
              Loading
            </LoadingButton>
          </form>
        </DialogContent>
      </Dialog>
      <DashboardTopContent
        text={data?.getParticularEventForAdmin.name}
        section3={
          <div className="flex items-center">
            <Badge
              className={badgeVariants({
                variant: getVariants(
                  data?.getParticularEventForAdmin.status ??
                    EventStatus.Approved
                ),
              })}
            >
              {eventStatus ?? data?.getParticularEventForAdmin.status}
            </Badge>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Change status</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  {Object.values(EventStatus).map((status) => {
                    return (
                      <DropdownMenuItem
                        key={`ticket-${status}`}
                        onClick={() => handleChangeStatus(status)}
                      >
                        {status}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        }
      />
      <p className="text-gray-500">
        {data?.getParticularEventForAdmin.description}
      </p>

      <div className="flex text-md gap-3 font-bold mt-4">
        {links.map((link) => {
          return (
            <Link
              href={`${link.url(params.id as string)}`}
              key={link.name + "oierjer"}
              className={cn(
                "font-semibold",
                `${
                  pathname == link.url(params.id as string)
                    ? "underline underline-offset-4"
                    : ""
                }`
              )}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
      <Separator />
      <AdminEventContext.Provider
        value={{ event: data?.getParticularEventForAdmin, action, setAction }}
      >
        <div className="my-3">{children}</div>
      </AdminEventContext.Provider>
    </div>
  );
};

export default EventViewLayout;
