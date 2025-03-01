"use client";

// System Imports
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

// API/Database Imports
import { Comment } from "@/types";
import { useAppDispatch } from "@/redux_lib/hooks";
import { apiHTTPWrapper } from "@/redux_lib/features/authSlice";

// Component Imports
import CommentCard from "@/app/_components/cards/CommentCard";
import ExploreCard from "@/app/_components/cards/ExploreCard";
import LoadingSpinner from "@/app/_components/loading/LoadingSpinner";
import InstructionOverlay from "@/app/_components/overlay/InstructionOverlay";

// Stylesheet Imports
import styles from "@/app/(pages)/dashboard/explore/Explore.module.scss";

// Asset Imports
import featuredImage1 from "@/assets/images/explore_feed_1.png";
import featuredImage2 from "@/assets/images/explore_feed_2.png";
import featuredImage3 from "@/assets/images/explore_feed_3.png";
import featuredImage4 from "@/assets/images/explore_feed_4.png";
import featuredImage5 from "@/assets/images/explore_feed_5.png";
import featuredImage6 from "@/assets/images/explore_feed_6.png";
import searchIcon from "@/assets/icons/search.svg";
import settingsIcon from "@/assets/icons/gear.svg";
import questionIcon from "@/assets/icons/questionmark.svg";

// Custom Hooks
import { useLoadingState } from "@/hooks/useLoadingState";

const Explore = () => {
  const dispatch = useAppDispatch();
  const images = [
    featuredImage1,
    featuredImage2,
    featuredImage3,
    featuredImage4,
    featuredImage5,
    featuredImage6,
  ];

  const scrollImages = [...images, ...images];

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [trendingComments, setTrendingComments] = useState<Comment[]>([]);
  const { isLoading, setLoaded } = useLoadingState(["trending", "featured"]);

  const toggleOverlay = () => setIsOverlayVisible(!isOverlayVisible);

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

  // Simulate featured content loading
  useEffect(() => {
    setTimeout(() => {
      setLoaded("featured");
    }, 1000);
  }, []);

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
            onClick={() => console.log("toggleSidebar")}
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
      />
      <div className={styles.searchBar}>
        <input type="text" placeholder="Search" aria-label="Search" />
        <div className={styles.searchIcon}>
          <Image src={searchIcon} alt="Search Icon" />
        </div>
      </div>
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
            <div className={styles.exploreFeed}>
              {scrollImages.map((image, index) => (
                <ExploreCard
                  key={`scroll-${index}`}
                  image={image}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      <div className={styles.sectionTitle}>
        <h2>Weekly Words of Wisdom 💬</h2>
      </div>
      <section className={styles.pageWrapper}>
        {isLoading ? (
          <div className={styles.spinnerWrapper}>
            <LoadingSpinner />
          </div>
        ) : (
          trendingComments.map((comment) => {
            const {
              comment_id,
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

            // Convert the numeric time difference to a string format
            const timeString = `${timeDiff}d ago`;

            return (
              <CommentCard
                key={comment_id}
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
        )}
      </section>
    </div>
  );
};

export default Explore;
