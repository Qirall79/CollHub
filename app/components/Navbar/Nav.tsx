import React from "react";
import UserDropdown from "./UserDropdown";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { IUser } from "@/lib/types";
import Link from "next/link";
import { vt323 } from "@/app/fonts";
import MenuBar from "./MenuBar";
import { trpcServer } from "@/lib/trpcServerClient";

export default async function Nav() {
  const session = await getServerSession(authOptions);
  const navItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "My Projects",
      path: "/projects",
    },
    {
      name: "Requests",
      path: "/requests",
    },
  ];
  if (!session?.user) return null;
  const requestsCount = await trpcServer.requests.getCount();

  return (
    <nav className="w-full max-w-[1650px] m-auto flex justify-between items-center py-6 px-[10%]">
      <MenuBar />
      <h1
        className={`text-4xl md:text-5xl ${vt323.className} font-semibold text-cyan-500`}
      >
        <span className="text-white">Coll</span>Hub
      </h1>
      <ul
        className={`${vt323.className} text-xl md:text-2xl hidden md:flex items-center space-x-10`}
      >
        {navItems.map((item: { name: string; path: string }) => {
          return (
            <li className="hover:text-cyan-500 transition" key={item.name}>
              <Link href={item.path}>{item.name}</Link>
              {requestsCount > 0 && item.name == "Requests" && (
                <span className=" bg-pink-600  text-sm px-1 rounded-full relative -top-2">{requestsCount}</span>
              )}
            </li>
          );
        })}
      </ul>
      <UserDropdown user={session?.user as IUser} />
    </nav>
  );
}
