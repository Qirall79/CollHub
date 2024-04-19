import { getServerSession } from "next-auth";
import User from "./components/User";
import { Suspense } from "react";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/dist/server/api-utils";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Suspense fallback={<h1>Loading User Infos...</h1>}>
        <User />
      </Suspense>
    </main>
  );
}
