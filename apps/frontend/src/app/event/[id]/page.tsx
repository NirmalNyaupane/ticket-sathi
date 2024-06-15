"use client";

import { useGetSingleEventQuery } from "@/__generated__/graphql";
import { EventAboutUs } from "@/components/event/EventDescription";
import EventDetails from "@/components/event/EventDetails";
import EventSlider from "@/components/event/EventSlider";
import { format } from "date-fns";
import { useParams } from "next/navigation";

const images = ["/event.png", "/event.png", "/event.png"];

const EventPage = () => {
  const params = useParams();

  const { data, loading } = useGetSingleEventQuery({
    variables: {
      eventId: params.id as string,
    },
  });

  const images = data?.getSingleEvent.images.map((image) => image.name)!;

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="flex flex-col my-5 max-width gap-10">
      <div className="flex items-center gap-5">
        <div className="w-[90px] text-white text-center text-xl">
          <span className="block bg-red-500 font-bold py-2 rounded-t-md">
            {format(new Date(data?.getSingleEvent.eventStartDate), "MMM")}
          </span>
          <span className="block bg-gray-900 py-2 rounded-b-md font-bold">
            {format(new Date(data?.getSingleEvent.eventStartDate), "dd")}
          </span>
        </div>

        <div>
          <h2 className="secondary-heading">{data?.getSingleEvent.name}</h2>
          <p className="flex gap-1 text-gray-900 leading-3">
            <span>{data?.getSingleEvent.type}</span>
            <span className="text-gray-600">{data?.getSingleEvent.venue}</span>
          </p>
        </div>
      </div>
      <EventSlider
        imageUrls={
          images.length > 0 ? images : [data?.getSingleEvent.cover.name!]
        }
      />

      <div className="flex flex-col lg:flex-row gap-6">
        <EventAboutUs />
        <EventDetails />
      </div>
    </div>
  );
};

export default EventPage;
