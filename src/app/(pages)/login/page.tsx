'use client'

// System Imports
import { useContext, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";

// API/Database Imports
import { authFunctionWrapper, getUser } from "@/app/_lib/actions";
import { ThemeContext } from "@/app/_contexts/ThemeContext";

// Stylesheet Imports
import styles from "@/app/(pages)/login/StartScreen.module.scss";

// Asset Imports
import wisdmLogoWhite from "@/assets/logos/wisdm_logo_white.svg";
import wisdmLogoBrand from "@/assets/logos/wisdm_logo_brand.svg";

const OnboardingPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={styles.startScreenWrapper}>
      <Image 
        src={theme === 'light' ? wisdmLogoBrand : wisdmLogoWhite} 
        alt="Wisdm Logo" 
      />
      <h1>WISDM</h1>
      <Link href="/login/signup" className={styles.signupButton}>
        Sign Up
      </Link>
      <Link href="/login/signin" className={styles.loginButton}>
        Log In
      </Link>
    </div>
  );
};

export default OnboardingPage;
