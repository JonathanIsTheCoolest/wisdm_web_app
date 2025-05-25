"use client";

// System Imports
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useAnimation, useMotionValue } from "motion/react";

// API/Database Imports
import { Comment } from "@/types";
import { useAppDispatch } from "@/redux_lib/hooks";
import { apiHTTPWrapper } from "@/redux_lib/features/authSlice";

// Component Imports
import CommentCard from "@/app/_components/cards/CommentCard";
import ExploreCard from "@/app/_components/cards/ExploreCard";
import LoadingSpinner from "@/app/_components/loading/LoadingSpinner";
import InstructionOverlay from "@/app/_components/overlay/InstructionOverlay";
import { useSidebar } from "@/app/(pages)/dashboard/layout";
import SearchBar from "@/app/_components/navigation/SearchBar";

// Stylesheet Imports
import styles from "@/app/(pages)/dashboard/explore/Explore.module.scss";

// Asset Imports
import featuredImage1 from "@/assets/images/explore_feed_1.png";
import featuredImage2 from "@/assets/images/explore_feed_2.png";
import featuredImage3 from "@/assets/images/explore_feed_3.png";
import featuredImage4 from "@/assets/images/explore_feed_4.png";
import featuredImage5 from "@/assets/images/explore_feed_5.png";
import featuredImage6 from "@/assets/images/explore_feed_6.png";
import settingsIcon from "@/assets/icons/gear.svg";
import questionIcon from "@/assets/icons/questionmark.svg";

// Custom Hooks
import { useLoadingState } from "@/hooks/useLoadingState";

const Explore = () => {
  const dispatch = useAppDispatch();
  const featuredTimelines = [
    { id: 1, image: featuredImage1, title: "Timeline 1" },
    { id: 2, image: featuredImage2, title: "Timeline 2" },
    { id: 3, image: featuredImage3, title: "Timeline 3" },
    { id: 4, image: featuredImage4, title: "Timeline 4" },
    { id: 5, image: featuredImage5, title: "Timeline 5" },
    { id: 6, image: featuredImage6, title: "Timeline 6" },
  ];

  const carouselItems = [...featuredTimelines, ...featuredTimelines];

  const [carouselWidth, setCarouselWidth] = useState(0);
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const controls = useAnimation();

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [overlayTriggerPosition, setOverlayTriggerPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [trendingComments, setTrendingComments] = useState<Comment[]>([]);
  const { isLoading, setLoaded } = useLoadingState(["trending", "featured"]);
  const { openSidebar } = useSidebar();
  const toggleOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isOverlayVisible) {
      setOverlayTriggerPosition({ x: e.clientX, y: e.clientY });
    }
    setIsOverlayVisible(!isOverlayVisible);
  };

  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const xRef = useRef(0);

  useEffect(() => {
    const fetchTrendingComments = async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
        const response = await dispatch(
          apiHTTPWrapper({
            url: `${API_BASE_URL}/comments/get_trending`,
            options: { method: "GET" },
          })
        );
        if (response.payload?.comments) {
          setTrendingComments(response.payload.comments);
        }
      } catch (error) {
        console.error("Error fetching trending comments:", error);
      } finally {
        setLoaded("trending");
      }
    };

    fetchTrendingComments();
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      setLoaded("featured");
    }, 1000);
  }, []);

  useEffect(() => {
    if (containerRef) {
      setCarouselWidth(containerRef.scrollWidth / 2);
    }
  }, [containerRef, featuredTimelines.length]);

  useEffect(() => {
    let animationFrame: number;
    function animate() {
      if (!isDragging && carouselWidth > 0) {
        const speed = 0.5;
        let nextX = x.get() - speed;
        if (Math.abs(nextX) >= carouselWidth) {
          nextX = 0;
        }
        x.set(nextX);
        xRef.current = nextX;
      }
      animationFrame = requestAnimationFrame(animate);
    }
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [carouselWidth, isDragging, x]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    // After drag, sync xRef to the current x value
    let currentX = x.get();
    if (Math.abs(currentX) >= carouselWidth) {
      currentX = currentX % carouselWidth;
      x.set(currentX);
    }
    xRef.current = currentX;
    setIsDragging(false);
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageTitle}>
        <h1>Explore</h1>
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
            <Image src={settingsIcon} alt="Settings" />
          </div>
        </div>
      </header>
      <InstructionOverlay
        isVisible={isOverlayVisible}
        onClose={() => setIsOverlayVisible(false)}
        triggerPosition={overlayTriggerPosition}
      />
      <SearchBar />
      <section className={styles.pageWrapper}>
        <div className={styles.sectionTitle}>
          <h2>Featured 🔍</h2>
          <a href="#" className={styles.seeAll}>
            SEE ALL
          </a>
        </div>
        <div className={styles.exploreFeedContainer}>
          {isLoading ? (
            <div className={styles.spinnerWrapper}>
              <LoadingSpinner />
            </div>
          ) : (
            <motion.div
              className={styles.exploreFeed}
              ref={setContainerRef}
              drag="x"
              dragConstraints={{ left: -carouselWidth, right: 0 }}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              style={{ x, cursor: isDragging ? "grabbing" : "grab" }}
            >
              {carouselItems.map((item, index) => (
                <ExploreCard
                  key={`carousel-${index}`}
                  image={item.image}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </div>
      </section>
      <div className={styles.sectionTitle}>
        <h2>Weekly Words of Wisdm 💬</h2>
      </div>
      <section className={styles.pageWrapper}>
        {isLoading ? (
          <div className={styles.spinnerWrapper}>
            <LoadingSpinner />
          </div>
        ) : trendingComments.length > 0 ? (
          trendingComments.map((comment) => {
            const {
              id,
              body,
              username,
              created_at,
              vote_count,
              comment_count,
              user_photo_url,
              timeline_title,
            } = comment;

            const timeDiff = created_at
              ? Math.floor(
                  (Date.now() - new Date(created_at).getTime()) /
                    (1000 * 60 * 60 * 24)
                )
              : 0;
            const timeString = `${timeDiff}d ago`;

            return (
              <CommentCard
                key={id}
                content={body}
                username={username}
                avatar={user_photo_url || ""}
                time={timeString}
                upvotes={vote_count || 0}
                comments={comment_count || 0}
                timeline_title={timeline_title}
              />
            );
          })
        ) : (
          <div className={styles.emptyStateMessage}>
            Nothing interesting has been happening this last week :(
          </div>
        )}
      </section>
    </div>
  );
};

export default Explore;
