import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { Montserrat } from "next/font/google";
import ReactQueryProvider from "../providers/ReactQueryProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TechCamp Dashboard",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} h-screen bg-white max-lghidden`}
      >
        <ReactQueryProvider>
          <main className="h-full">{children}</main>
          <Toaster position="top-right" richColors theme="light" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
