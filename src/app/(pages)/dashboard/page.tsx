"use client";

// System Imports
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

// API/Database Imports
import { useAppSelector } from "@/redux_lib/hooks";
import { Timeline } from "@/types";

// Component Imports
import ThemeToggle from "@/app/_components/buttons/ThemeToggle";
import TimelineCard from "@/app/_components/cards/TimelineCard";
import LoadingSpinner from "@/app/_components/loading/LoadingSpinner";
import InstructionOverlay from "@/app/_components/overlay/InstructionOverlay";
import SearchBar from "@/app/_components/navigation/SearchBar";
import { useSidebar } from "@/app/(pages)/dashboard/layout";

// Stylesheet Imports
import styles from "@/app/(pages)/dashboard/Home.module.scss";

// Asset Imports
import gearIcon from "@/assets/icons/gear.svg";
import questionIcon from "@/assets/icons/questionmark.svg";

const Home = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

  const idToken = useAppSelector((state: any) => state.auth.idToken);
  const { openSidebar } = useSidebar();

  const [timelines, setTimelines] = useState<Timeline[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [overlayTriggerPosition, setOverlayTriggerPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const toggleOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isOverlayVisible) {
      setOverlayTriggerPosition({
        x: e.clientX,
        y: e.clientY,
      });
    }
    setIsOverlayVisible(!isOverlayVisible);
  };

  useEffect(() => {
    fetchFeed();
  }, [idToken]);

  const fetchFeed = async () => {
    try {
      if (!idToken) {
        console.error("User not authenticated");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/timelines/get/timelines`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
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
      <header className={styles.pageTitle}>
        <h1>For You</h1>
        <div className={styles.iconContainer}>
          <div
            className={styles.questionIcon}
            onClick={toggleOverlay}
            role="button"
            aria-label="Help"
          >
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
      <InstructionOverlay
        isVisible={isOverlayVisible}
        onClose={() => setIsOverlayVisible(false)}
        triggerPosition={overlayTriggerPosition}
      />
      <SearchBar idToken={idToken} />

      <div className={styles.sectionTitle} style={{ marginBottom: "16px" }}>
        <Link href="/dashboard/placeholder-timeline">
          <button>View Placeholder Timeline</button>
        </Link>
      </div>

      <div className={styles.sectionTitle}>
        <h2>Domestic Politics 🇺🇸</h2>
      </div>
      <section className={styles.feedSection}>
        {timelines.length > 0 ? (
          timelines.map((timeline) => (
            <Link
              href={`/dashboard/timeline?timeline_id=${timeline.timeline_id}`}
              key={timeline.timeline_id}
            >
              <TimelineCard {...timeline} />
            </Link>
          ))
        ) : (
          <LoadingSpinner />
        )}
      </section>
    </div>
  );
};

export default Home;
