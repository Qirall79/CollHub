"use client";

import { sourceCodePro } from "@/app/fonts";
import { trpc } from "@/lib/trpcClient";
import { IRequest } from "@/lib/types";
import { Button, Tooltip, User } from "@nextui-org/react";
import { useState } from "react";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

export default function Request({ request }: { request: IRequest }) {
  const mutation = trpc.requests.ignore.useMutation();
  const [ignored, setIgnored] = useState(false);

  const handleIgnore = () => {
    mutation.mutate(request.id);
    setIgnored(true);
  };

  return (
    <div
      className={`flex flex-col space-y-2 items-start py-4 px-6 mb-6 border border-slate-800 hover:bg-slate-950 transition-all rounded-2xl cursor-pointer relative ${
        ignored ? "hidden" : ""
      }`}
    >
      <User
        name={request.sender?.name}
        description="1d ago"
        avatarProps={{
          src: request.sender?.image || "",
        }}
      />
      <h3
        className={`${sourceCodePro.className} text-gray-500 text-xl font-semibold cursor-pointer transition-all`}
      >
        {request.project?.title}
      </h3>
      <p className="text-sm pb-4">{request.body}</p>
      <div className="text-xs font-semibold mb-4 flex space-x-2 items-center text-[#7289da]">
        <FaDiscord size={20} /> <span>{request.discord}</span>
      </div>
      {request.github && (
        <div className="text-xs font-semibold mb-4 flex space-x-2 items-center text-slate-400">
          <FaGithub size={20} /> <span>{request.github}</span>
        </div>
      )}
      <Tooltip content="Ignore request">
        <Button
          size="sm"
          className="absolute right-0 top-0 p-0 bg-transparent"
          startContent={
            <IoIosCloseCircle
              className="text-slate-600"
              onClick={handleIgnore}
              size={20}
            />
          }
        />
      </Tooltip>
    </div>
  );
}
