'use client'

import { ChangeEvent, useState } from "react";

// System Imports
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import InputTemplate from "@/app/_components/inputs/InputTemplate/InputTemplate";
import FederatedAuthButton from "@/app/_components/buttons/FederatedAuthButton/FederatedAuthButton";
import { SubmitButton } from "@/app/_components/buttons/SubmitButton";

import { facebookSignInSequence } from "@/app/_lib/firebase/auth/facebook/auth_facebook_signin_sequence";
import { googleSignInSequence } from "@/app/_lib/firebase/auth/google/auth_google_signin_sequence";
import { signUpWithEmailAndPassword } from "@/app/_lib/firebase/auth/auth_signup_password";
import { isCorrectEmailFormat } from "@/app/_lib/email/isCorrectEmailFormat";
import { generatePassword } from "@/app/_lib/password/generatePassword";

// Stylesheet Imports
import styles from "@/app/(pages)/login/signup/SignUpPage.module.scss";

// Asset Imports
import arrowLeftBrand from "@/assets/icons/arrow_left_brand.svg";
import progressCircle1 from "@/assets/icons/progress_circle_1.svg";
import googleIcon from "@/assets/icons/google.svg";
import facebookIcon from "@/assets/icons/facebook.svg";

const INPUT_GROUP_NAME = 'create_user'

const SignUpPage = () => {
  const [ fullName, setFullName ] = useState<string>('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState<string>('')
  const [ duplicatePassword, setDuplicatePassword ] = useState<string>('')
  const [ nameError, setNameError ] = useState<string>('')
  const [ emailError, setEmailError ] = useState<string>('')
  const [ passwordError, setPasswordError ] = useState<string>('')
  const [ duplicatePasswordError, setDuplicatePasswordError ] = useState<string>('')
  const [ suggestedPassword, setSuggestedPassword ] = useState<string>(generatePassword())

  const router = useRouter()

  const isPasswordVerified = (password: string, duplicatePassword: string) => {
    if (password === duplicatePassword && password.length ) {
      return true
    }
  }
  
  const onClickFirebaseEmailPasswordSignUp = async () => {
    if (isCorrectEmailFormat(email) && isPasswordVerified(password, duplicatePassword)) {
      try {
        const result = await signUpWithEmailAndPassword(email, password)
        const user = result?.user
  
        if (user) {
          router.push('/signup/personal')
        }
      } catch (error: any) {
        console.error(`It looks like there was an error signing you up: ${error}`)
        setPasswordError(error.message)
      }
    }
  }

  const onChangeName = ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => setFullName(value)
  const onChangeEmail = ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => setEmail(value)
  const onChangePassword = ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => setPassword(value)
  const onChangeDuplicatePassword = ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => setDuplicatePassword(value)

  const copyToClipboard = async(text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Password copied to clipboard', text);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  const SuggestedPassword = () => {
    const isUsingSuggestedPassword = password === suggestedPassword && duplicatePassword === suggestedPassword

    return (
      <div
        style={{cursor: 'pointer'}}
      >
        <span>
          <span
            onClick={() => {
              if (isUsingSuggestedPassword) {
                copyToClipboard(suggestedPassword)
              } else {
                setPassword(suggestedPassword)
                setDuplicatePassword(suggestedPassword)
              }
            }}
          >{isUsingSuggestedPassword ? 'Copy to Clipboard' : 'Use Suggested Password'}: </span>
          <span>{suggestedPassword}</span>
        </span>
      </div>
    )
  }

  const inputArray = [
    {id: 'name', type: 'text', value: fullName, text: 'Full Name', placeholder: 'Insert Name', errorMessage: nameError, name: 'create_user', onChange: onChangeName},
    {id: 'email', type: 'email', value: email, text: 'Email', placeholder: 'Email', errorMessage: emailError, name: 'create_user', onChange: onChangeEmail},
    {id: 'password', type: 'password', value: password, text: 'Password', placeholder: 'Password', errorMessage: passwordError, name: 'create_user', onChange: onChangePassword, children: SuggestedPassword()},
  ]

  return (
    <div className={styles.signupPage}>
      <div className={styles.onboardingHeader}>
        <Link href="/login" className={styles.backButton}>
          <Image src={arrowLeftBrand} alt="Back button"/>
        </Link>
        <Image src={progressCircle1} alt="Progress Circle" className={styles.progressCircles} />
      </div>
  
      <div className={styles.onboardingTextBlock}>
        <h1>Let's Get Started</h1>
      </div>
  
      <div className={styles.labelWrapper}>
        {
          inputArray.map((item) => {
            const { id, type, value, text, placeholder, errorMessage, onChange, children } = item
            return (
              <InputTemplate
                id={id}
                type={type}
                value={value}
                text={text}
                placeholder={placeholder}
                errorMessage={errorMessage}
                name={INPUT_GROUP_NAME}
                onChange={onChange}
              >{children}</InputTemplate>
            )
          })
        }
        {
          password.length ?
          <InputTemplate
            id="verifyPassword"
            type="password"
            value={duplicatePassword}
            text="Verify Password"
            placeholder="Re-enter Password"
            name={INPUT_GROUP_NAME}
            onChange={onChangeDuplicatePassword}
          />:
          null
        }
      </div>
  
      <div className={styles.orDivider}>
        <span>OR</span>
      </div>
  
      <div className={styles.authWrapper}>
        <FederatedAuthButton
          src={googleIcon}
          alt="Google Icon"
          text="Continue with Google"
          onClick={googleSignInSequence}
        />
        <FederatedAuthButton
          src={facebookIcon}
          alt="Facebook Icon"
          text="Continue with Facebook"
          onClick={facebookSignInSequence}
        />
      </div>
  
      <div className={styles.nextWrapper}>
        <p className={styles.infoText}>
          By continuing you agree to our <a href="/terms">Terms of Service</a> and{" "}
          <a href="/privacy">Privacy Policy</a>.
        </p>
        <p>{passwordError}</p>
        <SubmitButton
          text="Next"
          onClick={onClickFirebaseEmailPasswordSignUp}
        />
      </div>
    </div>
  );
}

export default SignUpPage;
