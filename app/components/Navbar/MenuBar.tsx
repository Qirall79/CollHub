"use client";

import { vt323 } from "@/app/fonts";
import Link from "next/link";
import { useState } from "react";
import { IoIosClose, IoIosMenu } from "react-icons/io";

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

export default function MenuBar() {
  const [isDisplayed, setDisplayed] = useState(false);

  return (
    <div className="flex md:hidden">
      <IoIosMenu className="text-4xl" onClick={() => setDisplayed(true)} />
      <div
        className={`absolute top-0 ${
          isDisplayed ? "left-0" : "-left-full"
        } w-screen h-screen flex flex-col items-start space-y-10 py-6 px-[10%] z-50 bg-cyan-950 transition-all`}
      >
        <IoIosClose className="text-6xl -translate-x-4 text-cyan-300" onClick={() => setDisplayed(false)} />
        <ul
          className={`${vt323.className} text-3xl flex flex-col items-start space-y-10`}
        >
          {navItems.map((item: { name: string; path: string }) => {
            return (
              <li className="hover:text-cyan-300 transition" key={item.name}>
                <Link href={item.path}>{item.name}</Link>
              </li>
            );
          })}
          <li className="hover:text-cyan-300 transition cursor-pointer">
            Notifications
          </li>
        </ul>
      </div>
    </div>
  );
}
