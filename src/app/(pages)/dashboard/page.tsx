"use client";

// System Imports
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

// API/Database Imports
import { useAppSelector } from "@/redux_lib/hooks";
import { Timeline } from "@/types";

// Component Imports
import TimelineCard from "@/app/_components/cards/TimelineCard";
import LoadingSpinner from "@/app/_components/loading/LoadingSpinner";
import InstructionOverlay from "@/app/_components/overlay/InstructionOverlay";
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

  // Helper function to fetch timelines by category
  async function fetchTimelinesByCategory(categoryId: string, idToken: string) {
    const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
    const response = await fetch(
      `${API_BASE_URL}/timelines/get/timelines_by_category?category_id=${categoryId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.timelines;
  }

  // --- CATEGORY SWIPE ARROWS ---
  // COMMENT OUT THIS SECTION
  // Mock categories for testing
  const categories = [
    {
      id: "c68e142e-2097-e9a5-c426-e005f21d64c9",
      title: "Domestic Politics ",
    },
    {
      id: "095e7a0f-8519-586c-b7a6-b0c298a280f4",
      title: "Entertainment ",
    },
    // {
    //   id: "mock-1",
    //   title: "World News ",
    // },
    // {
    //   id: "mock-2",
    //   title: "Technology ",
    // },
    // {
    //   id: "mock-3",
    //   title: "Sports ",
    // },
  ];
  // END COMMENT OUT THIS SECTION

  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);
  const selectedCategory = categories[selectedCategoryIdx];

  // Store all timelines for all categories
  const [allCategoryTimelines, setAllCategoryTimelines] = useState<{
    [key: string]: Timeline[];
  }>({});
  const [allCategoryErrors, setAllCategoryErrors] = useState<{
    [key: string]: string | null;
  }>({});
  const [allLoading, setAllLoading] = useState(true);

  // Fetch all timelines for all categories on mount or when idToken changes
  useEffect(() => {
    if (!idToken) return;
    setAllLoading(true);
    const fetchAll = async () => {
      const timelinesMap: { [key: string]: Timeline[] } = {};
      const errorsMap: { [key: string]: string | null } = {};
      await Promise.all(
        categories.map(async (cat) => {
          try {
            const timelines = await fetchTimelinesByCategory(cat.id, idToken);
            timelinesMap[cat.id] = timelines;
            errorsMap[cat.id] = null;
          } catch (e) {
            timelinesMap[cat.id] = [];
            errorsMap[cat.id] = "Failed to fetch category timelines.";
          }
        })
      );
      setAllCategoryTimelines(timelinesMap);
      setAllCategoryErrors(errorsMap);
      setAllLoading(false);
    };
    fetchAll();
  }, [idToken]);

  // Get timelines and error for selected category
  const categoryTimelines = allCategoryTimelines[selectedCategory.id] || [];
  const categoryError = allCategoryErrors[selectedCategory.id] || null;
  const categoryLoading = allLoading;

  // --- SWIPE DIRECTION STATE ---
  const [direction, setDirection] = useState(0);

  // Track if a drag occurred to prevent click navigation
  const isDragging = useRef(false);

  // Arrow navigation handlers (set direction)
  const goLeft = () => {
    setDirection(-1);
    setSelectedCategoryIdx((idx) => Math.max(0, idx - 1));
  };
  const goRight = () => {
    setDirection(1);
    setSelectedCategoryIdx((idx) => Math.min(categories.length - 1, idx + 1));
  };

  // Card swipe variants (no opacity, just x)
  const swipeVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? window.innerWidth : -window.innerWidth,
    }),
    center: { x: 0 },
    exit: (direction: number) => ({
      x: direction < 0 ? window.innerWidth : -window.innerWidth,
    }),
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
      <div className={styles.sectionTitle}>
        <h2>{selectedCategory.title}</h2>
      </div>

      <div className={styles.feedWrapper}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={selectedCategory.id}
            custom={direction}
            variants={swipeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className={styles.feedContainer}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={() => {
              isDragging.current = true;
            }}
            onDragEnd={(event, info) => {
              setTimeout(() => {
                isDragging.current = false;
              }, 0);
              if (
                info.offset.x < -100 &&
                selectedCategoryIdx < categories.length - 1
              ) {
                setDirection(1);
                setSelectedCategoryIdx(selectedCategoryIdx + 1);
              } else if (info.offset.x > 100 && selectedCategoryIdx > 0) {
                setDirection(-1);
                setSelectedCategoryIdx(selectedCategoryIdx - 1);
              }
            }}
            style={{ touchAction: "pan-y" }}
          >
            <section className={styles.feedSection}>
              {categoryLoading ? (
                <LoadingSpinner />
              ) : categoryError ? (
                <div>{categoryError}</div>
              ) : categoryTimelines.length ? (
                categoryTimelines.map((timeline) => (
                  <Link
                    href={`/dashboard/timeline?id=${timeline.id}`}
                    key={timeline.id}
                    onPointerDown={(e) => e.preventDefault()}
                    onClick={(e) => {
                      if (isDragging.current) {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                    }}
                  >
                    <TimelineCard {...timeline} />
                  </Link>
                ))
              ) : (
                <div>No timelines found for this category.</div>
              )}
            </section>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Home;
