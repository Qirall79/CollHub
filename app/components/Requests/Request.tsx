"use client";

import { sourceCodePro } from "@/app/fonts";
import { IRequest } from "@/lib/types";

export default function Request({ request }: { request: IRequest }) {
  return (
    <div className="flex flex-col py-4 px-6 mb-6 border border-slate-800 hover:bg-slate-950 transition-all rounded-2xl cursor-pointer relative">
      <h3
        className={`${sourceCodePro.className} group-hover:text-cyan-600 text-md font-semibold cursor-pointer transition-all`}
      >
        {request.sender?.name}
      </h3>
    </div>
  );
}
