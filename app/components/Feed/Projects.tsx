/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { trpc } from "@/lib/trpcClient";
import { IProject } from "@/lib/types";
import { Project } from "./Project";
import { ProjectSkeleton } from "../Skeletons/ProjectSkeleton";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

export const Projects = ({ query }: { query?: string }) => {
  const footRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const projectsQuery = trpc.projects.getAll.useInfiniteQuery(
    { query },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor;
      },
    }
  );

  useEffect(() => {
    const handleScroll = () => {
      if (footRef.current) {
        const rect = footRef.current.getBoundingClientRect();
        const isVisible =
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <=
            (window.innerWidth || document.documentElement.clientWidth);

        if (isVisible) projectsQuery.fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [footRef.current]);

  if (projectsQuery.isLoading)
    return (
      <div className="flex flex-col grow space-y-6">
        <ProjectSkeleton />
        <ProjectSkeleton />
        <ProjectSkeleton />
      </div>
    );

  return (
    <div className="flex flex-col grow">
      {projectsQuery.data?.pages.map((page: { projects: IProject[] | any }) => {
        return page.projects?.map((project: IProject) => {
          return <Project key={project.id} project={project} />;
        });
      })}
      {projectsQuery.isFetchingNextPage && (
        <div className="flex flex-col grow space-y-6">
          <ProjectSkeleton />
          <ProjectSkeleton />
        </div>
      )}
      {!projectsQuery.isFetchingNextPage &&
        !searchParams.get("query") &&
        projectsQuery.hasNextPage && <div ref={footRef} />}
    </div>
  );
};
