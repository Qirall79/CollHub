export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
	<div className="w-screen h-screen bg-slate-900 flex items-center justify-center auth-background">
		<div className="w-[400px] relative bg-transparent rounded-2xl px-6 pt-6 pb-10">
			<div className="absolute top-0 left-0 w-full h-full bg-teal-400 opacity-5 rounded-2xl" />
			<div className="relative">
				{children}
			</div>
		</div>
	</div>
  );
}
