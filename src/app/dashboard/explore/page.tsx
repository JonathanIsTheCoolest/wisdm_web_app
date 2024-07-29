"use client";

import React, { useState } from "react";
import CommentCard from "@/app/_components/comments/comment.tsx";
import styles from "@/styles/dashboard/explore/Explore.module.scss";
import Image from "next/image";
import searchIcon from "@/assets/icons/search.svg";
import settingsIcon from "@/assets/icons/gear.svg";
import questionIcon from "@/assets/icons/questionmark.svg";

import placeholderData from "@/assets/placeholderData.json";

import featuredImage1 from "@/assets/images/home_test_img.png";
import featuredImage2 from "@/assets/images/home_test_img.png";

const { comments, savedTopics, wordsOfWisdom } = placeholderData;

const Explore = () => {
  const images = [featuredImage1, featuredImage2];

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
          >
            <Image src={settingsIcon} alt="Settings" />
          </div>
        </div>
      </header>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Search" />
        <div className={styles.searchIcon}>
          <Image src={searchIcon} alt="Search" />
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
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </section>
      <div className={styles.sectionHeader}>
        <h2>Weekly Words of Wisdom 💬</h2>
      </div>
      <section className={styles.wordsOfWisdomWrapper}>
        {comments.map((comment, index) => (
          <CommentCard
            key={index}
            topic={comment.topic}
            username={comment.username}
            time={comment.time}
            tag={comment.tag}
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
