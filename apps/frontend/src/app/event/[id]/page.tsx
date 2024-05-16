"use client";

import { EventAboutUs } from "@/components/event/EventDescription";
import EventDetails from "@/components/event/EventDetails";
import EventSlider from "@/components/event/EventSlider";

const images = ["/event.png","/event.png","/event.png"]

const page = () => {
  return (
    <div className="flex flex-col my-5 max-width gap-10">
      <div className="flex items-center gap-5">
        <div className="w-[90px] text-white text-center text-xl">
          <span className="block bg-red-500 font-bold py-2 rounded-t-md">
            Dec
          </span>
          <span className="block bg-gray-900 py-2 rounded-b-md font-bold">
            20
          </span>
        </div>

        <div>
          <h2 className="secondary-heading">Golden Night with dong</h2>
          <p className="flex gap-1 text-gray-900 leading-3">
            <span>CONCERT</span>
            <span className="text-gray-600">Kathmandu, Nepal</span>
          </p>
        </div>
      </div>
      <EventSlider imageUrls={images}/>

      <div className="flex flex-col lg:flex-row gap-6">
        <EventAboutUs />
        <EventDetails />
      </div>
    </div>
  );
};

export default page;
