import { authOptions } from "@/lib/auth"
import { trpcServer } from "@/lib/trpcServerClient";
import { getServerSession } from "next-auth"
import Image from "next/image";

export default async function User() {
	const user = await trpcServer.users.current()

  return (
	<div>
		<Image src={user?.image ?? ""} height={150} width={150} alt="profile" />
		<h1>{user?.name}</h1>
	</div>
  )
}
