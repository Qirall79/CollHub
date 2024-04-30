"use client";

import { trpc } from "@/lib/trpcClient";
import { IProject } from "@/lib/types";
import { Project } from "./Project";
import { ProjectSkeleton } from "../Skeletons/ProjectSkeleton";

export const Projects = () => {
  const projects = trpc.projects.getAll.useQuery();

  if (projects.isLoading)
    return <div className="flex flex-col grow space-y-6">
		<ProjectSkeleton />
		<ProjectSkeleton />
		<ProjectSkeleton />
	</div>;

  return (
    <div className="flex flex-col grow space-y-6">
      {projects.data?.map((project: IProject) => {
        return <Project key={project.id} project={project} />;
      })}
    </div>
  );
};
