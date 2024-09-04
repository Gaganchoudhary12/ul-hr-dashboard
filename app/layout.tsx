import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

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
      <body suppressHydrationWarning={true}>
        <div className="md:block hidden">
          <Providers>{children}</Providers>
        </div>
        <div className="md:hidden w-full h-screen flex justify-center items-center">
          Not work in mobile
        </div>
      </body>
    </html>
  );
}