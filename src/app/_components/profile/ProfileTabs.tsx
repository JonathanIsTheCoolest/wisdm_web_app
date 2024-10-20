// System Imports
import React, { useState } from "react";
import Image from "next/image";

// API/Database Imports
import { User, SavedTopic, Wisdom, Comment } from '@/types';

// Component Imports
import ActivityCommentCard from "@/app/_components/cards/ActivityCommentCard";
import CommentCard from "@/app/_components/cards/CommentCard";
import SavedTopicCard from "@/app/_components/cards/SavedTopicCard";

// Stylesheet Imports
import styles from "@/app/(pages)/dashboard/profile/Profile.module.scss";

// CommentsTab Component
const CommentsTab: React.FC<{ comments: Comment[] }> = ({ comments }) => {
  return (
<div className={styles.pageWrapper}>
    {comments.map((comment, index) => (
        <ActivityCommentCard key={index} {...comment} />
    ))}
</div>
  );
};

// QuadrantTab Component
const QuadrantTab: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.quadrantImage}>
        <Image
          src="/assets/icons/quadrant.svg"
          alt="Quadrant"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
  );
};

// SavedTopicsTab Component
const SavedTopicsTab: React.FC<{ topics: SavedTopic[] }> = ({ topics }) => {
  return (
    <div className={styles.pageWrapper}>
      {topics.map((topic) => (
        <SavedTopicCard key={topic.id} {...topic} />
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
  user: User;
  comments: Comment[];
  savedTopics: SavedTopic[];
  wisdmList: Wisdom[];
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ user, comments, savedTopics, wisdmList }) => {
  const [activeTab, setActiveTab] = React.useState('comments');

  return (
    <>
      <div className={styles.tabs}>
        <div
          className={`${styles.tab} ${activeTab === 'comments' ? styles.active : ''}`}
          onClick={() => setActiveTab('comments')}
        >
          Comments
        </div>
        <div
          className={`${styles.tab} ${activeTab === 'quadrant' ? styles.active : ''}`}
          onClick={() => setActiveTab('quadrant')}
        >
          Quadrant
        </div>
        <div
          className={`${styles.tab} ${activeTab === 'savedTopics' ? styles.active : ''}`}
          onClick={() => setActiveTab('savedTopics')}
        >
          Saved Topics
        </div>
        <div
          className={`${styles.tab} ${activeTab === 'wordsOfWisdm' ? styles.active : ''}`}
          onClick={() => setActiveTab('wordsOfWisdm')}
        >
          Words of Wisdm
        </div>
      </div>
      {activeTab === 'comments' && <CommentsTab comments={comments} />}
      {activeTab === 'quadrant' && <QuadrantTab />}
      {activeTab === 'savedTopics' && <SavedTopicsTab topics={savedTopics} />}
      {activeTab === 'wordsOfWisdm' && <WordsOfWisdmTab wisdmList={wisdmList} />}
    </>
  );
};

export default ProfileTabs;
