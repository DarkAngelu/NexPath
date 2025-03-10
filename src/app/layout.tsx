import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { MarkdownProvider } from "@/components/context/MarkdownContext";
import { HeadingProvider } from "@/components/context/HeadingContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} bg-gray-900`}>
				<ClerkProvider
					appearance={{
						baseTheme: dark,
						layout: {
							unsafe_disableDevelopmentModeWarnings: true,
						},
						variables: {
							colorPrimary: "#40403e",
						},
					}}
				>
					<MarkdownProvider>
						<HeadingProvider>{children}</HeadingProvider>
					</MarkdownProvider>
				</ClerkProvider>
			</body>
		</html>
	);
}
