import { CreditCard, LogOut, Settings, User } from "lucide-react";
import { logoutReducer } from "@/redux/slices/auth.slice";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useDispatch } from "react-redux";
import Link from "next/link";
interface GlobalDropDownProps {
  display: string | React.ReactNode;
  dropDownLists: string[] | React.ReactNode;
  isBlack?: boolean;
}

const GlobalDropDown = ({ display, isBlack = false }: GlobalDropDownProps) => {
  const dispatch = useDispatch();
  return (
    <DropdownMenu modal={true}>
      <DropdownMenuTrigger asChild>{display}</DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(`w-48`, {
          "bg-gray-800 text-white border-gray-800": isBlack,
        })}
        align="end"
      >
        <DropdownMenuGroup className="">
          <Link href={"/user/my-account"}>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            dispatch(logoutReducer());
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GlobalDropDown;
