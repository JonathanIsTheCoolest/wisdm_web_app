// System Imports
import type { Metadata } from "next";

// API/Database Imports
import { ThemeProvider } from "@/app/_contexts/ThemeContext";
import AuthWrapper from "./_components/auth/AuthWrapper";

// Component Imports
import StoreProvider from "./StoreProvider";
import AuthWrapper from "./_components/auth/AuthWrapper";

// Stylesheet Imports
import "../../styles/variables.scss";
import "../../styles/globals.scss";
import "../../styles/main.scss";
import styles from "@/app/page.module.scss";

export const dynamic = "force-dynamic";

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
      <body>
        <main className={styles.main}>
          <StoreProvider>
            <ThemeProvider>
              <AuthWrapper>{children}</AuthWrapper>
            </ThemeProvider>
          </StoreProvider>
        </main>
      </body>
    </html>
  );
}
