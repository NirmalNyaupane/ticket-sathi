import EventCeateUpdate from "@/components/event/EventCreate";
import EventSlider from "@/components/event/EventSlider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
const page = () => {
  return (
    <div className="flex flex-col gap-3">
      <Card>
        <CardHeader>
          <CardTitle>Basic Details</CardTitle>
          <Separator />
        </CardHeader>
        <CardContent className="overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-12 gap-2">
            <div className="sm:col-span-6 md:col-span-5">
              <h2 className="font-semibold">Name</h2>
              <p className="text-justify text-gray-600">
                Best event werwe wetwe{" "}
              </p>
            </div>

            <div className="md:col-span-6">
              <h2 className="font-semibold">Types</h2>
              <p className="text-justify text-gray-600">Theater</p>
            </div>

            <div className="md:col-start-1 sm:col-span-6 md:col-span-5">
              <h2 className="font-semibold">Venue</h2>
              <p className="text-justify text-gray-600">Best event</p>
            </div>

            <div className="sm:col-span-6 md:col-span-6">
              <h2 className="font-semibold">Category</h2>
              <p className="text-justify text-gray-600">Best event</p>
            </div>

            <div className="sm:col-start-1 sm:col-span-10 md:col-end-11 col-span-2">
              <h2 className="font-semibold">Description</h2>
              <p className="text-justify text-gray-600">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit,
                inventore rerum? Consectetur illum praesentium ad culpa nihil,
                facere eaque fugit minus ex voluptas atque beatae doloribus!
                Doloremque, minus culpa. Tempora?
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Event Date</CardTitle>
          <Separator></Separator>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
            <div className="">
              <h2 className="font-semibold">Event Start Date</h2>
              <p className="text-justify text-gray-600">
                May 08, 2024 03:00 PM
              </p>
            </div>
            <div className="">
              <h2 className="font-semibold">Event End Date</h2>
              <p className="text-justify text-gray-600">
                May 08, 2024 03:00 PM
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Event Cover</CardTitle>
          <Separator></Separator>
        </CardHeader>
        <CardContent className="space-y-2">
          <Image
            src={"/background.png"}
            width={500}
            height={500}
            alt="slider"
            className="w-full h-[80vh] object-cover rounded-2xl"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Event Images</CardTitle>
          <Separator></Separator>
        </CardHeader>
        <CardContent className="space-y-2">
          <EventSlider />
        </CardContent>
      </Card>
      {/* <EventCeateUpdate action="create"/> */}
    </div>
  );
};

export default page;
