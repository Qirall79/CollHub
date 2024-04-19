import LoginForm from "@/app/components/LoginForm";
import { vt323 } from "@/app/fonts";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
	const session = await getServerSession(authOptions);
	
	if (session?.user)
		redirect("/");

	return (
	<div className="flex flex-col items-center space-y-2">
		<h1 className={`text-6xl text-center w-full ${vt323.className} font-semibold text-teal-300`}>
			CollHub
		</h1>
		<hr className="w-1/5 border-teal-400 pb-10" />
		<LoginForm />
	</div>
	)
}