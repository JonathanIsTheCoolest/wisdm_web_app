// REWRITE COMPONENT INTO ONE WITH ALL THE OTHERS
  // System Imports
  import React from 'react';
  
  // Stylesheet Imports
  import styles from '@/app/_components/timeline/Perspectives.module.scss';

interface Perspective {
  title: string;
  content: string;
}

interface PerspectivesProps {
  left: Perspective;
  right: Perspective;
}

const Perspectives: React.FC<PerspectivesProps> = ({ left, right }) => {
  return (
    <div className={styles.perspectivesContainer}>
      <div className={`${styles.perspective} ${styles.left}`}>
        <h2>{left.title}</h2>
        <p>{left.content}</p>
      </div>
      <div className={`${styles.perspective} ${styles.right}`}>
        <h2>{right.title}</h2>
        <p>{right.content}</p>
      </div>
    </div>
  );
};

export default Perspectives;