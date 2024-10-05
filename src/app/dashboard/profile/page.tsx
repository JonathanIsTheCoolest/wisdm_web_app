"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import styles from "@/styles/dashboard/profile/Profile.module.scss";
import placeholderData from "@/assets/placeholderData.json";
import ProfileHeader from "@/app/_components/profile/ProfileHeader";
import CommentsTab from "@/app/_components/profile/CommentsTab";
import QuadrantTab from "@/app/_components/profile/QuadrantTab";
import SavedTopicsTab from "@/app/_components/profile/SavedTopicsTab";
import WordsOfWisdmTab from "@/app/_components/profile/WordsofWisdmTab";

const Profile: React.FC = () => {
  const { savedTopics, wordsOfWisdom, comments, user } = placeholderData;
  const [activeTab, setActiveTab] = useState<string>("Saved Topics");

  const tabs = ["Saved Topics", "Words", "Comments", "Quadrant"];

  const handleTabClick = (tab: string): void => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.profileContainer}>
      {/* Top section with user info */}
      <ProfileHeader user={user} />

      {/* Tabs */}
      <div className={styles.tabsContainer}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === "Saved Topics" && <SavedTopicsTab topics={savedTopics} />}
        {activeTab === "Words" && <WordsOfWisdmTab wisdmList={wordsOfWisdom} />}
        {activeTab === "Comments" && <CommentsTab comments={comments} />}
        {activeTab === "Quadrant" && <QuadrantTab />}
      </div>
    </div>
  );
};

export default Profile;