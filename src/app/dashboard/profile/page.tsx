'use client'

import React, { useState } from "react";
import styles from "@/styles/Profile.module.scss";
import featuredImage1 from "@/assets/images/home_test_img.png";
import featuredImage2 from "@/assets/images/home_test_img_2.png";

const comments = [
  {
    title: "Ukraine War",
    body: "it's a moral duty and strategic to support democracy against aggression, ensuring global order, while",
    upvotes: 11452,
    comments: 315,
  },
  {
    title: "Ukraine War",
    body: "reply to justice_teacher\nit's a moral duty and strategic to support democracy against aggression, ensuring global order, while",
    upvotes: 11452,
    comments: 315,
  },
  {
    title: "Ukraine War",
    body: "reply to justice_teacher\nit's a moral duty and strategic to support democracy against aggression, ensuring global order, while",
    upvotes: 11452,
    comments: 315,
  },
  // Add more comments as needed
];

const savedTopics = [
  {
    title: "U.S. TikTok Ban",
    body: "President Biden on Wednesday signed a law that would ban Chinese-owned TikTok unless it is sold within a year.",
    comments: 315,
    image: featuredImage1,
  },
  {
    title: "Ukraine War",
    body: "On 24 February 2022, Russia invaded Ukraine in an escalation of the Russo-Ukrainian War that started in 2014.",
    comments: 4283,
    image: featuredImage2,
  },
  // Add more saved topics as needed
];

const wordsOfWisdom = [
  {
    title: "Ukraine War",
    username: "teacher.s_pet123",
    time: "4d",
    body: "So from my point of view this is trash. These people don’t deserve anything at all and are the lowest form of life.",
    upvotes: 18294,
    comments: 489,
  },
  {
    title: "Ukraine War",
    username: "not_a_b0t_650",
    time: "2w",
    body: "So from my point of view this is trash. These people don’t deserve anything at all and are the lowest form of life.",
    upvotes: 18294,
    comments: 489,
  },
  // Add more words of wisdom as needed
];

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
          <h1>User Settings</h1>
        </header>
        <div className={styles.avatar}></div>
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
            className={`${styles.toggleSwitch} ${visibility ? "active" : ""}`}
            onClick={toggleVisibility}
          ></div>
        </div>
        <div className={styles.toggleGroup}>
          <label>Display labels</label>
          <div
            className={`${styles.toggleSwitch} ${visibility ? "active" : ""}`}
            onClick={toggleVisibility}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      <header className={styles.header}>
        <h1>Profile</h1>
        <button className={styles.editButton} onClick={toggleSettings}>
          Edit
        </button>
      </header>
      <div className={styles.profileInfo}>
        <div className={styles.avatar}></div>
        <div className={styles.details}>
          <div className={styles.username}>teacher.s_pet123</div>
          <div className={styles.joined}>Joined April 2024</div>
        </div>
      </div>
      <div className={styles.tags}>
        <div className={styles.tag}>Left-Handed</div>
        <div className={styles.tag}>Teacher’s Pet</div>
      </div>
      <div className={styles.tabs}>
        {["Quadrant", "Comments", "Saved Topics", "Words"].map((tab) => (
          <div
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? "active" : ""}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
      {activeTab === "Quadrant" && (
        <div className={styles.quadrant}>
          <div className={styles.quadrantImage}>
            <div className={styles.quadrantDot}></div>
          </div>
          <div className={styles.visibilityToggle}>
            <span className={styles.toggleLabel}>Visibility</span>
            <div
              className={`${styles.toggleSwitch} ${visibility ? "active" : ""}`}
              onClick={toggleVisibility}
            ></div>
          </div>
        </div>
      )}
      {activeTab === "Comments" && (
        <div className={styles.comments}>
          {comments.map((comment: any, index: any) => (
            <div key={index} className={styles.comment}>
              <div className={styles.commentHeader}>
                <div className={styles.commentTitle}>{comment.title}</div>
              </div>
              <div className={styles.commentBody}>{comment.body}</div>
              <div className={styles.commentFooter}>
                <div className={styles.commentStats}>
                  <div className={styles.stat}>
                    <span>👍</span> {comment.upvotes}
                  </div>
                  <div className={styles.stat}>
                    <span>💬</span> {comment.comments}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
          {activeTab === "Saved Topics" && (
            <div className={styles.savedTopics}>
              {savedTopics.map((topic, index) => (
                <div key={index} className={styles.topic}>
                  <div className={styles.topicImage} style={{ backgroundImage: `url(${topic.image})` }}></div>
                  <div className={styles.topicContent}>
                    <div className={styles.topicTitle}>{topic.title}</div>
                    <div className={styles.topicBody}>{topic.body}</div>
                    <div className={styles.topicFooter}>
                      <div className={styles.topicStats}>
                        <div className={styles.stat}>
                          <span>💬</span> {topic.comments} comments
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === "Words" && (
            <div className={styles.wordsOfWisdom}>
              {wordsOfWisdom.map((wisdom, index) => (
                <div key={index} className={styles.wisdom}>
                  <div className={styles.wisdomHeader}>
                    <div className={styles.avatar}></div>
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