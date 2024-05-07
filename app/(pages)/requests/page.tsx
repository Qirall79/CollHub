import Request from "@/app/components/Requests/Request";
import Requests from "@/app/components/Requests/Requests";
import { ProjectSkeleton } from "@/app/components/Skeletons/ProjectSkeleton";
import { authOptions } from "@/lib/auth";
import { trpcServer } from "@/lib/trpcServerClient";
import { IRequest } from "@/lib/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");
  return (
    <main className="w-full max-w-[1280px] m-auto px-[10%] py-8">
      <Suspense
        fallback={
          <div className="flex flex-col grow space-y-6">
            <ProjectSkeleton />
            <ProjectSkeleton />
            <ProjectSkeleton />
          </div>
        }
      >
        <Requests />
      </Suspense>
    </main>
  );
};

export default page;
