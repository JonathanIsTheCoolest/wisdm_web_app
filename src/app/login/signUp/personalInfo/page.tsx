"use client";

import { useState } from "react";
import styles from "@/styles/login/signUp/personalInfo/personalInfo.module.scss";
import Image from "next/image";
import Link from "next/link";
import arrowLeftWhite from "@/assets/icons/arrow_left_white.svg";
import arrowLeftBrand from "@/assets/icons/arrow_left_brand.svg";
import progressCircle2 from "@/assets/icons/progress_circle_2.svg";

const PersonalInfoPage = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleButtonClick = (gender: string) => {
    setActiveButton((prev) => (prev === gender ? null : gender));
  };

  return (
    <div className={styles.personalInfoPage}>
      <div className={styles.onboardingHeader}>
        <Link href="/login/signUp" className={styles.backButton}>
          <Image src={arrowLeftBrand} />
        </Link>
        <Image src={progressCircle2} className={styles.progressCircles} />
      </div>

      <div className={styles.onboardingTextBlock}>
        <h1>Tell us a little about yourself</h1>
      </div>

      <div className={styles.labelWrapper}>
        <label>Choose a unique username</label>
        <input
          type="text"
          placeholder="teacher.s_pet123"
          className={styles.inputField}
        />
      </div>

      <p className={styles.infoText}>
        Want to go anonymous? You can change it in the settings.
      </p>

      <div className={styles.labelWrapper}>
        <label>What is your gender?</label>
        <div className={styles.genderButtons}>
          <button
            className={`${styles.genderButton} ${activeButton === "Female" ? styles.active : ""}`}
            onClick={() => handleButtonClick("Female")}
          >
            Female
          </button>
          <button
            className={`${styles.genderButton} ${activeButton === "Male" ? styles.active : ""}`}
            onClick={() => handleButtonClick("Male")}
          >
            Male
          </button>
          <button
            className={`${styles.genderButton} ${activeButton === "Other" ? styles.active : ""}`}
            onClick={() => handleButtonClick("Other")}
          >
            Other
          </button>
          <button
            className={`${styles.genderButton} ${activeButton === "Don't want to specify" ? styles.active : ""}`}
            onClick={() => handleButtonClick("Don't want to specify")}
          >
            Don't want to specify
          </button>
        </div>
      </div>

      <div className={styles.nextWrapper}>
        <p className={styles.infoText}>
          You can customize the visibility of your information in the settings
        </p>
        <Link href="/login/signUp/locationInfo" className={styles.nextButton}>
          Next
        </Link>
      </div>
    </div>
  );
};

export default PersonalInfoPage;
