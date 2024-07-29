"use client";

import wisdmLogoWhite from "@/assets/logos/wisdm_logo_white.svg";
import wisdmLogoBrand from "@/assets/logos/wisdm_logo_brand.svg";
import arrowLeftWhite from "@/assets/icons/arrow_left_white.svg";
import arrowLeftBrand from "@/assets/icons/arrow_left_brand.svg";
import styles from "@/styles/login/signIn/signIn.module.scss";
import { SubmitButton } from "@/app/_components/buttons/SubmitButton";
import { signIn } from "@/app/_lib/actions";
import Image from "next/image";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useAppDispatch } from "@/lib/hooks";
import { setUser } from "@/lib/features/userSlice";

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
        <Link href="/login" className={styles.backButton}>
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
        <Link href="/login/forgotPassword" className={styles.forgotPassword}>
          Forgot Password?
        </Link>
        <SubmitButton text="Log In" />
      </form>
    </div>
  );
};

export default LoginPage;
