"use client";

// System Imports
import React, { useState } from "react";
import Image from "next/image";

// API/Database Imports
import { User, SavedTopic, Wisdom, Comment } from '@/types';
import placeholderData from "@/assets/placeholderData.json";

// Component Imports
import ProfileTabs from "@/app/_components/profile/ProfileTabs";

// Stylesheet Imports
import styles from "@/app/(pages)/dashboard/profile/Profile.module.scss";

// Asset Imports
import placeholderAvatar from "@/assets/icons/user_avatar.svg";
import arrowLeftBrand from "@/assets/icons/arrow_left_brand.svg";
import editIcon from "@/assets/icons/edit.svg";

const Profile: React.FC = () => {
  const { savedTopics, wordsOfWisdom, comments, user } = placeholderData;
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  if (showSettings) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.backButton} onClick={toggleSettings}>
          <Image src={arrowLeftBrand} alt="Back" />
        </div>
        <header className={styles.pageTitle}>
          <h1>User Settings</h1>
        </header>
        <div className={styles.avatar}>
          <Image src={placeholderAvatar} alt={`${user.username}'s avatar`} width={80} height={80} />
        </div>
        <div className={styles.pageWrapper}>
          <label>Username</label>
          <input type="text" value={user.username} readOnly />
          <span className={styles.editIcon}>
            <Image src={editIcon} alt="edit icon" width={24} height={24} />
          </span>
        </div>
        <div className={styles.pageWrapper}>
          <label>Email</label>
          <input type="email" value={user.email} readOnly />
          <span className={styles.editIcon}>
            <Image src={editIcon} alt="edit icon" width={24} height={24} />
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageTitle}>
        <h1>Profile</h1>
        <button className={styles.editButton} onClick={toggleSettings}>
          Edit
        </button>
      </header>
      <div className={styles.profileHeader}>
        <div className={styles.avatar}>
          <Image src={placeholderAvatar} alt={`${user.username}'s avatar`} width={80} height={80} />
        </div>
        <div className={styles.userInfo}>
          <div className={styles.username}>Johnny Bravo</div>
          <div className={styles.joined}>Joined 10/10/2024</div>
          <div className={styles.tags}>
            <div className={`${styles.userTag} ${styles.activeJusticeJuggernaut}`}>
              Justice Juggernaut
            </div>
            <div className={`${styles.userTag} ${styles.activeDiplomacyDevotee}`}>
              Diplomacy Devotee
            </div>
          </div>
        </div>
      </div>
      <ProfileTabs 
        user={user}
        comments={comments}
        savedTopics={savedTopics}
        wisdmList={wordsOfWisdom}
      />
    </div>
  );
};

export default Profile;
