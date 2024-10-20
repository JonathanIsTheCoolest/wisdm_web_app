"use client";

// System Imports
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import Image from "next/image";

// API/Database Imports
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { handleSocketCleanup, socket, handleRoomConnection } from '@/app/_lib/socket';
import { onSignOut } from "@/app/_lib/firebase/auth/auth_sign_out";
import { getUser } from "@/app/_lib/actions";
import { setUser } from "@/lib/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

// Component Imports
import ThemeToggle from "@/app/_components/buttons/ThemeToggle";
import Sidebar from "@/app/_components/navigation/Sidebar";

// Stylesheet Imports
import styles from "@/app/pages/dashboard/Home.module.scss";

// Asset Imports
import searchIcon from "@/assets/icons/search.svg";
import gearIcon from "@/assets/icons/gear.svg";
import questionIcon from "@/assets/icons/questionmark.svg";
import homeTestImg from "@/assets/images/home_test_img.png";

interface Timeline {
  timeline_id: string;
  title: string;
}

const Home = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL || 'http://127.0.0.1:5000';
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const [timelines, setTimelines] = useState<Timeline[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let cleanup: () => any | void = () => null;
    if (socket.connected && user.userName) {
      handleRoomConnection(user.userName)
      cleanup = () => handleSocketCleanup(() => handleRoomConnection(user.userName))
    }
    return () => {
      cleanup();
    }
  }, [user.userName, socket.connected])

  useEffect(() => {
    if (isAuthenticated) {
      fetchFeed();
    }
  }, [isAuthenticated]);

  const fetchFeed = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.error("User not authenticated");
        return;
      }

      const idToken = await user.getIdToken();

      const response = await fetch(`${API_BASE_URL}/api/timelines/get/timelines`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTimelines(data.timelines);
      setError(null);
    } catch (error) {
      console.error("Error fetching timelines:", error);
      setError("Failed to fetch timelines. Please try again later.");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <button onClick={onSignOut}>Sign Out</button>
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
            <Link href={`/pages/dashboard/timeline?timeline_id=${timeline.timeline_id}`} key={timeline.timeline_id}>
              <div className={styles.feedItem}>
                <div
                  className={styles.feedImage}
                  style={{ backgroundImage: `url(${homeTestImg})` }}
                  aria-label={`Feed Image for ${timeline.title}`}
                ></div>
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
