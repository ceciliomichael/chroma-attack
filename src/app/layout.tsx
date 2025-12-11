import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chroma Panic - Don't Panic It's Organic",
  description: "A fast-paced reaction game testing your ability to resist the Stroop Effect. Click the correct color before time runs out!",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
