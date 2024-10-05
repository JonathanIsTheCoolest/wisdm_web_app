import React from "react";
import styles from "@/styles/components/profile/WordsOfWisdmTab.module.scss";
import { wisdm } from "@/types";
import Image from "next/image";

interface WordsOfwisdmProps {
  wisdmList: wisdm[];
}

const WordsOfWisdm: React.FC<WordsOfwisdmProps> = ({ wisdmList }) => {
  return (
    <div className={styles.wordsOfwisdm}>
      {wisdmList.map((wisdm, index) => (
        <div key={index} className={styles.wisdm}>
          <div className={styles.wisdmHeader}>
            <div className={styles.avatarImage}>
              <Image
                src="/path/to/avatar.png"
                alt={`${wisdm.username}'s avatar`}
                width={40}
                height={40}
              />
            </div>
            <div className={styles.details}>
              <div className={styles.username}>{wisdm.username}</div>
              <div className={styles.time}>{wisdm.time}</div>
            </div>
          </div>
          <div className={styles.wisdmBody}>{wisdm.body}</div>
          <div className={styles.wisdmFooter}>
            <div className={styles.wisdmStats}>
              <div className={styles.stat}>
                <span>👍</span> {wisdm.upvotes}
              </div>
              <div className={styles.stat}>
                <span>💬</span> {wisdm.comments}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WordsOfWisdm;