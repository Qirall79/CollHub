import LoginForm from "@/app/components/LoginForm";
import { vt323 } from "@/app/fonts";

export default function Page() {
	return (
	<div className="flex flex-col items-center space-y-4">
		<h1 className={`absolute -top-24 text-6xl text-center w-full ${vt323.className} font-semibold text-teal-300`}>
			CollHub
		</h1>
		<LoginForm />
	</div>
	)
}