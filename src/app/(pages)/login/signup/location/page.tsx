"use client";

import { useState } from "react";

import { useAppDispatch } from "@/redux_lib/hooks";
import { useAppSelector } from "@/redux_lib/hooks";
import { setSignupState } from "@/redux_lib/features/signupSlice";

import { SubmitButton } from "@/app/_components/buttons/SubmitButton";
import LoadingOverlay from "@/app/_components/loading/LoadingOverlay";
import { useOnboardingLoadingState } from "@/hooks/useOnboardingLoadingState";

import { useRouter } from "next/navigation";

// System Imports
import Image from "next/image";
import Link from "next/link";

// Stylesheet Imports
import styles from "@/app/(pages)/login/signup/location/LocationInfoPage.module.scss";

// Asset Imports
import arrowLeftWhite from "@/assets/icons/arrow_left_white.svg";
import arrowLeftBrand from "@/assets/icons/arrow_left_brand.svg";
import progressCircle3 from "@/assets/icons/progress_circle_3.svg";
import countries from "@/assets/countries.json";

interface Country {
  name: string;
  code: string;
}

const countryMap: Country[] = countries;

const LocationInfoPage = () => {
  const [locationError, setLocationError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const signup = useAppSelector((state) => state.signup);
  const location = signup.locality;
  const router = useRouter();
  const { isLoading, startLoading, stopLoading } = useOnboardingLoadingState();

  const handleUpdate = (value: string) => {
    dispatch(setSignupState({ ...signup, locality: value }));
    locationError && location ? setLocationError(null) : null;
  };

  const handleSubmission = async () => {
    if (!location) {
      setLocationError("You need to make a selection");
    } else {
      startLoading();
      await router.push("/login/signup/tags");
    }
  };
  return (
    <div className={styles.locationInfoPage}>
      <LoadingOverlay isVisible={isLoading} />
      <div className={styles.onboardingHeader}>
        <Link href="/login/signup/personal" className={styles.backButton}>
          <Image src={arrowLeftBrand} alt="Back button" />
        </Link>
        <Image
          src={progressCircle3}
          alt="progress indicator step three"
          className={styles.progressCircles}
        />
      </div>

      <div className={styles.onboardingTextBlock}>
        <h1>Where do you live?</h1>
        <p>This helps us personalize your feed with more relevant content.</p>
      </div>

      <div className={styles.labelWrapper}>
        <label>
          <select
            className={styles.inputField}
            onChange={(e) => handleUpdate(e.target.value)}
          >
            {countryMap.map((item) => {
              return <option key={item.code}>{item.name}</option>;
            })}
          </select>
        </label>
      </div>

      <div className={styles.nextWrapper}>
        <p className={styles.infoText}>
          You can customize the visibility of your information in the settings
        </p>
        <SubmitButton onClick={handleSubmission} />
      </div>
    </div>
  );
};

export default LocationInfoPage;
