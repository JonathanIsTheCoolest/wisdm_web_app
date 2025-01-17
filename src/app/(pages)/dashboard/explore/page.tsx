"use client";

// System Imports
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

// API/Database Imports
import placeholderData from "@/assets/placeholderData.json";

// Component Imports
import CommentCard from "@/app/_components/cards/CommentCard";
import ExploreCard from "@/app/_components/cards/ExploreCard";

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
import InstructionOverlay from "@/app/_components/overlay/InstructionOverlay";

const Explore = () => {
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
  const toggleOverlay = () => setIsOverlayVisible(!isOverlayVisible);

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
          <div className={styles.exploreFeed}>
            {scrollImages.map((image, index) => (
              <ExploreCard
                key={`scroll-${index}`}
                image={image}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      <div className={styles.sectionTitle}>
        <h2>Weekly Words of Wisdom 💬</h2>
      </div>
      <section className={styles.pageWrapper}>
        {placeholderData.comments.map((comment, index) => (
          <CommentCard
            key={index}
            topic={comment.topic}
            username={comment.username}
            time={comment.time}
            tag={comment.tag}
            tagClassName={comment.tagClassName}
            content={comment.content}
            upvotes={comment.upvotes}
            comments={comment.comments}
          />
        ))}
      </section>
    </div>
  );
};

export default Explore;
