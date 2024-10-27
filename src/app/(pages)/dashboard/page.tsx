"use client";

// System Imports
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import Image from "next/image";

// API/Database Imports
import { onSignOut } from "@/src/app/_lib/firebase/auth/auth_sign_out";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import { updateCurrentChannel } from "@/src/lib/features/userSlice";

// Component Imports
import ThemeToggle from "@/src/app/_components/buttons/ThemeToggle";
import Sidebar from "@/src/app/_components/navigation/Sidebar";

// Stylesheet Imports
import styles from "@/app/(pages)/dashboard/Home.module.scss";

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

  const idToken = useAppSelector((state: any) => state.auth.idToken)
  const dispatch = useAppDispatch()

  const [timelines, setTimelines] = useState<Timeline[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    fetchFeed()
  }, [idToken]);

  const fetchFeed = async () => {
    try {
      if (!idToken) {
        console.error("User not authenticated");
        return;
      }

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
            <Link 
              onClick={() => dispatch(updateCurrentChannel({ current_channel: timeline.timeline_id }))}
              href={`/dashboard/timeline?timeline_id=${timeline.timeline_id}`} 
              key={timeline.timeline_id}
            >
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
