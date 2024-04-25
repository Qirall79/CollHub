"use client";

import { inter, sourceCodePro } from "@/app/fonts";
import { IProject } from "@/lib/types";
import { Button, Chip } from "@nextui-org/react";
import { Technology } from "@prisma/client";
import React, { useState } from "react";

const chipColors: (
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
)[] = ["default", "primary", "secondary", "success", "warning", "danger"];

export const Project = ({ project }: { project: IProject }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  return (
    <div
      className={`${inter.className} group flex flex-col py-4 px-6 border border-slate-800 hover:bg-slate-950 transition-all rounded-2xl cursor-pointer`}
	  onClick={() => setDetailsVisible(!detailsVisible)}
    >
      <h3
        className={`${sourceCodePro.className} group-hover:text-cyan-600 text-xl font-semibold cursor-pointer transition-all`}
      >
        {project.title}
      </h3>
      <p className="text-sm text-slate-600 mb-2">
        <span className="text-slate-800">by</span> {project.author.name}
      </p>
      <p className="text-sm mb-4">{project.description}</p>
      <ul className="flex space-x-2">
        {project.technologies.map((t: Technology) => {
          return (
            <Chip
              size="sm"
              color={chipColors[Math.floor(Math.random() * chipColors.length)]}
              key={t.id}
            >
              {t.name}
            </Chip>
          );
        })}
      </ul>

      <div className={`${detailsVisible ? "flex flex-col" : "hidden"} transition-all`}>
        <Button className="mt-6 mb-1 max-w-40 bg-cyan-950">Send Request</Button>
        <p className={`text-xs text-slate-700 translate-x-1`}>
          {project.applications.length ?? project.applications.length} requests
          sent
        </p>
      </div>
    </div>
  );
};
