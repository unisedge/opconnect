import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ReactQueryProvider } from "./ReactQueryClientProvider";

// const inter = Inter({ subsets: ["latin"] });
// const giest = GeistSans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OpConnect",
  description: "personal Opportunity Management Tool for now",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={`${GeistSans} h-full`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <section className="absolute bottom-[63px] left-[9px]">
              <ModeToggle />
            </section>

            <ReactQueryProvider>{children}</ReactQueryProvider>
          </ThemeProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
