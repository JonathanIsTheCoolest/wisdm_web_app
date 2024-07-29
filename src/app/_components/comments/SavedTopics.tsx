import React from "react";
import styles from "@/styles/components/comments/SavedTopic.module.scss";

interface SavedTopicProps {
  title: string;
  comments: number;
  body: string;
}

const SavedTopic: React.FC<SavedTopicProps> = ({ title, comments, body }) => {
  return (
    <div className={styles.savedTopic}>
      <div className={styles.topic}>
        <div className={styles.topicContent}>
          <div className={styles.topicTitle}>
            {title} <span>💬</span> {comments} comments
          </div>
          <div className={styles.topicBody}>{body}</div>
        </div>
      </div>
    </div>
  );
};

export default SavedTopic;
