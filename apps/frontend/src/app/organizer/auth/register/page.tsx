"use client";
import Register from "@/components/auth/Register";
import Stepper from "@/components/common/navbar/Stepper";
import { UserRoleEnum } from "@/constants/enum";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import RegisterOrganizer from "@/components/auth/RegisterOrganizer";
import CongratulationSvg from "@/components/svg/CongratulationSvg";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation"
const OrganizerRegister = () => {
  const [steps, setStpes] = useState(1);
  const auth = useSelector((state: RootState) => state.auth!);
  const router = useRouter();

  const checkRegister = () => {
    if (auth.role !== UserRoleEnum.ORGANIZER) return;
    if (!auth.isUserLogin) return;
    if (!auth.isRegisterOrganizer) {
      setStpes(2);
    } else {
      router.push("/organizer/dashboard");
    }
  }

  useEffect(() => {
    checkRegister();
  }, [])

  return (
    <div className="max-width flex justify-center flex-col items-center">
      <div className="w-[90%] md:w-[70%] lg:w-[40%] space-y-5">
        <div className="w-fit my-3">
          <Image
            src={"/logo.png"}
            width={100}
            height={50}
            alt="logo"
            className="rounded-md"
          />
        </div>

        {steps === 1 && (
          <>
            <Stepper activeIndex={1} totalCount={3} />
            <h2 className="font-bold text-2xl text-center my-2">
              Setup your account
            </h2>
            <hr />
            <Register role={UserRoleEnum.ORGANIZER} />
            <div className="text-bold font-medium text-center -mt-5">
              Already have an account?{" "}
              <Link href={`/organizer/auth/login`} className="text-red-500">
                Login Now
              </Link>
            </div>
          </>
        )}

        {steps === 2 && (
          <>
            <Stepper activeIndex={2} totalCount={3} />
            <h2 className="font-bold text-2xl text-center my-2">
              Setup Organizer Profile
            </h2>
            <hr />
            <RegisterOrganizer setNextPage={setStpes}/>
          </>
        )}

        {steps === 3 && (
          <>
            <Stepper activeIndex={3} totalCount={3} />
            <div className="bg-red-50 h-[400px] flex flex-col justify-center items-center gap-4 rounded-md">
              <CongratulationSvg />
              <p className="text-xl font-medium">Congratualations !</p>
              <p className="text-gray-600">Admin will review your details, Thank you !</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrganizerRegister;
