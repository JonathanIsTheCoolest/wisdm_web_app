// src/app/layout.tsx
"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { usePathname, useRouter } from "next/navigation";

// ✅ Import WebSocket Context Provider & Hook
import { WebSocketProvider, useWebSocket } from "@/app/_lib/socket/socket";

// Component Imports
import NavigationBar from "@/app/_components/navigation/NavigationBar";
import Sidebar from "@/app/_components/navigation/Sidebar";
import withAuth from "@/app/_components/auth/withAuth";
import PageTransition from "@/app/_components/transitions/PageTransition";

import styles from "@/app/page.module.scss";

const routes = ["home", "explore", "profile", "vote", "notifications"];

interface LayoutProps {
  children: ReactNode;
}

const LayoutComponent: React.FC<LayoutProps> = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const pathname = usePathname();
  const router = useRouter();
  const user = useAppSelector((state: RootState) => state.user);
  const { isConnected, joinRoom, leaveRoom } = useWebSocket();

  useEffect(() => {
    if (!isConnected || !user.current_channel) return;

    console.log("✅ WebSocket connected. Joining room:", user.current_channel);
    joinRoom(user.current_channel);

    return () => {
      console.log("🏁 Cleaning up. Leaving room:", user.current_channel);
      if (!user.current_channel) return
      leaveRoom(user.current_channel);
    };
  }, [isConnected, user.current_channel]);

  useEffect(() => {
    routes.forEach((route) => {
      const path = `/dashboard/${route === "home" ? "" : route}`;
      router.prefetch(path);
    });
  }, [router]);

  const shouldShowNavBar = !pathname?.includes("/timeline");

  return (
    <div className={styles.onboardingWrapper}>
      <PageTransition>{children}</PageTransition>
      {shouldShowNavBar && <NavigationBar />}
      <Sidebar isOpen={showSidebar} onClose={toggleSidebar} />
    </div>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <WebSocketProvider>
      <LayoutComponent>{children}</LayoutComponent>
    </WebSocketProvider>
  );
};

export default withAuth(Layout);