import { Skeleton } from "@nextui-org/react";
import { MutableRefObject } from "react";

export const ProjectSkeleton = ({ref}: {ref?: MutableRefObject<any>}) => {
  return (
    <div ref={ref} className="w-full flex items-center gap-3">
      <div className="w-full flex flex-col gap-2 border border-slate-800 p-6 rounded-xl">
        <Skeleton className="h-3 w-1/5 rounded-lg" />
        <Skeleton className="h-3 w-1/6 rounded-lg" />
        <Skeleton className="h-3 w-1/2 rounded-lg" />
        <div className="flex space-x-2">
          <Skeleton className="h-6 w-14 rounded-xl" />
          <Skeleton className="h-6 w-14 rounded-xl" />
          <Skeleton className="h-6 w-14 rounded-xl" />
        </div>
      </div>
    </div>
  );
};
