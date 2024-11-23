'use client'

import React, { useReducer } from "react";
import { useRouter } from "next/navigation";
import GettingStartedHeader from "@/app/_components/signUp/gettingStarted/GettingStartedHeaderHeader/GettingStartedHeader";
import GettingStartedForm from "@/app/_components/signUp/gettingStarted/GettingStartedForm/GettingStartedForm";
import FederatedAuthOptions from "@/app/_components/signUp/gettingStarted/FederatedAuthOptions/FederatedAuthOptions";
import TermsAndConditions from "@/app/_components/signUp/gettingStarted/TermsAndConditions/TermsAndConditions";
import { onClickFirebaseEmailPasswordSignUp, setField } from "@/app/_components/signUp/gettingStarted/gettingStartedHelper";
import { formReducer, initialFormReducerState } from "@/app/_components/signUp/gettingStarted/gettingStartedReducer";
import { SubmitButton } from "@/app/_components/buttons/SubmitButton";
import styles from "@/app/(pages)/login/signup/SignUpPage.module.scss";

const GettingStartedContainer = () => {
  const [formState, formDispatch] = useReducer(formReducer, initialFormReducerState);
  const { email, password, duplicatePassword, passwordError } = formState;
  const router = useRouter();

  return (
    <div className={styles.signupPage}>
      <GettingStartedHeader />
      <div className={styles.onboardingTextBlock}>
        <h1>Let's Get Started</h1>
      </div>
      <GettingStartedForm
        formState={formState}
        setField={(field: string, value: string) => setField(formDispatch, field, value)}
      />
      <div className={styles.orDivider}>
        <span>OR</span>
      </div>
      <FederatedAuthOptions />
      <TermsAndConditions passwordError={passwordError} />
      <SubmitButton
        text="Next"
        onClick={() =>
          onClickFirebaseEmailPasswordSignUp(
            router,
            email,
            password,
            duplicatePassword,
            (field, value) => setField(formDispatch, field, value)
          )
        }
      />
    </div>
  );
};

export default GettingStartedContainer;