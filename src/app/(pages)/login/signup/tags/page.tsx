"use client";

// System Imports
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useAppSelector, useAppDispatch } from "@/redux_lib/hooks";
import { setSignupState } from "@/redux_lib/features/signupSlice";
import { useRouter } from "next/navigation";

import { SubmitButton } from "@/app/_components/buttons/SubmitButton";
import LoadingOverlay from "@/app/_components/loading/LoadingOverlay";
import { useOnboardingLoadingState } from "@/hooks/useOnboardingLoadingState";
import { useOnboardingErrors } from "@/hooks/useOnboardingErrors";
import { validateMinArrayLength } from "@/app/_lib/validation/onboardingValidation";
import OnboardingErrorSummary from "@/app/_components/errors/OnboardingErrorSummary";

// Stylesheet Imports
import styles from "@/app/(pages)/login/signup/tags/TagsInfoPage.module.scss";

// Asset Imports
import arrowLeftWhite from "@/assets/icons/arrow_left_white.svg";
import arrowLeftBrand from "@/assets/icons/arrow_left_brand.svg";
import progressCircle4 from "@/assets/icons/progress_circle_4.svg";

interface NavigationActions {
  [key: string]: () => void;
}

const tagMap = [
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
];

const TagsInfoPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const signup = useAppSelector((state) => state.signup);
  const traits = signup.traits;
  const [activeTags, setActiveTags] = useState<string[]>(
    traits.length ? traits : []
  );
  const { isLoading, startLoading, stopLoading } = useOnboardingLoadingState();
  const { formError, setFormError, fieldErrors } = useOnboardingErrors();

  const handleTagClick = (tag: string) => {
    setActiveTags((prevTags) => {
      const newTags = prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag];

      // Clear error message if user has selected 5 or more tags
      if (newTags.length >= 5) {
        setFormError(null);
      }

      return newTags;
    });
  };

  const handleSubmission = async () => {
    const validation = validateMinArrayLength(activeTags, 5);

    if (validation.isValid) {
      setFormError(null);
      startLoading();
      dispatch(setSignupState({ ...signup, traits: activeTags }));
      await router.push("/login/signup/interests");
    } else {
      setFormError(validation.errorMessage);
      stopLoading();
    }
  };

  return (
    <div className={styles.loginContainer}>
      <LoadingOverlay isVisible={isLoading} />
      <div className={styles.onboardingHeader}>
        <Link href="/login/signup/location" className={styles.backButton}>
          <Image src={arrowLeftBrand} alt="Back Button" />
        </Link>
        <Image
          src={progressCircle4}
          alt="Progress"
          className={styles.progressCircles}
        />
      </div>

      <div className={styles.onboardingTextBlock}>
        <h1>Where do you stand?</h1>
        <p>Choose the tags below that you think best describes yourself</p>
        <p className={styles.tagCounter}>
          Selected: {activeTags.length}/5 (minimum)
        </p>
      </div>

      <div className={styles.tagContainer}>
        {tagMap.map(({ label, className }) => (
          <button
            key={label}
            className={`${styles.tagButton} ${
              activeTags.includes(className)
                ? styles[
                    `active${className
                      .charAt(0)
                      .toUpperCase()}${className.slice(1)}`
                  ]
                : ""
            }`}
            onClick={() => handleTagClick(className)}
          >
            {label}
          </button>
        ))}
      </div>

      <OnboardingErrorSummary
        formError={formError}
        fieldErrors={fieldErrors}
        className="errorSummaryContainer"
      />

      <div className={styles.nextWrapper}>
        <SubmitButton
          onClick={handleSubmission}
          text={
            activeTags.length < 5
              ? `Select ${5 - activeTags.length} more`
              : "Next"
          }
          disabled={activeTags.length < 5}
        />
      </div>
    </div>
  );
};

export default TagsInfoPage;
