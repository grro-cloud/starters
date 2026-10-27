import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js on Grro",
  description: "A Next.js starter running on Grro",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
