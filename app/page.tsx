import { trpcServer } from "@/lib/trpcServerClient";
import Image from "next/image";

export default async function Home() {
  const hello = await trpcServer.hello();
  const protectedRoute = await trpcServer.getProtectedRoute();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {hello + " " + protectedRoute}
    </main>
  );
}
