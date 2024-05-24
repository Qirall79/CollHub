import { trpcServer } from "@/lib/trpcServerClient";
import { IRequest } from "@/lib/types";
import Request from "./Request";

export default async function Requests() {
  const requests = await trpcServer.requests.getAll();

  if (!requests.length)
      return <p>You have no requests !</p>
  return (
    <>
      {requests.map((req: IRequest | any) => {
        return <Request key={req.id} request={req} />;
      })}
    </>
  );
}
