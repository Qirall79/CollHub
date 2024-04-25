import { Pixelify_Sans, VT323, Source_Code_Pro, Inter } from "next/font/google";

export const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const vt323 = VT323({
  subsets: ["latin"],
  weight: ["400"],
});

export const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const inter = Inter({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700"]
})
