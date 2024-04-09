"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function User() {
  const session = useSession();

  const handleClick = () => {
    if (session?.data?.user) {
      signOut();
      return;
    }
    signIn();
  };

  return (
    <div className="text-slate-300 text-center space-y-8">
      <h1 className="font-bold text-3xl">
        {session?.data?.user ? "Logged in" : "Logged out"}
      </h1>
      <button
        onClick={handleClick}
        className="border-2 border-teal-500 text-teal-500 font-semibold px-8 py-2 rounded-md "
      >
        {session.data?.user ? "Log out" : "Login"}
      </button>
    </div>
  );
}
