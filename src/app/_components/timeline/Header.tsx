'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/dashboard/timeline/Timeline.module.scss';
import arrowLeftBrand from "@/assets/icons/arrow_left_brand.svg";
import questionIcon from '@/assets/icons/questionmark.svg';
import settingsIcon from '@/assets/icons/gear.svg';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className={styles.header}>
    <h1 className={styles.pageTitle}>{title}</h1>
    <div className={styles.onboardingHeader}>
      <Link href="/login" className={styles.backButton}>
        <Image src={arrowLeftBrand} />
      </Link>
    </div>
    <div className={styles.iconContainer}>
      <div className={styles.questionIcon}>
        <Image src={questionIcon} alt="Question" />
      </div>
      <div
        className={styles.settingsIcon}
        onClick={() => console.log("toggleSidebar")}
      >
        <Image src={settingsIcon} alt="Settings" />
      </div>
    </div>
  </header>
  );
};

export default Header;
