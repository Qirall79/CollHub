"use client";

import { trpc } from "@/lib/trpcClient";
import { IProject } from "@/lib/types";
import { Project } from "./Project";
import { ProjectSkeleton } from "../Skeletons/ProjectSkeleton";
import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

export const Projects = ({ query }: { query?: string }) => {
  const [page, setPage] = useState(0);
  const skeletonRef = useRef<HTMLDivElement | null>(null)
  const searchParams = useSearchParams();
  const projectsQuery = trpc.projects.getAll.useInfiniteQuery(
    { query },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor;
      },
    }
  );
  const handleScroll = () => {
    projectsQuery.fetchNextPage();
    setPage(page + 1);
  };

  if (projectsQuery.isLoading)
    return (
      <div className="flex flex-col grow space-y-6">
        <ProjectSkeleton />
        <ProjectSkeleton />
        <ProjectSkeleton />
      </div>
    );

  return (
    <div className="flex flex-col grow space-y-6">
      {projectsQuery.data?.pages.map((page: { projects: IProject[] }) => {
        return page.projects?.map((project: IProject) => {
          return <Project key={project.id} project={project} />;
        });
      })}
      {projectsQuery.isFetchingNextPage && <ProjectSkeleton ref={skeletonRef} />}
      {!projectsQuery.isFetchingNextPage && !searchParams.get("query") && projectsQuery.hasNextPage && (
        <button onClick={handleScroll}>Load more...</button>
      )}
    </div>
  );
};
