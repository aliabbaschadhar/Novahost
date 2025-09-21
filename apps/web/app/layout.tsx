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
  keywords: [
    "cloud hosting",
    "web deployment",
    "AI cloud",
    "serverless",
    "NovaHost",
    "web hosting",
    "application deployment",
  ],
  authors: [{ name: "NovaHost Team" }],
  creator: "NovaHost",
  publisher: "NovaHost",
  metadataBase: new URL("https://novahost.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NovaHost - Build and Deploy on the AI Cloud",
    description:
      "Deploy your projects in seconds with zero configuration. Build, scale, and secure a faster, more personalized web.",
    type: "website",
    locale: "en_US",
    url: "https://novahost.dev",
    siteName: "NovaHost",
    images: [
      {
        url: "/logo.svg",
        width: 120,
        height: 120,
        alt: "NovaHost Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NovaHost - Build and Deploy on the AI Cloud",
    description:
      "Deploy your projects in seconds with zero configuration. Build, scale, and secure a faster, more personalized web.",
    images: ["/logo.svg"],
    creator: "@novahost",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.svg", type: "image/svg+xml", sizes: "16x16" },
      { url: "/favicon-32x32.svg", type: "image/svg+xml", sizes: "32x32" },
    ],
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.svg",
    other: [
      {
        rel: "mask-icon",
        url: "/logo.svg",
        color: "#3B82F6",
      },
    ],
  },
  manifest: "/site.webmanifest",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
