// System Imports
import React from "react";

// Stylesheet Imports
import styles from "@/app/(pages)/dashboard/vote/Vote.module.scss";

// Asset Imports
import trumpImage from "@/assets/images/home_test_img.png";
import depressionImage from "@/assets/images/home_test_img_2.png";

const voteItems = [
  {
    image: trumpImage,
    title: "Donald Trump as a person?",
  },
  {
    image: depressionImage,
    title: "Depression isn’t real.",
  },
  // Add more vote items as needed
];

const Vote = () => {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageTitle}>
        <h1>Vote</h1>
      </header>
      {voteItems.map((item, index) => (
        <div key={index} className={styles.voteItem}>
          <div className={styles.voteImage} style={{ backgroundImage: `url(${item.image.src})` }}></div>
          <div className={styles.voteContent}>
            <h3>{item.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Vote;