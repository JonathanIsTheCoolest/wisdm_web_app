"use client";

// React
import { useState } from "react";

// Next
import { useRouter } from "next/navigation";

// System Imports
import Image from "next/image";
import Link from "next/link";

// Stylesheet Imports
import styles from "@/app/(pages)/login/signup/personal/PersonalInfoPage.module.scss";

// Asset Imports
import arrowLeftWhite from "@/assets/icons/arrow_left_white.svg";
import arrowLeftBrand from "@/assets/icons/arrow_left_brand.svg";
import progressCircle2 from "@/assets/icons/progress_circle_2.svg";

// Redux imports
import { useAppSelector, useAppDispatch } from "@/redux_lib/hooks";
import { setSignupState, PersonalInfo } from "@/redux_lib/features/signupSlice";

// Firebase imports
import { onSignOut } from "@/app/_lib/firebase/auth/auth_sign_out";

// Name Moderation
import { basicNameModerationFilter, aiNameModerationRequest } from "@/app/_lib/helper/moderation/nameModeration";

import { SubmitButton } from "@/app/_components/buttons/SubmitButton";
import { headers } from "next/headers";

interface ModerationResult {
  [key: string]: {
    isProblematic: boolean,
    problematicWords: [...any]
  }
}

const genderOptionsArray = ['Female', 'Male', 'Other', 'Don\'t want to specify']

const INIT_ERROR_STATE: PersonalInfo = {
  name: null,
  username: null,
  gender: null,
}

const PersonalInfoPage = () => {
  const signupState = useAppSelector(state => state.signup)
  const personalInfoState = signupState.personalInfo
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [errorState, setErrorState] = useState(INIT_ERROR_STATE)

  const handleFieldUpdate = (formFieldName: string, newValue: string) => {
    dispatch(setSignupState({ ...signupState, personalInfo: {...personalInfoState, [formFieldName]: newValue }}));
  };

  const handleErrorState = (formFieldName: string, error: string | null) => {
    setErrorState((state) => ({...state, [formFieldName]: error}))
  }

  const handleNameInputs = (formFieldName: string, newValue: string) => {
    const error = basicNameModerationFilter(newValue, formFieldName)
    handleErrorState(formFieldName, error)
    handleFieldUpdate(formFieldName, newValue)
  }

  const handleSelection = (formFieldName: string, newValue: string) => {
    newValue ? handleErrorState(formFieldName, null) : null
    handleFieldUpdate(formFieldName, newValue)
  }

  const handleSubmission = async () => {
    let isError = false;
    const newErrorObject = { ...INIT_ERROR_STATE };
  
    Object.keys(personalInfoState).forEach((key) => {
      const value = personalInfoState[key];
      const error = errorState[key];
  
      if (!value?.length) {
        isError = true;
        newErrorObject[key] = `${key} is required`;
      }
  
      if (error) {
        isError = true;
        newErrorObject[key] = error;
      }
    });

    if (!isError) {
      try {
        const getUsernameExistsEndpoint = `${process.env.NEXT_PUBLIC_BASE_API_URL}/users/get/username_exists?username=${personalInfoState.username}`
        const usernameExists = await fetch(getUsernameExistsEndpoint)
        const result = await usernameExists.json()
        if (result.username_exists) {
          isError = true;
          newErrorObject.username = 'Sorry your desired username is already in use'
        }
      } catch (error) {
        console.error({
          error: 'There was an error checking the username in the database',
          additionalDetails: error,
        })
      }
    }
  
    if (!isError) {
      const { name, username } = personalInfoState;
  
      try {
        const moderationResult: ModerationResult = await aiNameModerationRequest({name, username});
        console.log(moderationResult)
        for (const [key, value] of Object.entries(moderationResult)) {
          if (value?.isProblematic) {
            isError = true;
            newErrorObject[key] = `The following problematic words were detected in your ${key} entry: ${value.problematicWords}`
          }
        }
      } catch (error) {
        console.error({
          error: "Moderation request failed",
          additionalDetails: error,
        });
        isError = true;
      }
    }
  
    setErrorState(newErrorObject);
    if (!isError) {
      router.push("/login/signup/location");
    }
  };
  

  const inputFieldArray = [
    { type: 'text', placeholder: 'John Doe', value: personalInfoState.name, name: 'name', label: 'Full Name', error: errorState.name },
    { type: 'text', placeholder: 'teacher.s_pet123', value: personalInfoState.username, name: 'username', label: 'Choose a unique username', error: errorState.username }
  ]

  return (
    <div className={styles.personalInfoPage}>
      <div className={styles.onboardingHeader}>
        <Link onClick={onSignOut} href="/login/signup" className={styles.backButton}>
          <Image src={arrowLeftBrand} alt="Back button"/>
        </Link>
        <Image src={progressCircle2} className={styles.progressCircles} alt="Progress Indicator step 2" />
      </div>

      <div className={styles.onboardingTextBlock}>
        <h1>Tell us a little about yourself</h1>
      </div>

      {
        inputFieldArray.map((item) => {
          const {name, type, placeholder, value, label, error} = item
          return (
            <div 
              className={styles.labelWrapper}
              key={name}
            >
              <label>{label}</label>
              <div>{error}</div>
              <input
                className={styles.inputField}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value ?? ''}
                onChange={(e) => handleNameInputs(name, e.target.value)}
              />
            </div>
          )
        })
      }

      <p className={styles.infoText}>
        Want to go anonymous? You can change it in the settings.
      </p>

      <div className={styles.labelWrapper}>
        <label>What is your gender?</label>
        <div>{errorState.gender}</div>
        <div className={styles.genderButtons}>
          {
            genderOptionsArray.map(item => {
              return (
                <button
                  key={item}
                  className={`${styles.genderButton} ${personalInfoState.gender === item ? styles.active : ""}`}
                  onClick={() => handleSelection('gender', item)}
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
        <SubmitButton
          text="Next"
          onClick={handleSubmission}
        />
      </div>
    </div>
  );
};

export default PersonalInfoPage;
