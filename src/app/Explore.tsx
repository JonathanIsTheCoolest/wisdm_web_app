import React, { useState } from "react";
import styles from "../styles/Explore.module.scss";
import NavigationBar from "./NavigationBar";
import Sidebar from "./Sidebar";
import Image from "next/image";
import searchIcon from "../assets/icons/search.svg";
import settingsIcon from "../assets/icons/gear.svg";
import featuredImage1 from "../assets/images/home_test_img.png";
import featuredImage2 from "../assets/images/home_test_img.png";

const Explore = () => {
  const images = [featuredImage1, featuredImage2];
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const comments = [
    {
      topic: "Ukraine War",
      username: "not_a_b0t_650",
      time: "23h",
      tag: "Equality Evangelist",
      content:
        "So from my point of view this is trash. These people don’t deserve anything at all and are the lowest form of life.",
      upvotes: 18294,
      comments: 489,
    },
    {
      topic: "Ukraine War",
      username: "justice_teacher",
      time: "4h",
      tag: "Justice Juggernaut",
      content:
        "I believe that that’s a little brash and maybe we should consider the broader context.",
      upvotes: 10294,
      comments: 289,
    },
    {
      topic: "Transgender Rights",
      username: "trans_ally_123",
      time: "1d",
      tag: "Ally Advocate",
      content:
        "Trans rights are human rights. We need to support our transgender friends and family.",
      upvotes: 15294,
      comments: 189,
    },
    {
      topic: "Transgender Rights",
      username: "freedom_fighter",
      time: "2d",
      tag: "Freedom Fighter",
      content:
        "Everyone deserves to live their truth without fear of discrimination.",
      upvotes: 20294,
      comments: 389,
    },
    {
      topic: "Ukraine War",
      username: "peace_lover",
      time: "3d",
      tag: "Peace Advocate",
      content:
        "War is never the answer. We need to find peaceful solutions to our conflicts.",
      upvotes: 11294,
      comments: 189,
    },
  ];

  return (
    <div className={styles.exploreContainer}>
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>Explore</h1>
        <div className={styles.settingsIcon} onClick={toggleSidebar}>
          <Image src={settingsIcon} alt="Settings" />
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
          <div key={index} className={styles.post}>
            <p className={styles.topic}>{comment.topic}</p>

            <div className={styles.postContent}>
              <div className={styles.userWrapper}>
                <div className={styles.username}>
                  <div className={styles.userIcon}></div>
                  <span>{comment.username}</span>
                  <span className={styles.time}>•</span>
                  <span className={styles.time}>{comment.time}</span>
                </div>
                <div className={styles.tag}>{comment.tag}</div>
              </div>

              <p>{comment.content}</p>
            </div>

            <div className={styles.postFooter}>
              <div className={styles.upvotes}>
                👍 <span>{comment.upvotes}</span> 👎
              </div>
              <div className={styles.comments}>
                💬 <span>{comment.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </section>
      <NavigationBar />
      <Sidebar isActive={showSidebar} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Explore;
