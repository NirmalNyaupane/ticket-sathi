"use client";
import { Edit, Trash } from "lucide-react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { forwardRef } from "react";
interface Props {
  id: string;
  categoryName: string;
  totalEvent: number;
  description: string;
}
const CategoryCard = forwardRef<HTMLDivElement, Props>(
  ({ categoryName, totalEvent, id, description }, ref) => {
    return (
      <Card className="w-[350px] max-h-[200px] space-y-3 shadow-sm" ref={ref}>
        <CardHeader className="space-y-2 px-4 py-1 relative">
          <CardTitle className="text-[1.2rem]">{categoryName}</CardTitle>

          <DropdownMenu>
            <DropdownMenuTrigger className="absolute right-3 text-2xl">
              <BsThreeDotsVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="space-x-2">
                <span>
                  <Edit />
                </span>
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="space-x-2">
                <span>
                  <Trash />
                </span>
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <CardDescription className="line-clamp-4 text-[0.9rem]">
            {description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="px-4 flex-col items-start w-fit">
          <div className="font-bold">Total Event</div>
          <div className="font-bold text-center">{totalEvent}</div>
        </CardFooter>
      </Card>
    );
  }
);
CategoryCard.displayName = "Card";
export default CategoryCard;
