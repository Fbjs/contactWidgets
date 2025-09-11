"use client";

import type { Metadata } from "next";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { cn } from "@/lib/utils";

// This can't be a separate metadata export because we need to use the usePathname hook.
// export const metadata: Metadata = {
//   title: "Click2Call Button",
//   description: "Floating click-to-call widget",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isEmbed = pathname === "/embed";

  return (
    <html lang="en" className={cn(isEmbed && "bg-transparent")}>
      <head>
        <title>Contact Widget</title>
        <meta name="description" content="Floating contact widget" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          "font-body antialiased",
          isEmbed && "bg-transparent"
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
