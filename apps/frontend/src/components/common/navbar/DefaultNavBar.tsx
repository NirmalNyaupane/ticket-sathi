"use client";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { UserRole } from "@/constants/enum";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { firstCharacterOfFullName } from "@/utils/helper";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { CSSProperties, useState } from "react";
import { useSelector } from "react-redux";
import GlobalDialog from "../Dialog/GlobalDialog";
import GlobalDropDown from "../GlobalDropDownMenu";
type LinkItems = {
  label: string;
  url: string;
};

interface props {
  linkItems?: LinkItems[];
  className?: string;
  style?: CSSProperties;
}

const DefaultNavBar = ({ linkItems, className, style }: props) => {
  const [isFoucs, setFocus] = useState(false);
  const isLoggin = useSelector((state: RootState) => state.auth.isUserLogin!);
  const user = useSelector((state:RootState)=>state.user!);
  const path = usePathname()

  return (
    <header
      className={cn(`max-width bg-transparent py-2 ${className}`)}
      style={style}
    >
      <nav className="flex justify-between items-center relative w-[full]">
        {/* Logo section  */}
        <div className="flex items-center gap-4">
          <Link href={"/"}>
            <Image
              src={"/logo.png"}
              alt="logo"
              width={150}
              height={30}
              className="block rounded-md"
            ></Image>
          </Link>

          <div
            className={cn(`flex items-center rounded-2xl px-3 bg-slate-600 shadow-xl border-white border`, { "bg-white": isFoucs })}
          >
            <Search
              className={`mr-2 h-4 w-4 shrink-0 ${isFoucs ? "text-orange-400" : "text-white"
                }`}
            />
            <Input
              placeholder="search"
              className="flex w-full rounded-md bg-transparent text-sm outline-none border-none 
            focus:outline-none focus:border-none focus-visible:ring-0 placeholder:text-white"
              onFocus={() => setFocus((prev) => !prev)}
              onBlur={() => setFocus((prev) => !prev)}
            />
          </div>
        </div>

        {linkItems && (
          <div className="hidden md:flex h-5 items-center space-x-4 text-white text-sm font-bold">
            {linkItems.map((singleLink, ind) => {
              return ind === 0 ? (
                <div className="bg-gray-700 rounded-md px-3 py-1 hover:bg-red-500 cursor-pointer">
                  <Link href={singleLink.url}>{singleLink.label}</Link>
                </div>
              ) : (
                <>
                  {" "}
                  <Separator orientation="vertical" />
                  <div className="bg-gray-700 rounded-md px-3 py-1 hover:bg-red-500 cursor-pointer">
                    <Link href={singleLink.url}>{singleLink.label}</Link>
                  </div>
                </>
              );
            })}
          </div>
        )}

        {/* login logout section */}
        <div className="flex items-center gap-2">
          {!isLoggin ?
            <>

              <GlobalDialog
                dialogButton={
                  <Button className="text-sm hover:bg-gray-800">Login</Button>
                }
                dialogTitle={"Login"}
              >
                <Login user={UserRole.USER} />
              </GlobalDialog>

              <GlobalDialog
                dialogButton={
                  <Button className="text-sm bg-red-500 hover:bg-red-400">
                    Register
                  </Button>
                }
                dialogTitle={"Register"}
              >
                <Register role={UserRole.USER} />
              </GlobalDialog>
            </>
            :
            <GlobalDropDown
              display={
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{firstCharacterOfFullName(user.full_name)}</AvatarFallback>
                </Avatar>
              }
              isBlack={path === "/"}
              dropDownLists={undefined} />
          }
        </div>
      </nav>
    </header>
  );
};

export default DefaultNavBar;
