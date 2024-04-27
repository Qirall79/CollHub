import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "./Provider";
import Nav from "./components/Navbar/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CollHub",
  description: "Developers' project collaborators platform",
  icons: {
    icon: "/favicon.ico"
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen min-w-screen dark text-foreground bg-slate-950`}>
        <Provider>
          <Nav />
          {children}
        </Provider>
      </body>
    </html>
  );
}
