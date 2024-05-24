import { trpc } from "@/lib/trpcClient";
import { IProject } from "@/lib/types";
import { Project } from "../Feed/Project";
import { ProjectSkeleton } from "../Skeletons/ProjectSkeleton";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { trpcServer } from "@/lib/trpcServerClient";

export const Projects = async () => {
  const projects = await trpcServer.projects.getUserProjects();

  if (!projects)
    return (
      <div className="flex flex-col grow space-y-6">
        <ProjectSkeleton />
        <ProjectSkeleton />
        <ProjectSkeleton />
      </div>
    );

  return (
    <div className="flex flex-col grow">
      {projects?.map((project: IProject) => {
          return <Project key={project.id} project={project} />;
        })}
    </div>
  );
};
