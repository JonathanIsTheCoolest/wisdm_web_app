"use client";

// System Imports
import React, { ReactNode, useState, useEffect } from "react";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { usePathname, useRouter } from "next/navigation";
import { Suspense } from "react";

// API/Database Imports
import {
  socket,
  handleSocketConnection,
  handleRoomConnection,
  handleSocketCleanup,
} from "@/app/_lib/socket/socket";

// Component Imports
import NavigationBar from "@/app/_components/navigation/NavigationBar";
import Sidebar from "@/app/_components/navigation/Sidebar";
import withAuth from "@/app/_components/auth/withAuth";
import PageTransition from "@/app/_components/transitions/PageTransition";
// import LoadingSpinner from "@/app/_components/loading/LoadingSpinner"; STILL YET TO BE CREATED

// Stylesheet Imports
import styles from "@/app/page.module.scss";

// Preload all possible routes
const routes = ["home", "explore", "profile", "vote", "notifications"];

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const pathname = usePathname();
  const router = useRouter();

  const user = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    const cleanup = handleSocketCleanup(handleSocketConnection);
    return () => {
      cleanup();
    };
  }, []);

  useEffect(() => {
    let cleanup: () => any | void = () => null;
    if (socket.connected && user.current_channel) {
      handleRoomConnection(user.current_channel);
      cleanup = () =>
        handleSocketCleanup(() =>
          handleRoomConnection(user.current_channel ?? "")
        );
    }
    return () => {
      cleanup();
    };
  }, [user.current_channel, socket.connected]);

  useEffect(() => {
    routes.forEach((route) => {
      const path = `/dashboard/${route === "home" ? "" : route}`;
      router.prefetch(path);
    });
  }, [router]);

  const shouldShowNavBar = !pathname?.includes("/timeline");

  return (
    <div className={styles.onboardingWrapper}>
      {/* <Suspense fallback={<LoadingSpinner />}> */}
      <PageTransition>{children}</PageTransition>
      {/* </Suspense> */}
      {shouldShowNavBar && <NavigationBar />}
      <Sidebar isOpen={showSidebar} onClose={toggleSidebar} />
    </div>
  );
};

export default withAuth(Layout);
