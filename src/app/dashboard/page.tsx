"use client";

import { useState, useEffect } from "react";
import styles from "@/styles/dashboard/Home.module.scss";
import { handleSocketCleanup, socket, handleRoomConnection } from "../_lib/socket";
import Image from "next/image";
import searchIcon from "@/assets/icons/search.svg";
import gearIcon from "@/assets/icons/gear.svg";
import questionIcon from "@/assets/icons/questionmark.svg";
import homeTestImg from "@/assets/images/home_test_img.png";
import { onSignOut } from "../_lib/firebase/auth/auth_sign_out";

import { getUser } from "@/app/_lib/actions";
import ThemeToggle from "@/app/_components/buttons/ThemeToggle";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setUser } from "@/lib/features/userSlice";
import Link from 'next/link';

interface FeedItem {
  timeline_id: string;
  title: string;
}

const Home = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);

  useEffect(() => {
    // const fetchUser = async () => {
    //   const userData = await getUser();
    //   dispatch(setUser(userData));
    // };

    // fetchUser();
  }, [dispatch]);

  useEffect(() => {
    let cleanup: () => any | void = () => null;
    if (socket.connected && user.userName) {
      handleRoomConnection(user.userName)
      cleanup = () => handleSocketCleanup(() => handleRoomConnection(user.userName))
    }
    return () => {
      cleanup();
    }
  }, [user.userName, socket.connected])

  // useEffect(() => {
  //   const fetchFeed = async () => {
  //     try {
  //       const response = await fetch(`${process.env.BASE_API_URL_DEV}/feed`);
  //       const data = await response.json();
  //       setFeedItems(data.feed);
  //     } catch (error) {
  //       console.error("Error fetching feed items:", error);
  //     }
  //   };

  //   fetchFeed();
  // }, []);

  return (
    <div className={styles.homeContainer}>
      <button onClick={onSignOut}>Sign Out</button>
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>For You</h1>
        <div className={styles.iconContainer}>
          <ThemeToggle />
          <div className={styles.questionIcon}>
            <Image src={questionIcon} alt="Question" />
          </div>
          <div
            className={styles.settingsIcon}
            onClick={() => console.log("toggleSidebar")}
            role="button"
            aria-label="Settings"
          >
            <Image src={gearIcon} alt="Settings" />
          </div>
        </div>
      </header>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Search" aria-label="Search" />
        <div className={styles.searchIcon}>
          <Image src={searchIcon} alt="Search Icon" />
        </div>
      </div>
      <div className={styles.sectionHeader}>
        <h2>Domestic Politics 🇺🇸</h2>
      </div>
      <section className={styles.feedSection}>
        {feedItems.length > 0 ? feedItems.map((item) => (
          <Link href={`/dashboard/timeline?timeline_id=${item.timeline_id}`} key={item.timeline_id}>
            <div className={styles.feedItem}>
              <div
                className={styles.feedImage}
                style={{ backgroundImage: `url(${homeTestImg})` }}
                aria-label={`Feed Image for ${item.title}`}
              ></div>
              <div className={styles.feedContent}>
                <h3>{item.title}</h3>
                <p>Timeline ID: {item.timeline_id}</p>
              </div>
            </div>
          </Link>
        )) : (
          <p>No feed items available</p>
        )}
      </section>
    </div>
  );
};

export default Home;