import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Toaster } from "sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "NovaHost - Build and Deploy on the AI Cloud",
  description:
    "Deploy your projects in seconds with zero configuration. Build, scale, and secure a faster, more personalized web.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <SessionProvider session={session}>{children}</SessionProvider>
        {/* Premium Enhanced Sonner Toaster */}
        <Toaster
          position="top-right"
          richColors
          closeButton
          expand
          duration={5000}
          gap={16}
          visibleToasts={4}
          toastOptions={{
            className: "premium-toast",
          }}
        />
      </body>
    </html>
  );
}
