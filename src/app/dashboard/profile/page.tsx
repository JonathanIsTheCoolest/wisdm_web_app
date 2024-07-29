"use client";

// THIS FILE NEEDS TO BE CLEANED UP AND REFACTORED

import React, { useState } from "react";
import Image from "next/image";

import styles from "@/styles/dashboard/profile/Profile.module.scss";

import placeholderData from "@/assets/placeholderData.json";
import CommentCard from "@/app/_components/comments/comment.tsx";
import SavedTopic from "@/app/_components/comments/savedTopics.tsx";
import quadrantIcon from "@/assets/icons/quadrant.svg";

const { comments, savedTopics, wordsOfWisdom } = placeholderData;

const Profile = () => {
  const [activeTab, setActiveTab] = useState("Quadrant");
  const [visibility, setVisibility] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  if (showSettings) {
    return (
      <div className={styles.userSettingsContainer}>
        <div className={styles.backButton} onClick={toggleSettings}>
          ←
        </div>
        <header className={styles.header}>
          <h1>User Settings</h1> {/* SHOULDNT BE H1 */}
        </header>
        <div className={styles.avatarImage}></div>
        <div className={styles.formGroup}>
          <label>Username</label>
          <input type="text" value="teacher.s_pet123" readOnly />
          <span className={styles.editIcon}>✏️</span>
        </div>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input type="email" value="teacher.s_pet123@gmail.com" readOnly />
          <span className={styles.editIcon}>✏️</span>
        </div>
        <div className={styles.toggleGroup}>
          <label>Display username</label>
          <div
            className={`styles.toggleSwitch} ${
              visibility ? "activeTabItem" : ""
            }`}
            onClick={toggleVisibility}
          ></div>
        </div>
        <div className={styles.toggleGroup}>
          <label>Display labels</label>
          <div
            className={`${styles.toggleSwitch} ${
              visibility ? "activeTabItem" : ""
            }`}
            onClick={toggleVisibility}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileInfoContainer}>
        <header className={styles.header}>
          <h1>Profile</h1>
          <div className={styles.iconContainer}>
            <button className={styles.editButton} onClick={toggleSettings}>
              Edit
            </button>
          </div>
        </header>
        <div className={styles.profileInfo}>
          <div className={styles.avatarImage}></div>
          <div className={styles.details}>
            <div className={styles.userInfo}>
              <p className={styles.username}>teacher.s_pet123</p>
              <p className={styles.joined}>Joined April 2024</p>
              <div className={styles.tags}>
                <div className={styles.tag}>
                  <p>Left-Handed</p>
                </div>
                <div className={styles.tag}>
                  <p>Teacher’s Pet</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.tabsWrapper}>
          {["Quadrant", "Comments", "Saved Topics", "Words of Wisdm"].map(
            (tab) => (
              <div
                key={tab}
                className={`${styles.tabItem} ${
                  activeTab === tab ? styles.activeTabItem : ""
                }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </div>
            )
          )}
        </div>
      </div>

      {/* RECREATE ENTIRELY & MAKE INTO A COMPONENT */}
      {activeTab === "Quadrant" && (
        <div className={styles.quadrant}>
          <div className={styles.quadrantImage}>
            <Image src={quadrantIcon} alt="Quadrant" />
          </div>
        </div>
      )}

      {activeTab === "Comments" && (
        <div className={styles.profileFeed}>
          {comments.map((comment, index) => (
            <CommentCard
              key={index}
              topic={comment.topic}
              username={comment.username}
              time={comment.time}
              tag={comment.tag}
              content={comment.content}
              upvotes={comment.upvotes}
              comments={comment.comments}
            />
          ))}
        </div>
      )}

      {/* MAKE THIS INTO A COMPONENT */}
      {activeTab === "Saved Topics" && (
        <div className={styles.profileFeed}>
          {savedTopics.map((topic, index) => (
            <SavedTopic
              key={index}
              title={topic.title}
              comments={topic.comments}
              body={topic.body}
            />
          ))}
        </div>
      )}

      {/* MAKE THIS INTO A COMPONENT */}
      {activeTab === "Words" && (
        <div className={styles.wordsOfWisdom}>
          {wordsOfWisdom.map((wisdom, index) => (
            <div key={index} className={styles.wisdom}>
              <div className={styles.wisdomHeader}>
                <div className={styles.avatarImage}></div>
                <div className={styles.details}>
                  <div className={styles.username}>{wisdom.username}</div>
                  <div className={styles.time}>{wisdom.time}</div>
                </div>
              </div>
              <div className={styles.wisdomBody}>{wisdom.body}</div>
              <div className={styles.wisdomFooter}>
                <div className={styles.wisdomStats}>
                  <div className={styles.stat}>
                    <span>👍</span> {wisdom.upvotes}
                  </div>
                  <div className={styles.stat}>
                    <span>💬</span> {wisdom.comments}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
