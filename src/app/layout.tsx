import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { mergeClassname } from "@utils/merge-classname";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GetMatil 💀💀💀",
  description: "GetMatil 💀💀💀",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={mergeClassname(inter.className, "bg-base-100")}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
