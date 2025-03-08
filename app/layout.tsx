import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProviderWrapper } from "@/components/thirdweb-provider-wrapper";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Space Puzzle Game",
  description: "A blockchain-based puzzle game with rewards and achievements",
  generator: "harystyles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
          storageKey="space-puzzle-theme"
        >
          <ThirdwebProviderWrapper>
            {children}
            <Toaster position="bottom-right" theme="light" />
          </ThirdwebProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";
