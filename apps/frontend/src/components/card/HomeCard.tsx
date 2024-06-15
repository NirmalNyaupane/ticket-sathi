import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface props {
  id: string;
  name: string;
  image: string;
  type: string;
  venue: string;
  startDate: string;
}

const HomeCart = ({ id, name, image, venue, type, startDate }: props) => {
  const [isMouseTouch, setMouseTouch] = useState(false);
  return (
    <Card className="w-[300px] p-0 relative overflow-y-hidden">
      <CardContent
        className="p-0 w-full h-[250px] overflow-hidden border-red-400 flex flex-col justify-center items-center"
        onMouseEnter={() => setMouseTouch(true)}
        onMouseLeave={() => setMouseTouch(false)}
      >
        <Image
          src={image}
          alt="event image"
          width={300}
          height={200}
          style={{
            objectFit: "cover",
            borderRadius: "5px",
            ...(isMouseTouch ? { filter: "brightness(60%)" } : {}),
          }}
        />
        <Badge
          variant="outline"
          className="absolute rounded-sm text-xl text-white bg-[rgba(0,0,0,0.4)] z-10 top-2 right-2"
        >
          {type}
        </Badge>

        {isMouseTouch && (
          <Button className="absolute text-white bg-transparent border-2 hover:bg-transparent">
            <Link href={`/event/${id}`} className="flex items-center ">
              View details
              <ArrowRight className=" ml-2" />
            </Link>
          </Button>
        )}
      </CardContent>

      <CardHeader className="px-3">
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-between px-3">
        <p>{startDate}</p>
        <p>{venue}</p>
      </CardFooter>
    </Card>
  );
};

export default HomeCart;
