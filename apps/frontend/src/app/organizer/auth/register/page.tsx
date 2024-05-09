"use client";
import RegisterOrganizer from "@/components/auth/RegisterOrganizer";
import Image from "next/image";
import Link from "next/link";

const OrganizerRegister = () => {
  return (
    <div className="max-width flex justify-center flex-col items-center">
      <div className="w-[90%] md:w-[70%] lg:w-[40%] space-y-5">
        <div className="w-fit my-3">
          <Link href={"/"}>
            <Image
              src={"/logo.png"}
              width={100}
              height={50}
              alt="logo"
              className="rounded-md"
            />
          </Link>
        </div>
        <h2 className="font-bold text-2xl text-center my-2">
          Setup your account
        </h2>
        <hr />
        <RegisterOrganizer />
        <div className="text-bold font-medium text-center -mt-5">
          Already have an account?{" "}
          <Link href={`/organizer/auth/login`} className="text-red-500">
            Login Now
          </Link>
        </div>
      </div>
    </div>
  );
}


export default OrganizerRegister;
