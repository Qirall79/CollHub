"use client";

import { trpc } from "@/lib/trpcClient";
import { IProject } from "@/lib/types";
import { Project } from "./Project";
import { ProjectSkeleton } from "../Skeletons/ProjectSkeleton";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export const Projects = ({ query }: { query?: string }) => {
  const [page, setPage] = useState(0);
  const searchParams = useSearchParams()
  const projectsQuery = trpc.projects.getAll.useInfiniteQuery(
    { query },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor;
      },
    }
  );
  const projects = projectsQuery.data?.pages[page]?.projects;
  const handleScroll = () => {
    projectsQuery.fetchNextPage();
    setPage(page + 1);
  };

  if (projectsQuery.isLoading || projectsQuery.isFetchingNextPage)
    return (
      <div className="flex flex-col grow space-y-6">
        <ProjectSkeleton />
        <ProjectSkeleton />
        <ProjectSkeleton />
      </div>
    );

  return (
    <div className="flex flex-col grow space-y-6">
      {projects?.map((project: IProject) => {
        return <Project key={project.id} project={project} />;
      })}
      {!searchParams.get("query") && projects && projects.length >= 5 && <button onClick={handleScroll}>Load more...</button>}
    </div>
  );
};
