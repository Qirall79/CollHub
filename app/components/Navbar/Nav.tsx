import React from "react";
import UserDropdown from "./UserDropdown";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { IUser } from "@/lib/types";
import Link from "next/link";
import { vt323 } from "@/app/fonts";
import MenuBar from "./MenuBar";

export default async function Nav() {
  const session = await getServerSession(authOptions);
  const navItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Projects",
      path: "/projects",
    },
  ];
  if (!session?.user) return null;

  return (
    <nav className="w-full max-w-[1280px] m-auto flex justify-between items-center py-6 px-[10%]">
      <MenuBar />
      <h1
        className={`text-4xl md:text-5xl ${vt323.className} font-semibold text-cyan-500`}
      >
        CollHub
      </h1>
      <ul
        className={`${vt323.className} text-xl md:text-2xl hidden md:flex items-center space-x-10`}
      >
        {navItems.map((item: { name: string; path: string }) => {
          return (
            <li className="hover:text-cyan-500 transition" key={item.name}>
              <Link href={item.path}>{item.name}</Link>
            </li>
          );
        })}
        <li className="hover:text-cyan-500 transition cursor-pointer">
          Notifications
        </li>
      </ul>
      <UserDropdown user={session?.user as IUser} />
    </nav>
  );
}
