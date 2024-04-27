import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Feed from "./components/Feed/Feed";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect("/login");

  return (
    <main className="w-full max-w-[1280px] m-auto px-[10%] py-8 gap-6">
      <Feed />
    </main>
  );
}
