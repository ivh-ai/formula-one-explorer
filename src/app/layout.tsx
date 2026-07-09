import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/app-providers";
import { ShellChrome } from "@/components/shell/shell-chrome";
import { SiteFooter } from "@/components/shell/site-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "F1 Explorer — Learn, Explore and Follow Formula One",
    template: "%s · F1 Explorer",
  },
  description:
    "The definitive destination for Formula One: an interactive course for newcomers, live timing and deep statistics for fans, and every season since 1950.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <AppProviders>
          <ShellChrome />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </AppProviders>
      </body>
    </html>
  );
}
