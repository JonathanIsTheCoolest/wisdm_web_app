import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/styles/variables.scss';
import '../../styles/globals.scss';
import '../../styles/main.scss';
import styles from '@/styles/page.module.scss'
import StoreProvider from "./StoreProvider";
import { ThemeProvider } from '@/app/_contexts/ThemeContext';

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
      <body className={inter.className}>
        <main className={styles.main}>
          <StoreProvider>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </StoreProvider>
        </main>
      </body>
    </html>
  );
}