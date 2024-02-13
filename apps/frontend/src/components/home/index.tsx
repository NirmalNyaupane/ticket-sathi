import { ArrowRight } from "lucide-react";
import DefaultNavBar from "../common/navbar/DefaultNavBar";
import { Button } from "../ui/button";
import { userNavItems } from "@/constants/navbar/links";

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col">
        <DefaultNavBar
          className=" absolute top-10 z-10 left-[50%]"
          linkItems={userNavItems}
          style={{ transform: "translate(-50%, -50%)" }}
        />

        <div
          className="relative h-[90vh] bg-no-repeat bg-center bg-cover bg-origin-border"
          style={{
            backgroundImage: `url("/background.png")`,
            backdropFilter: "brightness(30%)",
          }}
        >
          <div className="text-white max-width flex flex-col justify-center h-[100%]">
            <div className="absolute flex flex-col justify-center md:w-[50%] space-y-5 mx-auto animate-fade-up animate-once">
              <p className="text-white text-4xl font-bold leading-normal">
                Find your perfect concert and theater event wherever you are
              </p>
              <p className="text-white text-xl">
                Enjoy the taste of music with the high quality
              </p>
              <Button className="w-fit bg-red-500 text-lg rounded-lg hover:bg-red-400">
                Explore <ArrowRight className=" ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
