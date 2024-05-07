import Request from "@/app/components/Requests/Request";
import { authOptions } from "@/lib/auth";
import { trpcServer } from "@/lib/trpcServerClient";
import { IRequest } from "@/lib/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const requests = await trpcServer.requests.getAll();

  return <main className="w-full max-w-[1280px] m-auto px-[10%] py-8">
    {requests.map((req: IRequest | any) => {
      return <Request key={req.id} request={req} />
    })}
  </main>
};

export default page;
