"use client";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
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
  const pathname = usePathname();

  // useEffect(() => {
  //   if (!auth.isUserLogin) {
  //     toast.error("Please login first");
  //     router.push("/");
  //   }
  // }, [auth]);

  return (
    <main className="max-width flex flex-col gap-5 mt-3 ">
      <div className="border border-gray-300 rounded-lg pl-4 pt-4 pr-4 pb-1">
        <div className="flex items-center gap-3 ">
          {/* profile picture */}
          <div className="w-[100px] h-[100px] rounded-[50%] relative border-2 border-gray-600">
            <Image
              src={"/dong.png"}
              alt="avatar"
              width={120}
              height={120}
              className="object-cover rounded-[50%]"
            />
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
