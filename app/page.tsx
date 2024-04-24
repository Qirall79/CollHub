import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session?.user)
      redirect("/login")

  return (
    <main className="flex flex-col items-center justify-between">
      hello world
    </main>
  );
}
