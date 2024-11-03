"use client";

// System Imports
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// API/Database Imports
import {
  handleSocketCleanup,
  socket,
  handleRoomConnection,
} from "@/app/_lib/socket";
import { onSignOut } from "@/app/_lib/firebase/auth/auth_sign_out";
import { useAppSelector } from "@/lib/hooks";

// Component Imports
import ThemeToggle from "@/app/_components/buttons/ThemeToggle";
import Sidebar from "@/app/_components/navigation/Sidebar";

// Stylesheet Imports
import styles from "@/app/(pages)/dashboard/Home.module.scss";

// Asset Imports
import searchIcon from "@/assets/icons/search.svg";
import gearIcon from "@/assets/icons/gear.svg";
import questionIcon from "@/assets/icons/questionmark.svg";
import timeline_1 from "@/assets/images/timeline_1.png";
import timeline_2 from "@/assets/images/timeline_2.png";
import timeline_3 from "@/assets/images/timeline_3.png";
import placeholderData from "@/assets/placeholderData.json";

const imageMap: { [key: string]: any } = {
  "timeline_1.png": timeline_1,
  "timeline_2.png": timeline_2,
  "timeline_3.png": timeline_3,
};

const Home = () => {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_BASE_API_URL || "http://127.0.0.1:5000";
  const user = useAppSelector((state: any) => state.user);
  const idToken = useAppSelector((state: any) => state.auth.idToken);

  const [timelines, setTimelines] = useState<Timeline[]>(
    placeholderData.timelines
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    let cleanup: () => any | void = () => null;
    if (socket.connected && user.userName) {
      handleRoomConnection(user.userName);
      cleanup = () =>
        handleSocketCleanup(() => handleRoomConnection(user.userName));
    }
    return () => {
      cleanup();
    };
  }, [user.userName, socket.connected]);

  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageTitle}>
        <h1>For You</h1>
        <div className={styles.iconContainer}>
          <ThemeToggle />
          <div className={styles.questionIcon}>
            <Image src={questionIcon} alt="Question" />
          </div>
          <div
            className={styles.settingsIcon}
            onClick={openSidebar}
            role="button"
            aria-label="Settings"
          >
            <Image src={gearIcon} alt="Settings" />
          </div>
        </div>
      </header>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Search" aria-label="Search" />
        <div className={styles.searchIcon}>
          <Image src={searchIcon} alt="Search Icon" />
        </div>
      </div>
      <div className={styles.sectionTitle}>
        <h2>Domestic Politics 🇺🇸</h2>
      </div>
      <section className={styles.feedSection}>
        {error ? (
          <p className={styles.errorMessage}>{error}</p>
        ) : timelines.length > 0 ? (
          timelines.map((timeline) => (
            <Link
              href={`/dashboard/timeline?timeline_id=${timeline.timeline_id}`}
              key={timeline.timeline_id}
            >
              <div className={styles.feedItem}>
                <div className={styles.feedImage}>
                  <Image
                    src={imageMap[timeline.image]}
                    alt={timeline.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className={styles.feedContent}>
                  <h3>{timeline.title}</h3>
                  <p>Timeline ID: {timeline.timeline_id}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No timelines available</p>
        )}
      </section>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </div>
  );
};

export default Home;
