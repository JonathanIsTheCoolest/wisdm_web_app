"use client";

import React, { useReducer, useState } from "react";
import { useRouter } from "next/navigation";
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
import { googleSignInSequence } from "@/app/_lib/firebase/auth/google/auth_google_signin_sequence";
import { facebookSignInSequence } from "@/app/_lib/firebase/auth/facebook/auth_facebook_signin_sequence";
import { useOnboardingErrors } from "@/hooks/useOnboardingErrors";
import {
  validateEmail,
  validatePasswordStrength,
  validatePasswordsMatch,
} from "@/app/_lib/validation/onboardingValidation";
import OnboardingErrorSummary from "@/app/_components/errors/OnboardingErrorSummary";

import googleIcon from "@/assets/icons/google.svg";
import facebookIcon from "@/assets/icons/facebook.svg";

const GettingStartedContainer = () => {
  const router = useRouter();
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
  const { formError, setFormError, clearAllErrors } = useOnboardingErrors();

  // Convert form state errors to fieldErrors format for OnboardingErrorSummary
  const getFieldErrors = () => {
    const errors: { [key: string]: string | null } = {};
    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;
    if (duplicatePasswordError)
      errors.duplicatePassword = duplicatePasswordError;
    return errors;
  };

  const validateForm = () => {
    let isValid = true;
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePasswordStrength(password);
    const passwordMatchValidation = validatePasswordsMatch(
      password,
      duplicatePassword
    );

    // Update form state with validation results
    if (!emailValidation.isValid) {
      setField(formDispatch, "emailError", emailValidation.errorMessage || "");
      isValid = false;
    } else {
      setField(formDispatch, "emailError", "");
    }

    if (!passwordValidation.isValid) {
      setField(
        formDispatch,
        "passwordError",
        passwordValidation.errorMessage || ""
      );
      isValid = false;
    } else {
      setField(formDispatch, "passwordError", "");
    }

    if (!passwordMatchValidation.isValid) {
      setField(
        formDispatch,
        "duplicatePasswordError",
        passwordMatchValidation.errorMessage || ""
      );
      isValid = false;
    } else {
      setField(formDispatch, "duplicatePasswordError", "");
    }

    return isValid;
  };

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
    clearAllErrors();
    if (isReadyToSubmit() && validateForm()) {
      startLoading();
      onClickFirebaseEmailPasswordSignUp(
        email,
        password,
        duplicatePassword,
        (field, value) => setField(formDispatch, field, value)
      )
        .then((result) => {
          if (result.success && result.user) {
            // Handle successful signup here - navigate to the next page
            console.log("Signup successful, user:", result.user);
            router.push("/login/signup/personal");
          } else if (result.error) {
            // Display Firebase error
            setFormError(
              typeof result.error === "string"
                ? result.error
                : "There was an error creating your account. Please try again."
            );
          }
        })
        .catch((error) => {
          console.error("Signup failed:", error);
          setFormError(
            "Signup failed. Please check your connection and try again."
          );
        })
        .finally(() => {
          // Always stop loading, whether signup was successful or not
          stopLoading();
        });
    } else {
      // If validation failed, ensure any errors are visible in the summary
      setFormError("Please fix the form errors and try again");
    }
  };

  const handleGoogleSignup = async () => {
    startLoading();
    try {
      // The googleSignInSequence handles redirection internally on success
      await googleSignInSequence();
    } catch (error) {
      console.error("Google signup failed:", error);
    } finally {
      stopLoading();
    }
  };

  const handleFacebookSignup = async () => {
    startLoading();
    try {
      // The facebookSignInSequence handles redirection internally on success
      await facebookSignInSequence();
    } catch (error) {
      console.error("Facebook signup failed:", error);
    } finally {
      stopLoading();
    }
  };

  return (
    <div className={styles.loginContainer}>
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

      {/* Add consolidated error summary before submit button */}
      <OnboardingErrorSummary
        formError={formError}
        fieldErrors={getFieldErrors()}
        className="errorSummaryContainer"
      />

      <SubmitButton text="Next" onClick={onClickNextButton} />
    </div>
  );
};

export default GettingStartedContainer;
