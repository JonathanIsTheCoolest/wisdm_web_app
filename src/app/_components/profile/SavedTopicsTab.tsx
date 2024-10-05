import React from "react";
import styles from "@/styles/components/profile/SavedTopicsTab.module.scss";
import { SavedTopic } from "@/types";
import Image from "next/image";

interface SavedTopicsProps {
  topics: SavedTopic[];
}

const SavedTopics: React.FC<SavedTopicsProps> = ({ topics }) => {
  return (
    <div className={styles.savedTopics}>
      {topics.map((topic) => (
        <div key={topic.id} className={styles.topic}>
          <div className={styles.topicImage}>
            <Image
              src={topic.imageUrl}
              alt={topic.title}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw,
                     (max-width: 1200px) 50vw,
                     33vw"
            />
            <div className={styles.overlay}></div>
          </div>
          <div className={styles.topicContent}>
            <h3 className={styles.topicTitle}>{topic.title}</h3>
            <p className={styles.topicBody}>{topic.body}</p>
            <div className={styles.topicFooter}>
              <div className={styles.topicStats}>
                <span>💬</span> {topic.comments}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedTopics;