"use client";

// System Imports
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Stylesheet Imports
import styles from "@/app/(pages)/login/signup/interests/InterestsPage.module.scss";

// Asset Imports
import arrowLeftWhite from "@/assets/icons/arrow_left_white.svg";
import arrowLeftBrand from "@/assets/icons/arrow_left_brand.svg";
import progressCircle5 from "@/assets/icons/progress_circle_5.svg";
import tech from "@/assets/images/tech.png";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { apiHTTPWrapper } from "@/lib/features/authSlice";
import { setSignupState } from "@/lib/features/signupSlice";

import { useRouter } from "next/navigation";

import { SubmitButton } from "@/app/_components/buttons/SubmitButton";

const interestArray = [
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
]

const InterestsPage = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const signupState = useAppSelector((state) => state.signup)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleInterestClick = (label: string) => {
    setSelectedInterests((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const handleSubmission = async () => {
    if (selectedInterests.length >= 5) {
      const newSignupState = {...signupState, interests: selectedInterests}
      dispatch(setSignupState(newSignupState))
      const endpoint = `${process.env.NEXT_PUBLIC_BASE_API_URL}/users/post/create_user`
      console.log()
      try {
        const response = await dispatch(
          apiHTTPWrapper({
            url: endpoint,
            options: {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(newSignupState)
            }
          })
        )
        console.log(response)
        const result = await response.payload
        console.log(result)

        router.push('/dashboard')
      } catch (error) {
        console.error({
          error: 'There was an error posting your information',
          additionalDetails: error
        })
      }
    }
  }

  return (
    <div className={styles.interestsPage}>
      <div className={styles.onboardingHeader}>
        <Link href="/login/signup/tags" className={styles.backButton}>
          <Image src={arrowLeftBrand} alt="back button"/>
        </Link>
        <Image src={progressCircle5} alt="progress" className={styles.progressCircles} />
      </div>

      <div className={styles.onboardingTextBlock}>
        <h1>What are you interested in?</h1>
        <p>Pick 5 to customize your news feed</p>
      </div>

      <div className={styles.interestsGrid}>
        {interestArray.map((interest) => (
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
        <SubmitButton
          text="Finish"
          onClick={handleSubmission}
        />
      </div>
    </div>
  );
};

export default InterestsPage;
