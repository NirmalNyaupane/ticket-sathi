import Login from "@/components/auth/Login";
import { UserRoleEnum } from "@/constants/enum";
import Link from "next/link";
import Image from "next/image";
const OrganizerLogin = () => {
  return (
    <div className="max-width flex justify-center flex-col items-center h-screen">
      <div className="w-[90%] md:w-[50%] lg:w-[30%] flex flex-col gap-10">
        <div className="w-fit">
          <Image
            src={"/logo.png"}
            width={100}
            height={50}
            alt="logo"
            className="rounded-md"
          />
        </div>

        <div className="space-y-5">
          <h2 className="font-bold text-2xl my-2">Login</h2>
          <hr />
          <Login user={UserRoleEnum.ADMIN} />
          <div className="text-bold font-medium text-center">
            Don&apos;t have an account?{" "}
            <Link href={`/organizer/auth/register`} className="text-red-500">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerLogin;
