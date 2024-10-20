"use client";

// System Imports
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch } from "@/lib/hooks";
import { setUser } from "@/lib/features/userSlice";

// API/Database Imports
import { logInWithEmailAndPassword } from '@/app/_lib/firebase/auth/auth_signin_password';
import { googleSignInSequence } from '@/app/_lib/firebase/auth/google/auth_google_signin_sequence';
import { facebookSignInSequence } from '@/app/_lib/firebase/auth/facebook/auth_facebook_signin_sequence';

// Component Imports
import { SubmitButton } from "@/app/_components/buttons/SubmitButton";

// Stylesheet Imports
import styles from "@/app/pages/login/signin/SignInPage.module.scss";

// Asset Imports
import wisdmLogoBrand from "@/assets/logos/wisdm_logo_brand.svg";
import arrowLeftBrand from "@/assets/icons/arrow_left_brand.svg";
import googleIcon from '@/assets/icons/google.svg';
import facebookIcon from '@/assets/icons/facebook.svg';

const LoginPage = () => {
  const INITIAL_STATE: any = {};

  const inputArray = [
    { label: "Username or Email", type: "text", name: "user" },
    { label: "Password", type: "password", name: "password" },
  ];

  const [state, formAction] = useFormState(signIn, INITIAL_STATE);
  const router = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (state.user) {
      dispatch(setUser(state.user));
      router.push("/dashboard");
    }
  }, [state.user, state.error, router]);
  return (
    <div className={styles.loginPage}>
      <div className={styles.onboardingHeader}>
        <Link href="/pages/login" className={styles.backButton}>
          <Image src={arrowLeftBrand} />
        </Link>
      </div>
      <Image src={wisdmLogoBrand} alt="Wisdm Logo" className={styles.logo} />

      <div className={styles.onboardingTextBlock}>
        <h1>Welcome Back</h1>
        <p>Please enter your credentials to Log in</p>
      </div>

      <form action={formAction}>
        {inputArray.map((item) => {
          const { label, type, name } = item;
          return (
            <div key={name} className={styles.labelWrapper}>
              <input
                type={type}
                placeholder={label}
                name={name}
                required={true}
              />
            </div>
          );
        })}
        <Link href="/pages/login/forgotpassword" className={styles.forgotPassword}>
          Forgot Password?
        </Link>

        <SubmitButton text="Log In" />

        <div className={styles.orDivider}>
          <span>OR</span>
        </div>

        <div className={styles.authWrapper}>
          <button className={styles.authButton} onClick={googleSignInSequence}>
            <Image src={googleIcon} alt="Google Icon"/>
            Continue with Google
          </button>
          <button className={styles.authButton} onClick={facebookSignInSequence}>
          <Image src={facebookIcon}/>
            Continue with Facebook
          </button>
        </div>
        <SubmitButton text="Log In" onClick={onClickFirebaseEmailPasswordLogin}/>
      </form>
    </div>
  );
};

export default LoginPage;
