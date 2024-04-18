import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import Image from "next/image";

export default async function User() {
	const session = await getServerSession(authOptions);
	console.log(session?.user);
	

  return (
	<div>
		<Image src={session?.user?.image ?? ""} height={150} width={150} alt="profile" />
		<h1>{session?.user?.name}</h1>
	</div>
  )
}
