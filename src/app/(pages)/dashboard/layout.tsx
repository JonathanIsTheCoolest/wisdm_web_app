// src/app/layout.tsx
"use client";

import React, { ReactNode, useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";

// WebSocket Context Provider & Hook
import { WebSocketProvider, useWebSocket, socket } from "@/app/_lib/socket/socket";
import { updateNotificationState } from "@/redux_lib/features/notificationsSlice";

// Redux
import { useAppSelector, useAppDispatch } from "@/redux_lib/hooks";
import { RootState } from "@/redux_lib/store";
import { apiHTTPWrapper } from "@/redux_lib/features/authSlice";
import { setNotificationState } from "@/redux_lib/features/notificationsSlice";

// Component Imports
import NavigationBar from "@/app/_components/navigation/NavigationBar";
import Sidebar from "@/app/_components/navigation/Sidebar";
import withAuth from "@/app/_components/auth/withAuth";

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
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getNotifications = async() => {
      try {
        const notificationResponse = await dispatch(
          apiHTTPWrapper({
            url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/notifications/get/notifications`
          })
        )

        if (notificationResponse.payload) {
          dispatch(setNotificationState(notificationResponse.payload.notifications))
        } else {
          console.log("You don't have any notifications")
        }
      } catch(error) {
        console.error(`There was an error fetching your notifications: ${error}`)
      }
    }

    getNotifications()
  }, [])

  useEffect(() => {
    socket.on("receive_notification_update", (response) => {
      const notification = response;

      dispatch(updateNotificationState(notification));
    });

    return () => {
      socket.off("receive_notification_update");
    };
  }, []);

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
      {/* <Suspense fallback={<LoadingSpinner />}> */}
      {children}
      {/* </Suspense> */}
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