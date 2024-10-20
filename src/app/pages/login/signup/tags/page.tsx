"use client";

// System Imports
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Stylesheet Imports
import styles from "@/app/pages/login/signup/tags/TagsInfoPage.module.scss";

// Asset Imports
import arrowLeftWhite from "@/assets/icons/arrow_left_white.svg";
import arrowLeftBrand from "@/assets/icons/arrow_left_brand.svg";
import progressCircle4 from "@/assets/icons/progress_circle_4.svg";

interface NavigationActions {
  [key: string]: () => void;
}

const TagsInfoPage = () => {
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const handleTagClick = (tag: string) => {
    setActiveTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
  };

  return (
    <div className={styles.tagsInfoPage}>
      <div className={styles.onboardingHeader}>
        <Link href="/pages/login/signup/location" className={styles.backButton}>
          <Image src={arrowLeftBrand} alt="Back" />
        </Link>
        <Image src={progressCircle4} alt="Progress" className={styles.progressCircles} />
      </div>

      <div className={styles.onboardingTextBlock}>
        <h1>Where do you stand?</h1>
        <p>Choose the tags below that you think best describes yourself</p>
      </div>

      <div className={styles.tagsButtons}>
        {[
          { label: "Left Liberal", className: "LeftLiberal" },
          { label: "Right Rebel", className: "RightRebel" },
          { label: "Middle Man", className: "MiddleMan" },
          { label: "Eco Warrior", className: "EcoWarrior" },
          { label: "Tech Geek", className: "TechGeek" },
          { label: "Fiscal Hawk", className: "FiscalHawk" },
          { label: "Socialist Spark", className: "SocialistSpark" },
          { label: "Diplomacy Devotee", className: "DiplomacyDevotee" },
          { label: "Freedom Fanatic", className: "FreedomFanatic" },
          { label: "Capitalist Crusader", className: "CapitalistCrusader" },
          { label: "Green Guardian", className: "GreenGuardian" },
          { label: "Rural Revolutionary", className: "RuralRevolutionary" },
          { label: "Planet Preserver", className: "PlanetPreserver" },
          { label: "Urban Utopian", className: "UrbanUtopian" },
          { label: "Cultural Creative", className: "CulturalCreative" },
          { label: "Justice Juggernaut", className: "JusticeJuggernaut" },
          { label: "Equality Evangelist", className: "EqualityEvangelist" },
        ].map(({ label, className }) => (
          <button
            key={label}
            className={`${styles.tagButton} ${activeTags.includes(className) ? styles[`active${className.charAt(0).toUpperCase()}${className.slice(1)}`] : ""}`}
            onClick={() => handleTagClick(className)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className={styles.nextWrapper}>
        <Link href="/pages/login/signup/interests" className={styles.nextButton}>
          Next
        </Link>
      </div>
    </div>
  );
};

export default TagsInfoPage;
