import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/navbar";
export const metadata: Metadata = {
  title: "Next.js Rendering Demo",
  description: "Compare CSR, SSG, and SSR rendering strategies",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`h-screen overflow-auto`}>
        <Navbar />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
