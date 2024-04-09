import { auth } from "@/auth";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export const createContext = async (opts: FetchCreateContextFnOptions) => {
  const session = await auth();
  const { req, resHeaders } = opts;

  return {
    session,
    req,
    res: resHeaders,
  };
};
