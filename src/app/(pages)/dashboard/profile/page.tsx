"use client";

// System Imports
import React, { useState } from "react";
import Image from "next/image";

// API/Database Imports
import placeholderData from "@/assets/placeholderData.json";

// Component Imports
import ProfileTabs from "@/app/_components/profile/ProfileTabs";
import UserSettings from "@/app/_components/profile/UserSettings";

// Stylesheet Imports
import styles from "@/app/(pages)/dashboard/profile/Profile.module.scss";

// Asset Imports
import placeholderAvatar from "@/assets/icons/user_avatar.svg";
import arrowLeftBrand from "@/assets/icons/arrow_left_brand.svg";
import editIcon from "@/assets/icons/edit.svg";

const Profile: React.FC = () => {
  const { savedTopics, wordsOfWisdom, comments, user } = placeholderData;
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState("comments");

  const quadrantData = {
    xValue: 0.7,
    yValue: 0.6,
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  if (showSettings) {
    return <UserSettings user={user} onBack={toggleSettings} />;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageWrapper}>
        <header className={styles.pageTitle}>
          <h1>Profile</h1>
          <button className={styles.editButton} onClick={toggleSettings}>
            Edit
          </button>
        </header>
        <div className={styles.profileHeader}>
          <div className={styles.avatarSmall}>
            <Image
              src={placeholderAvatar}
              alt={`${user.username}'s avatar`}
              width={80}
              height={80}
            />
          </div>
          <div className={styles.userInfo}>
            <h2>Johnny Bravo</h2>
            <p>Joined 10/10/2024</p>
            <div className={styles.tagContainer}>
              <div
                className={`${styles.tagItem} ${styles.activeJusticeJuggernaut}`}
              >
                Justice Juggernaut
              </div>
              <div
                className={`${styles.tagItem} ${styles.activeDiplomacyDevotee}`}
              >
                Diplomacy Devotee
              </div>
            </div>
          </div>
        </div>
        <ProfileTabs
          comments={comments}
          savedTopics={savedTopics}
          wisdmList={wordsOfWisdom}
          quadrantData={quadrantData}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <div className={styles.scrollableContent}>
        <ProfileTabs.Content
          activeTab={activeTab}
          comments={comments}
          savedTopics={savedTopics}
          wisdmList={wordsOfWisdom}
          quadrantData={quadrantData}
        />
      </div>
    </div>
  );
};

export default Profile;
