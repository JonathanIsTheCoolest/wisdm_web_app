// System Imports
import React from 'react';
import Image from 'next/image';

// API/Database Imports
import { SavedTopic } from '@/types';

// Stylesheet Imports
import styles from '@/app/_components/cards/SavedTopicCard.module.scss';

// Asset Imports
import commentIcon from '@/assets/icons/comment.svg';
import savedTopics_1 from '@/assets/images/savedTopics_1.png';

const imageMap: { [key: string]: any } = {
  '/savedTopics_1.png': savedTopics_1,
};

const SavedTopicCard: React.FC<SavedTopic> = ({ title, body, comments, imageUrl }) => {
  const image = imageMap[imageUrl] || savedTopics_1;

  return (
    <div className={styles.savedTopic}>
      <div className={styles.topicImage}>
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
        />
        <div className={styles.overlay}></div>
      </div>
      <div className={styles.topicContent}>
        <div className={styles.topicHeader}>
          <h3 className={styles.topicTitle}>{title}</h3>
          <div className={styles.commentCount}>
            <span><Image src={commentIcon} alt="Comment" /> {comments} comments</span>
          </div>
        </div>
        <p className={styles.topicBody}>{body}</p>
      </div>
    </div>
  );
};

export default SavedTopicCard;
