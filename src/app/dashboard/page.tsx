'use client'

import { useState, useEffect } from "react";
import styles from "@/styles/Home.module.scss";
import Image from "next/image";
import searchIcon from "@/assets/icons/search.svg";
import gearIcon from "@/assets/icons/gear.svg";
import homeTestImg from "@/assets/images/home_test_img.png";
import homeTestImg2 from "@/assets/images/home_test_img_2.png";

const Home = () => {
  const [feedTitle, setFeedTitle] = useState("");

  useEffect(() => {
    const fetchFeedData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/api/timelines/get/timelines"
        );
        const data = await response.json();
        if (data.timelines && data.timelines.length > 0) {
          setFeedTitle(data.timelines[0].title);
        }
      } catch (error) {
        console.error("Error fetching timeline data:", error);
      }
    };

    fetchFeedData();
  }, []);

  const feedItems = [
    {
      title:
        "Garland defends Biden’s mental fitness and says he has ‘complete confidence’ in him",
      content:
        "Attorney General Merrick Garland told lawmakers on Tuesday that President Joe Biden has shown no signs of cognitive impairment while defending Biden’s ability to serve as commander in chief.",
      image: homeTestImg,
    },
    {
      title:
        "Amazon invests up to $4 Billion into OpenAI rival startup Anthropic",
      content:
        "Amazon completed its largest investment in an outside company ever, as it steps up its efforts in the AI race to compete with rivals including Microsoft. The tech giant made an additional $2.75 billion investment in Anthropic, adding to the initial $1.25 billion it piled into the company last year.",
      image: homeTestImg2,
    },
    {
      title: "Feed Item 3",
      content: "This is the content for feed item 3.",
      image: homeTestImg,
    },
    // Add more feed items as needed
  ];

  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>For You</h1>
        <div className={styles.settingsIcon} onClick={() => console.log('toggleSidebar')}>
          <Image src={gearIcon} alt="Settings" />
        </div>
      </header>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Search" />
        <div className={styles.searchIcon}>
          <Image src={searchIcon} alt="Search" />
        </div>
      </div>
      <div className={styles.sectionHeader}>
        <h2>Domestic Politics 🇺🇸</h2>
      </div>
      <section className={styles.feedSection}>
        {feedItems.map((item, index) => (
          <div key={index} className={styles.feedItem}>
            <div
              className={styles.feedImage}
              style={{ backgroundImage: `url(${item.image.src})` }}
            ></div>
            <div className={styles.feedContent}>
              <h3>{item.title}</h3>
              <p>{item.content}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;