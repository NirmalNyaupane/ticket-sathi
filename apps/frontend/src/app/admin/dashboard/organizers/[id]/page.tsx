"use client";
import { useGetSingleOrganizerDetailsQuery } from "@/__generated__/graphql";
import ConditionallyRender from "@/components/common/ConditionallyRender";
import DashboardTopContent from "@/components/organizer/dashboard/DashboardTopContent";
import { AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-separator";
import { format } from "date-fns";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { GetSingleOrganizerDetailsDocument } from "../../../../../__generated__/graphql";

const SpecficOrganizerPage = () => {
  const params = useParams();
  const { data, loading } = useGetSingleOrganizerDetailsQuery({
    variables: {
      getSingleOrganizerDetailsId: params.id as string,
    },
  });

  if (loading) {
    return <p>Loading.....</p>;
  }
  return (
    <div className="space-y-3">
      <DashboardTopContent
        text={data?.getSingleOrganizerDetails?.organizerDetails?.organizerName}
      />
      <Card>
        <CardHeader>
          <CardTitle>User Details</CardTitle>
          <Separator />
        </CardHeader>
        <CardContent className="overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-12 gap-2">
            <div className="sm:col-span-6 md:col-span-5">
              <h2 className="font-semibold">Name</h2>
              <p className="text-justify text-gray-600">
                {data?.getSingleOrganizerDetails?.fullName}
              </p>
            </div>

            <div className="md:col-span-6">
              <h2 className="font-semibold">Email</h2>
              <p className="text-justify text-gray-600">
                {data?.getSingleOrganizerDetails?.email}
              </p>
            </div>

            <div className="md:col-start-1 sm:col-span-6 md:col-span-5">
              <h2 className="font-semibold">Address</h2>
              <p className="text-justify text-gray-600">
                {data?.getSingleOrganizerDetails?.address}
              </p>
            </div>

            <div className="sm:col-span-6 md:col-span-6">
              <h2 className="font-semibold">Phone</h2>
              <p className="text-justify text-gray-600">
                {data?.getSingleOrganizerDetails.phone}
              </p>
            </div>

            <div className="sm:col-start-1 sm:col-span-10 md:col-end-11 col-span-2">
              <h2 className="font-semibold">Profile</h2>
              <p className="text-justify text-gray-600">
                <Avatar>
                  <AvatarImage
                    src={data?.getSingleOrganizerDetails?.profile?.name ?? ""}
                    alt="organizerprofiee"
                    height={200}
                    width={200}
                  />
                  <AvatarFallback>
                    {data?.getSingleOrganizerDetails?.fullName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Organizer Details</CardTitle>
          <Separator />
        </CardHeader>
        <CardContent className="overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-12 gap-2">
            <div className="sm:col-span-6 md:col-span-5">
              <h2 className="font-semibold">Organizer Name</h2>
              <p className="text-justify text-gray-600">
                {
                  data?.getSingleOrganizerDetails?.organizerDetails
                    ?.organizerName
                }
              </p>
            </div>

            <div className="md:col-span-6">
              <h2 className="font-semibold">Address</h2>
              <p className="text-justify text-gray-600">
                {data?.getSingleOrganizerDetails?.organizerDetails?.address}
              </p>
            </div>

            <div className="md:col-start-1 sm:col-span-6 md:col-span-5">
              <h2 className="font-semibold">Status</h2>
              <p className="text-justify text-gray-600">
                {data?.getSingleOrganizerDetails?.organizerDetails?.status}
              </p>
            </div>

            <div className="sm:col-span-6 md:col-span-6">
              <h2 className="font-semibold">ABN ACN</h2>
              <p className="text-justify text-gray-600">
                {data?.getSingleOrganizerDetails?.organizerDetails
                  ?.isGstRegister &&
                  data?.getSingleOrganizerDetails?.organizerDetails?.abnAcn}
              </p>
            </div>

            <ConditionallyRender
              condition={
                data?.getSingleOrganizerDetails.organizerDetails?.website
                  ? true
                  : false
              }
              show={
                <div className="sm:col-span-6 md:col-span-6">
                  <h2 className="font-semibold">Website</h2>
                  <p className="text-justify text-gray-600">
                    {data?.getSingleOrganizerDetails?.organizerDetails
                      ?.website &&
                      data?.getSingleOrganizerDetails?.organizerDetails
                        ?.website}
                  </p>
                </div>
              }
            />

            <ConditionallyRender
              condition={
                data?.getSingleOrganizerDetails?.organizerDetails?.bio
                  ? true
                  : false
              }
              show={
                <div className="sm:col-start-1 sm:col-span-10 md:col-end-11 col-span-2">
                  <h2 className="font-semibold">Bio</h2>
                  <p className="text-justify text-gray-600">
                    {data?.getSingleOrganizerDetails?.organizerDetails?.bio}
                  </p>
                </div>
              }
            />
          </div>

          <ConditionallyRender
            condition={
              data?.getSingleOrganizerDetails?.organizerDetails?.socialLinks
                ? true
                : false
            }
            show={
              <div className="sm:col-span-6 md:col-span-6">
                <h2 className="font-semibold">Social links</h2>
                <p className="text-justify text-gray-600">
                  {data?.getSingleOrganizerDetails?.organizerDetails
                    ?.socialLinks?.facebook && (
                    <div>
                      <Link
                        href={
                          data?.getSingleOrganizerDetails?.organizerDetails
                            ?.socialLinks?.facebook
                        }
                      >
                        Facebook
                      </Link>
                    </div>
                  )}
                  {data?.getSingleOrganizerDetails?.organizerDetails
                    ?.socialLinks?.instagram && (
                    <div>
                      <Link
                        href={
                          data?.getSingleOrganizerDetails?.organizerDetails
                            ?.socialLinks?.instagram
                        }
                      >
                        Facebook
                      </Link>
                    </div>
                  )}
                  {data?.getSingleOrganizerDetails?.organizerDetails
                    ?.socialLinks?.threads && (
                    <div>
                      <Link
                        href={
                          data?.getSingleOrganizerDetails?.organizerDetails
                            ?.socialLinks?.threads
                        }
                      >
                        Facebook
                      </Link>
                    </div>
                  )}
                  {data?.getSingleOrganizerDetails?.organizerDetails
                    ?.socialLinks?.twitter && (
                    <div>
                      <Link
                        href={
                          data?.getSingleOrganizerDetails?.organizerDetails
                            ?.socialLinks?.twitter
                        }
                      >
                        Facebook
                      </Link>
                    </div>
                  )}
                </p>
              </div>
            }
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Organizer Documents</CardTitle>
          <Separator />
        </CardHeader>
        <CardContent className="overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-12 gap-2">
            <div className="sm:col-span-6 md:col-span-5">
              <h2 className="font-semibold">Logo</h2>
              <Avatar>
                <AvatarImage
                  src={
                    data?.getSingleOrganizerDetails.organizerDocuments?.logo
                      ?.name
                  }
                  alt="organizerprofiee"
                  height={200}
                  width={200}
                />
                <AvatarFallback>
                  {data?.getSingleOrganizerDetails?.fullName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-12 gap-2">
            <div className="sm:col-span-6 md:col-span-5">
              <h2 className="font-semibold">Organizer Documents</h2>
              <p className="text-justify text-gray-600">
                {data?.getSingleOrganizerDetails.organizerDocuments?.documents?.map(
                  (doc) => {
                    return (
                      <div key={doc.name}>
                        <Link href={doc.name}>{doc.name}</Link>
                      </div>
                    );
                  }
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpecficOrganizerPage;
