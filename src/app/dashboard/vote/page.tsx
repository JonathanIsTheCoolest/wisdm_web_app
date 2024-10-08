import React from "react";
import styles from "@/styles/dashboard/vote/Vote.module.scss";
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
    <div className={styles.voteContainer}>
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>Vote</h1>
        <p className={styles.headerText}>Vote on the hottest takes 🔥</p>
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