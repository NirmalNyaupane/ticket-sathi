import React from "react";
import Image from "next/image";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
const EventAboutUs = () => {
  return (
    <div className="space-y-7">
      <h2 className="text-3xl font-bold">About this event</h2>
      <p className="text-xl text-gray-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
        itaque et eos praesentium nemo id nulla illo maiores laborum quidem. At
        pariatur tenetur assumenda libero veniam reprehenderit sequi quibusdam
        esse.
      </p>

      <h2 className="text-3xl font-bold">Artist</h2>

      <div className="space-y-4">
        <div className="flex gap-3 items-center bg-red-100 px-7 rounded-lg py-4">
          <Image src={"/dong.png"} alt="dong" height={80} width={80} />
          <div className="flex flex-col gap-0">
            <p className="font-bold text-xl">Dong</p>
            <p className="text-lg text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
              officiis?
            </p>
            <div className="flex gap-3 mt-1">
              <Link href={"facebook.com"}>
                <Facebook className="border-black border-2 rounded-md" />
              </Link>

              <Link href={"instragram.com"}>
                <Instagram />
              </Link>

              <Link href={"twiter.com"}>
                <Twitter />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex gap-3 items-center bg-red-100 px-7 rounded-lg py-4">
          <Image src={"/dong.png"} alt="dong" height={80} width={80} />
          <div className="flex flex-col gap-0">
            <p className="font-bold text-xl">Dong</p>
            <p className="text-lg text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
              officiis?
            </p>
            <div className="flex gap-3 mt-1">
              <Link href={"facebook.com"}>
                <Facebook className="border-black border-2 rounded-md" />
              </Link>

              <Link href={"instragram.com"}>
                <Instagram />
              </Link>

              <Link href={"twiter.com"}>
                <Twitter />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex gap-3 items-center bg-red-100 px-7 rounded-lg py-4">
          <Image src={"/dong.png"} alt="dong" height={80} width={80} />
          <div className="flex flex-col gap-0">
            <p className="font-bold text-xl">Dong</p>
            <p className="text-lg text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
              officiis?
            </p>
            <div className="flex gap-3 mt-1">
              <Link href={"facebook.com"}>
                <Facebook className="border-black border-2 rounded-md" />
              </Link>

              <Link href={"instragram.com"}>
                <Instagram />
              </Link>

              <Link href={"twiter.com"}>
                <Twitter />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold">About Organizer</h2>

      <div className="flex gap-3 items-center border-2 border-gray-400 px-7 rounded-lg justify-between py-8 bg-gray-100">
        <div>
          <p className="text-xl">Organizer by</p>
          <h2 className="text-xl font-bold">Nirmal Neupane</h2>
        </div>

        <div className="flex flex-col gap-0">
          <Button className="bg-red-500 hover:bg-red-400">Follow</Button>
        </div>
      </div>
    </div>
  );
};

export { EventAboutUs };
