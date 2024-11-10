// System Imports
import React, { useState } from "react";
import Image from "next/image";

// API/Database Imports
import { User, SavedTopic, Wisdom, Comment } from "@/types";

// Component Imports
import ActivityCard from "@/app/_components/cards/ActivityCard";
import CommentCard from "@/app/_components/cards/CommentCard";
import TopicCard from "@/app/_components/cards/TopicCard";
import Quadrant from "@/app/_components/graph/Quadrant";

// Stylesheet Imports
import styles from "@/app/_components/profile/ProfileTabs.module.scss";

// CommentsTab Component
const CommentsTab: React.FC<{ comments: Comment[] }> = ({ comments }) => {
  return (
    <div className={styles.pageWrapper}>
      {comments.map((comment, index) => (
        <ActivityCard key={index} {...comment} />
      ))}
    </div>
  );
};

// QuadrantTab Component
const QuadrantTab: React.FC<{
  quadrantData: { xValue: number; yValue: number };
}> = ({ quadrantData }) => {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.quadrantContainer}>
        <Quadrant xValue={quadrantData.xValue} yValue={quadrantData.yValue} />
      </div>
    </div>
  );
};

// SavedTopicsTab Component
const SavedTopicsTab: React.FC<{ topics: SavedTopic[] }> = ({ topics }) => {
  return (
    <div className={styles.pageWrapper}>
      {topics.map((topic, index) => (
        <TopicCard key={index} {...topic} />
      ))}
    </div>
  );
};

// WordsOfWisdmTab Component
const WordsOfWisdmTab: React.FC<{ wisdmList: Wisdom[] }> = ({ wisdmList }) => {
  return (
    <div className={styles.pageWrapper}>
      {wisdmList.map((wisdm, index) => (
        <CommentCard key={index} {...wisdm} />
      ))}
    </div>
  );
};

// Main ProfileTabs Component
interface ProfileTabsProps {
  comments: Comment[];
  savedTopics: SavedTopic[];
  wisdmList: Wisdom[];
  quadrantData: {
    xValue: number;
    yValue: number;
  };
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

// Create a separate content component
const ProfileTabsContent: React.FC<ProfileTabsContentProps> = ({
  activeTab,
  comments,
  savedTopics,
  wisdmList,
  quadrantData,
}) => {
  return (
    <div className={styles.tabContent}>
      {activeTab === "comments" && <CommentsTab comments={comments} />}
      {activeTab === "quadrant" && <QuadrantTab quadrantData={quadrantData} />}
      {activeTab === "savedTopics" && <SavedTopicsTab topics={savedTopics} />}
      {activeTab === "wordsOfWisdm" && (
        <WordsOfWisdmTab wisdmList={wisdmList} />
      )}
    </div>
  );
};

// Split the ProfileTabs component into two parts: tabs and content
const ProfileTabs: React.FC<ProfileTabsProps> & {
  Content: React.FC<ProfileTabsContentProps>;
} = ({
  comments,
  savedTopics,
  wisdmList,
  quadrantData,
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className={styles.tabContainer}>
      <div
        className={`${styles.tabItem} ${
          activeTab === "comments" ? styles.activeTab : ""
        }`}
        onClick={() => setActiveTab("comments")}
      >
        Comments
      </div>
      <div
        className={`${styles.tabItem} ${
          activeTab === "quadrant" ? styles.activeTab : ""
        }`}
        onClick={() => setActiveTab("quadrant")}
      >
        Quadrant
      </div>
      <div
        className={`${styles.tabItem} ${
          activeTab === "savedTopics" ? styles.activeTab : ""
        }`}
        onClick={() => setActiveTab("savedTopics")}
      >
        Saved Topics
      </div>
      <div
        className={`${styles.tabItem} ${
          activeTab === "wordsOfWisdm" ? styles.activeTab : ""
        }`}
        onClick={() => setActiveTab("wordsOfWisdm")}
      >
        Words of Wisdm
      </div>
    </div>
  );
};

ProfileTabs.Content = ProfileTabsContent;

export default ProfileTabs;
