"use client";

import React, { useReducer, useState } from "react";
import GettingStartedHeader from "@/app/_components/signUp/gettingStarted/GettingStartedHeaderHeader/GettingStartedHeader";
import GettingStartedForm from "@/app/_components/signUp/gettingStarted/GettingStartedForm/GettingStartedForm";
import FederatedAuthOptions from "@/app/_components/signUp/gettingStarted/FederatedAuthOptions/FederatedAuthOptions";
import TermsAndConditions from "@/app/_components/signUp/gettingStarted/TermsAndConditions/TermsAndConditions";
import {
  onClickFirebaseEmailPasswordSignUp,
  setField,
} from "@/app/_components/signUp/gettingStarted/gettingStartedHelper";
import {
  formReducer,
  initialFormReducerState,
} from "@/app/_components/signUp/gettingStarted/gettingStartedReducer";
import { SubmitButton } from "@/app/_components/buttons/SubmitButton";
import styles from "@/app/(pages)/login/signup/SignUpPage.module.scss";
import FederatedAuthButton from "@/app/_components/buttons/FederatedAuthButton/FederatedAuthButton";
import SuggestedPassword from "@/app/_components/signUp/gettingStarted/SuggestedPassword/SuggestedPassword";
import LoadingOverlay from "@/app/_components/loading/LoadingOverlay";
import { useOnboardingLoadingState } from "@/hooks/useOnboardingLoadingState";

import googleIcon from "@/assets/icons/google.svg";
import facebookIcon from "@/assets/icons/facebook.svg";

const GettingStartedContainer = () => {
  const [formState, formDispatch] = useReducer(
    formReducer,
    initialFormReducerState
  );
  const {
    email,
    password,
    duplicatePassword,
    emailError,
    passwordError,
    duplicatePasswordError,
  } = formState;
  const { isLoading, startLoading, stopLoading } = useOnboardingLoadingState();

  const isReadyToSubmit = () => {
    const errorArray = [emailError, passwordError, duplicatePasswordError];
    const valueArray = [email, password, duplicatePassword];
    for (let i = 0; i < errorArray.length; i++) {
      if (errorArray[i].length) {
        return false;
      }
      if (!valueArray[i].length) {
        return false;
      }
    }
    return true;
  };

  const onClickNextButton = () => {
    if (isReadyToSubmit()) {
      startLoading();
      onClickFirebaseEmailPasswordSignUp(
        email,
        password,
        duplicatePassword,
        (field, value) => setField(formDispatch, field, value)
      ).catch((error) => {
        console.error("Signup failed:", error);
        stopLoading();
      });
    }
  };

  const handleGoogleSignup = async () => {
    startLoading();
    try {
      await googleSignUpSequence();
    } catch (error) {
      console.error("Google signup failed:", error);
      stopLoading();
    }
  };

  const handleFacebookSignup = async () => {
    startLoading();
    try {
      await facebookSignUpSequence();
    } catch (error) {
      console.error("Facebook signup failed:", error);
      stopLoading();
    }
  };

  return (
    <div className={styles.signupPage}>
      <LoadingOverlay isVisible={isLoading} />
      <GettingStartedHeader />
      <div className={styles.onboardingTextBlock}>
        <h1>Let's Get Started</h1>
      </div>
      <GettingStartedForm
        formState={formState}
        setField={(field: string, value: string) =>
          setField(formDispatch, field, value)
        }
      />
      <div className={styles.orDivider}>
        <span>OR</span>
      </div>
      <div className={styles.authWrapper}>
        <FederatedAuthButton
          src={googleIcon}
          alt="Google Icon"
          text="Continue with Google"
          onClick={handleGoogleSignup}
        />
        <FederatedAuthButton
          src={facebookIcon}
          alt="Facebook Icon"
          text="Continue with Facebook"
          onClick={handleFacebookSignup}
        />
      </div>
      <TermsAndConditions passwordError={passwordError} />
      <SubmitButton text="Next" onClick={onClickNextButton} />
    </div>
  );
};

export default GettingStartedContainer;
