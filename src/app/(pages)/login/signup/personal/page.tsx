"use client";

// System Imports
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Stylesheet Imports
import styles from "@/app/(pages)/login/signup/personal/PersonalInfoPage.module.scss";

// Asset Imports
import arrowLeftWhite from "@/assets/icons/arrow_left_white.svg";
import arrowLeftBrand from "@/assets/icons/arrow_left_brand.svg";
import progressCircle2 from "@/assets/icons/progress_circle_2.svg";

// Redux imports
import { useAppSelector } from "@/lib/hooks";

// Firebase imports
import { onSignOut } from "@/app/_lib/firebase/auth/auth_sign_out";

const genderOptionsArray = ['Female', 'Male', 'Other', 'Don\'t want to specify']

const PersonalInfoPage = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const user = useAppSelector(state => state.user)

  const handleButtonClick = (gender: string) => {
    setActiveButton((prev) => (prev === gender ? null : gender));
  };

  return (
    <div className={styles.personalInfoPage}>
      <div className={styles.onboardingHeader}>
        <Link onClick={onSignOut} href="/login/signup" className={styles.backButton}>
          <Image src={arrowLeftBrand} alt="Back button"/>
        </Link>
        <Image src={progressCircle2} className={styles.progressCircles} alt="Loading Circle" />
      </div>

      <div className={styles.onboardingTextBlock}>
        <h1>Tell us a little about yourself</h1>
      </div>

      <div className={styles.labelWrapper}>
        <label>Full Name</label>
        <input
          type="text"
          placeholder="John Doe"
          defaultValue={user.name ?? ''}
          className={styles.inputField}
        />
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
          {
            genderOptionsArray.map(item => {
              return (
                <button
                  key={item}
                  className={`${styles.genderButton} ${activeButton === item ? styles.active : ""}`}
                  onClick={() => handleButtonClick(item)}
                >
                  {item}
                </button>
              )
            })
          }
        </div>
      </div>

      <div className={styles.nextWrapper}>
        <p className={styles.infoText}>
          You can customize the visibility of your information in the settings
        </p>
        <Link href="/login/signup/location" className={styles.nextButton}>
          Next
        </Link>
      </div>
    </div>
  );
};

export default PersonalInfoPage;
