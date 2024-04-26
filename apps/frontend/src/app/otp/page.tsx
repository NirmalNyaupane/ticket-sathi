import EmailVerification from "@/components/common/EmailVerification";
import Image from "next/image";
import Link from "next/link";

const EmailVerify = ({
  searchParams,
}: {
  params?: any;
  searchParams?: any;
}) => {
  const { email, action } = searchParams;

  //mutation
  return (
    <>
      <div className="max-width flex justify-center flex-col items-center h-screen">
        <div className="w-[90%] md:w-[50%] lg:w-[40%] flex flex-col gap-10">
          <div className="w-fit">
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

          <div className=" border border-gray-300 p-5 md:p-10 rounded-md space-y-4">
            {/* <h2 className="text-xl font-bold text-center">Forgot Password</h2> */}

            <EmailVerification email={email} purpose={action} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailVerify;
