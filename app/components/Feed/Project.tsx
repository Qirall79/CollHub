"use client";

import { inter, sourceCodePro } from "@/app/fonts";
import { IProject, IUser } from "@/lib/types";
import {
  Button,
  Chip,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import React, { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import DeleteModal from "../Modals/DeleteModal";
import { trpc } from "@/lib/trpcClient";
import { useSession } from "next-auth/react";

const chipColors: (
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
)[] = ["default", "primary", "secondary", "success", "warning", "danger"];

export const Project = ({ project }: { project: IProject }) => {
  const { data: session } = useSession();
  const user = session?.user as IUser;

  const utils = trpc.useUtils();
  const deleteMutation = trpc.projects.deleteProject.useMutation({
    onSuccess: () => {
      utils.projects.getAll.invalidate();
    },
  });

  const [detailsVisible, setDetailsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const deleteProject = async (onClose: any) => {
    setIsLoading(true);
    await deleteMutation.mutateAsync({ id: project.id });
    setIsLoading(false);
    onClose();
  };

  const sendRequest = async () => {
    // todo
  };

  return (
    <div
      className={`${inter.className} group flex flex-col py-4 px-6 border border-slate-800 hover:bg-slate-950 transition-all rounded-2xl cursor-pointer relative`}
      onClick={() => {
        if (user.id !== project.author.id) setDetailsVisible(!detailsVisible);
      }}
    >
      <h3
        className={`${sourceCodePro.className} group-hover:text-cyan-600 text-xl font-semibold cursor-pointer transition-all`}
      >
        {project.title}
      </h3>
      <p className="text-sm text-slate-600 mb-2 capitalize">
        <span className="text-slate-800 lowercase">by </span>
        {project.author.name}
      </p>
      <p className="text-sm mb-4">{project.description}</p>
      <ul className="flex space-x-2">
        {project.technologies.split(",").map((t: string) => {
          return (
            <Chip
              size="sm"
              color={chipColors[Math.floor(Math.random() * chipColors.length)]}
              key={t.toLowerCase()}
            >
              {t}
            </Chip>
          );
        })}
      </ul>

      <div
        className={`${
          detailsVisible ? "flex flex-col" : "hidden"
        } transition-all`}
      >
        <Button
          onClick={sendRequest}
          className="mt-6 mb-1 max-w-40 bg-cyan-950"
        >
          Send Request
        </Button>
        <p className={`text-xs text-slate-700 translate-x-1`}>
          {project.applications?.length
            ? project.applications?.length > 0 &&
              project.applications?.length + "requests sent"
            : ""}
        </p>
      </div>
      {user.id == project.author.id && (
        <Popover placement="bottom" className={``}>
          <PopoverTrigger>
            <div className="absolute p-1 rounded-full hover:bg-cyan-800 top-3 right-5 transition">
              <CiMenuKebab />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <DeleteModal isLoading={isLoading} action={deleteProject} />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};
