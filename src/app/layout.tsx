import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../../styles/main.scss';

const inter = Inter({ subsets: ["latin"] });

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Wisdm Web App",
  description: "Social media/news app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}