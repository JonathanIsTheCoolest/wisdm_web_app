'use client'

import wisdm_logo_white from "@/assets/logos/wisdm_logo_white.svg";
import styles from "@/styles/Onboarding.module.scss"
import { SubmitButton } from "@/app/_components/buttons/SubmitButton";
import { signIn } from "@/app/_lib/actions";
import Image from "next/image";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useDispatch } from "react-redux";
import { setUser } from "@/lib/features/userSlice";

const LoginPage = () => {
  const INITIAL_STATE: any = {}

  const inputArray = [
    {label: 'Username or Email', type: 'text', name: 'user'},
    {label: 'Password', type: 'password', name: 'password'},
  ]
  
  const [state, formAction] = useFormState(signIn, INITIAL_STATE)
  const router = useRouter()

  const dispatch = useDispatch()

  useEffect(() => {
    if (state.user) {
      dispatch(setUser(state.user))
      router.push('/dashboard');
    }
  }, [state.user, state.error, router]);
  return (
    <div className={styles.loginPage}>
      <Link href='/login' className={styles.backButton}>
        ←
      </Link>
      <Image src={wisdm_logo_white} alt="Wisdm Logo" className={styles.logo} />
      <h2>Welcome Back</h2>
      <p>Please enter your credentials to Log in</p>
      <form action={formAction}>
        {
          inputArray.map((item) => {
            const {label, type, name} = item
            return (
              <label key={name}>
                {label}
                <input
                  type={type}
                  placeholder={label}
                  name={name}
                  className={styles.inputField}
                  required={true}
                />
              </label>
            )
          })
        }
        <Link href='/login/forgotPassword' className={styles.forgotPassword}>
          Forgot Password?
        </Link>
        <SubmitButton text='Log In'/>
      </form>
    </div>
  )
};

export default LoginPage