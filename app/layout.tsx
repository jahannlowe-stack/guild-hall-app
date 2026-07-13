import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Guild Hall",
  description: "A between-session companion app for the D&D peer support program.",
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