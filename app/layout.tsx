import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "6.AM",
  description: "MOVEMENT, NOT A MOMENT.",
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
