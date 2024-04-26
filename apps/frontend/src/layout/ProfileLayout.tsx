"use client";
import {
  MediaType,
  useUpdateProfilePicMutation,
  useUpdateUserMutation,
  useUploadMediaMutation,
} from "@/__generated__/graphql";
import DragAndDropImage from "@/components/common/DragAndDropImage";
import useCustomToast from "@/hooks/useToast";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaCheck, FaCross } from "react-icons/fa";
import { IoCloseSharp, IoCheckmark } from "react-icons/io5";
import { useSelector } from "react-redux";

const links = [
  {
    name: "My account",
    url: "/user/my-account",
  },
  {
    name: "Change Password",
    url: "/user/change-password",
  },
];

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const auth = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.user);
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const [avatarLink, setAvatarLink] = useState("");
  const pathname = usePathname();

  const toast = useCustomToast();

  const [userMutate, { loading: userLoading }] = useUpdateProfilePicMutation({
    onCompleted(data, clientOptions) {
      toast.sucess("Update user sucessfully");
      setAvatarImage(null);
    },
  });

  const [mutate, { loading, error, data }] = useUploadMediaMutation({
    onCompleted(data, clientOptions) {
      userMutate({
        variables: {
          data: {
            mediaId: data.uploadMedia.id!,
          },
        },
      });
    },
  });

  return (
    <main className="max-width flex flex-col gap-5 mt-3">
      <div className="rounded-lg pl-4 pt-4 pr-4 pb-1 bg-white">
        <div className="flex items-center gap-3 ">
          
          {/* profile picture */}
          <div className="w-[100px] h-[100px] rounded-[50%] relative border-2 ">
            <DragAndDropImage
              onChange={(e) => setAvatarImage(e!)}
              className="rounded-[50%]"
              imageUrl="/upload.png"
            />
            {avatarImage && (
              <div
                className="bg-gray-800 text-white flex justify-center 
            items-center text-w h-[30px] w-[30px] rounded-full absolute right-0 bottom-0 cursor-pointer"
                onClick={() => {
                  mutate({
                    variables: {
                      mediaType: MediaType.UserProfile,
                      file: avatarImage,
                    },
                  });
                }}
              >
                <IoCheckmark />
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold">{user?.fullName}</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        {/* nav items */}
        <div className="flex gap-3 mt-4">
          {links.map((items, index) => {
            return (
              <div key={items.url}>
                <Link
                  href={items.url}
                  className={cn(
                    "font-semibold",
                    `${
                      pathname == items.url
                        ? "underline underline-offset-4"
                        : ""
                    }`
                  )}
                >
                  {items.name}
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div>{children}</div>
    </main>
  );
};

export default ProfileLayout;
