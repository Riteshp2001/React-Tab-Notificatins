import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Tab Notification ",
  description:
    "Created with Love By Ritesh Pandit Make sure to Follow me on Github 💗",
  keywords: ["nextjs", "react", "web development"],
  authors: [{ name: "Ritesh pandit", url: "https://riteshdpandit.vercel.app" }],
  creator: "Ritesh Pandit",
  publisher: "Ritesh",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
