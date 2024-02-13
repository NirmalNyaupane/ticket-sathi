import React from "react";
import { Button, ButtonProps } from "../ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import ConditionallyRender from "./ConditionallyRender";

interface LoadingButton extends ButtonProps {
  isLoading?: boolean;
  LoadingIcon?: React.ReactElement;
  clasName?: string;
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButton>(
  ({ children, isLoading, clasName, LoadingIcon, ...props }, ref) => {
    return (
      <Button
        className={cn(`w-full my-2 flex justify-center`)}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        <ConditionallyRender
          condition={isLoading ?? false}
          show={
            LoadingIcon ? (
              LoadingIcon
            ) : (
              <Loader className="animate-spin delay-150" />
            )
          }
          elseShow={children}
        />
      </Button>
    );
  }
);

LoadingButton.displayName = "LoadingButton";

export default LoadingButton;
