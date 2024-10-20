"use client";

// System Imports
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Stylesheet Imports
import styles from "@/app/pages/login/signup/interests/InterestsPage.module.scss";

// Asset Imports
import arrowLeftWhite from "@/assets/icons/arrow_left_white.svg";
import arrowLeftBrand from "@/assets/icons/arrow_left_brand.svg";
import progressCircle5 from "@/assets/icons/progress_circle_5.svg";
import tech from "@/assets/images/tech.png";

const InterestsPage = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleInterestClick = (label: string) => {
    setSelectedInterests((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  return (
    <div className={styles.interestsPage}>
      <div className={styles.onboardingHeader}>
        <Link href="/pages/login/signup/tags" className={styles.backButton}>
          <Image src={arrowLeftBrand} />
        </Link>
        <Image src={progressCircle5} className={styles.progressCircles} />
      </div>

      <div className={styles.onboardingTextBlock}>
        <h1>What are you interested in?</h1>
        <p>Pick 5 to customize your news feed</p>
      </div>

      <div className={styles.interestsGrid}>
        {[
          { label: "Domestic Politics", image: tech.src },
          { label: "International Relations", image: tech.src },
          { label: "Policy & Legislation", image: tech.src },
          { label: "AI & Technology", image: tech.src },
          { label: "Elections & Campaigns", image: tech.src },
          { label: "Human Rights", image: tech.src },
          { label: "Entertainment Industry", image: tech.src },
          { label: "Social Media", image: tech.src },
          { label: "Environmental Policy", image: tech.src },
          { label: "Economics", image: tech.src },
          { label: "Global Health", image: tech.src },
          { label: "Peace & Justice", image: tech.src },
        ].map((interest) => (
          <div
            key={interest.label}
            className={`${styles.interestItem} ${selectedInterests.includes(interest.label) ? styles.selected : ""}`}
            onClick={() => handleInterestClick(interest.label)}
          >
            <img src={interest.image} alt={interest.label} />
            <p>{interest.label}</p>
          </div>
        ))}
      </div>

      <div className={styles.nextWrapper}>
        <Link href="/pages/dashboard" className={styles.nextButton}>
          Finish
        </Link>
      </div>
    </div>
  );
};

export default InterestsPage;
