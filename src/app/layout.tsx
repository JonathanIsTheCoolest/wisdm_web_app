// System Imports
import type { Metadata } from "next";

// API/Database Imports
import { ThemeProvider } from "@/app/_contexts/ThemeContext";

// Component Imports
import StoreProvider from "./StoreProvider";
import AuthWrapper from "./_components/auth/AuthWrapper";

// Stylesheet Imports
import "@/styles/globals.scss";
import "@/styles/main.scss";

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
        <main>
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
