'use client'

import { Button } from "@nextui-org/react"
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FaDiscord, FaGithub } from "react-icons/fa";
import ftLogo from "@/public/images/42_logo.png"
import Image from "next/image";

export default function LoginForm() {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	return (
		<div className="w-full h-full flex flex-col items-center space-y-4">
			<Button
				startContent={<Image src={ftLogo} width={32} height={32} alt="42 school logo" />}
				className="w-full font-medium text-black"
				color="default"
				variant="solid"
				size="lg"
				onClick={async () => {
					setIsLoading(true);
					await signIn("42-school", {
						callbackUrl: "/",
					});
					setIsLoading(false);
				}}
				isDisabled={isLoading}
			>
				Continue with Intra
			</Button>

			<Button
				startContent={<FaGithub className="text-3xl" />}
				className="w-full font-medium bg-black text-white hover:text-neutral-300"
				color="default"
				variant="solid"
				size="lg"
				onClick={async () => {
					setIsLoading(true);
					await signIn("github", {
						callbackUrl: "/",
					});
					setIsLoading(false);
				}}
				isDisabled={isLoading}
			>
				Continue with Github
			</Button>
			<Button
				startContent={<FaDiscord className="text-3xl" />}
				className="w-full font-medium bg-indigo-800"
				color="secondary"
				variant="solid"
				size="lg"
				onClick={async () => {
					setIsLoading(true);
					await signIn("discord", {
						callbackUrl: "/",
					});
					setIsLoading(false);
				}}
				isDisabled={isLoading}
			>
				Continue with Discord
			</Button>
			
		</div>
	)
}