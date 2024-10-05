"use client";

import React from "react";
import dynamic from "next/dynamic";
import CommentCard from "@/app/_components/comments/CommentCard";
import styles from "@/styles/dashboard/explore/Explore.module.scss";
import Image from "next/image";
import searchIcon from "@/assets/icons/search.svg";
import settingsIcon from "@/assets/icons/gear.svg";
import questionIcon from "@/assets/icons/questionmark.svg";

import placeholderData from "@/assets/placeholderData.json";

import featuredImage1 from "@/assets/images/explore_feed_1.png";
import featuredImage2 from "@/assets/images/explore_feed_2.png";
import featuredImage3 from "@/assets/images/explore_feed_3.png";
import featuredImage4 from "@/assets/images/explore_feed_4.png";
import featuredImage5 from "@/assets/images/explore_feed_5.png";
import featuredImage6 from "@/assets/images/explore_feed_6.png";

const Explore = () => {
  const images = [
    featuredImage1,
    featuredImage2,
    featuredImage3,
    featuredImage4,
    featuredImage5,
    featuredImage6
  ];

  return (
    <div className={styles.exploreContainer}>
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>Explore</h1>
        <div className={styles.iconContainer}>
          <div className={styles.questionIcon}>
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
      <div className={styles.searchBar}>
        <input type="text" placeholder="Search" aria-label="Search" />
        <div className={styles.searchIcon}>
          <Image src={searchIcon} alt="Search Icon" />
        </div>
      </div>
      <section className={styles.featuredSection}>
        <div className={styles.sectionHeader}>
          <h2>Featured 🔍</h2>
          <a href="#" className={styles.seeAll}>
            SEE ALL
          </a>
        </div>
        <div className={styles.horizontalScroll}>
          {images.map((image, index) => (
            <div key={index} className={styles.scrollItem}>
              <Image
                src={image}
                alt={`Featured ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw,
                       (max-width: 1200px) 50vw,
                       33vw"
              />
            </div>
          ))}
        </div>
      </section>
      <div className={styles.sectionHeader}>
        <h2>Weekly Words of Wisdom 💬</h2>
      </div>
      <section className={styles.wordsOfWisdomWrapper}>
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