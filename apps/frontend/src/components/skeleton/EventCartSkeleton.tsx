import React from "react";
import { Skeleton } from "../ui/skeleton";

const EventCartSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] border border-black animate-pulse rounded-md bg-muted" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export default EventCartSkeleton;
