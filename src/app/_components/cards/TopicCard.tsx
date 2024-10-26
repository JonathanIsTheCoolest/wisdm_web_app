// System Imports
import React from 'react';
import Image from 'next/image';

// API/Database Imports
import { SavedTopic } from '@/types';

// Stylesheet Imports
import styles from '@/app/_components/cards/TopicCard.module.scss';

// Asset Imports
import commentIcon from '@/assets/icons/comment.svg';
import savedTopics_1 from '@/assets/images/savedTopics_1.png';

const imageMap: { [key: string]: any } = {
  '/savedTopics_1.png': savedTopics_1,
};

const TopicCard: React.FC<SavedTopic> = ({ title, body, comments, imageUrl }) => {
  const image = imageMap[imageUrl] || savedTopics_1;

  return (
    <div className={styles.topicCard}>
      <div className={styles.cardImage}>
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
        />
        <div className={styles.overlay}></div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3>{title}</h3>
          <div className={styles.commentCount}>
            <span><Image src={commentIcon} alt="Comment" /> {comments} comments</span>
          </div>
        </div>
        <p className={styles.cardBody}>{body}</p>
      </div>
    </div>
  );
};

export default TopicCard;
