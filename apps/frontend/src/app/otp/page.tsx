import EmailVerification from "@/components/common/EmailVerification";
import DefaultNavBar from "@/components/common/navbar/DefaultNavBar";
import { userNavItems } from "@/constants/navbar/links";


const EmailVerify = ({ searchParams }: {
  params?: any
  searchParams?: any
}) => {
  const { email, action } = searchParams;

  //mutation
  return (
    <>
      <DefaultNavBar linkItems={userNavItems} />
      <div className="max-width h-[80vh] flex justify-center items-center">
        <div className="w-[100%] md:w-[60%] lg:w-[40%] border border-gray-300 p-5 md:p-10 rounded-md">
          <EmailVerification
            email={email}
            purpose={action}
          />
        </div>
      </div>
    </>
  );
};

export default EmailVerify;
