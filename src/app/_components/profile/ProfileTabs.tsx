// System Imports
import React from "react";

// API/Database Imports
import { User, SavedTopic, Wisdm, Comment } from "@/types";

// Component Imports
import ActivityCard from "@/app/_components/cards/ActivityCard";
import CommentCard from "@/app/_components/cards/CommentCard";
import TopicCard from "@/app/_components/cards/TopicCard";
import Quadrant from "@/app/_components/graph/Quadrant";

// Stylesheet Imports
import styles from "@/app/_components/profile/ProfileTabs.module.scss";

const CommentsTab: React.FC<{ comments: Comment[] }> = ({ comments }) => {
  return (
    <div className={styles.pageWrapper}>
      {comments.map((comment, index) => (
        <ActivityCard key={index} content={comment.body} {...comment} />
      ))}
    </div>
  );
};

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

const SavedTopicsTab: React.FC<{ topics: SavedTopic[] }> = ({ topics }) => {
  return (
    <div className={styles.pageWrapper}>
      {topics.map((topic, index) => (
        <TopicCard key={index} {...topic} />
      ))}
    </div>
  );
};

const WordsOfWisdmTab: React.FC<{ wisdmList: Wisdm[] }> = ({ wisdmList }) => {
  return (
    <div className={styles.pageWrapper}>
      {wisdmList.map((wisdm, index) => (
        <CommentCard key={index} content={wisdm.body} {...wisdm} />
      ))}
    </div>
  );
};

interface ProfileTabsProps {
  comments: Comment[];
  savedTopics: SavedTopic[];
  wisdmList: Wisdm[];
  quadrantData: {
    xValue: number;
    yValue: number;
  };
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface ProfileTabsContentProps {
  activeTab: string;
  comments: Comment[];
  savedTopics: SavedTopic[];
  wisdmList: Wisdm[];
  quadrantData: {
    xValue: number;
    yValue: number;
  };
}

const ProfileTabsContent: React.FC<ProfileTabsContentProps> = ({
  activeTab,
  comments,
  savedTopics,
  wisdmList,
  quadrantData,
}) => {
  console.log("Active tab:", activeTab);
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

const ProfileTabs: React.FC<ProfileTabsProps> & {
  Content: React.FC<ProfileTabsContentProps>;
} = ({ activeTab, setActiveTab }) => {
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
        Saved Interests
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
