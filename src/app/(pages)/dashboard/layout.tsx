"use client";

// System Imports
import React, { ReactNode, useState, useEffect } from "react";
import { useAppSelector } from "@/src/lib/hooks";
import { RootState } from "@/src/lib/store";
import { usePathname } from "next/navigation";

// API/Database Imports
import { socket, handleSocketConnection, handleRoomConnection, handleSocketCleanup } from "@/src/app/_lib/socket";

// Component Imports
import NavigationBar from "@/src/app/_components/navigation/NavigationBar";
import Sidebar from "@/src/app/_components/navigation/Sidebar";
// import styles from "@/styles/page.module.scss";
import withAuth from "@/src/app/_components/auth/withAuth";

// Stylesheet Imports
import styles from "@/app/page.module.scss";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const pathname: any = usePathname();

  const user = useAppSelector((state: RootState) => state.user)

  useEffect(() => {
    const cleanup = handleSocketCleanup(handleSocketConnection);
    return () => {
      cleanup();
    };
  }, []);

  useEffect(() => {
    let cleanup: () => any | void = () => null;
    if (socket.connected && user.currentChannel) {
      handleRoomConnection(user.currentChannel)
      cleanup = () => handleSocketCleanup(() => handleRoomConnection(user.currentChannel ?? ''))
    }
    return () => {
      cleanup();
    }
  }, [user.currentChannel, socket.connected])

  const shouldShowNavBar = !pathname.includes("/timeline");

  return (
    <div className={styles.onboardingWrapper}>
      {children}
      {shouldShowNavBar && <NavigationBar />}
      <Sidebar isOpen={showSidebar} onClose={toggleSidebar} />
    </div>
  );
};

export default withAuth(Layout);
