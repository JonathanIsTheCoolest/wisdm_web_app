import FederatedAuthButton from "@/app/_components/buttons/FederatedAuthButton/FederatedAuthButton";
import googleIcon from "@/assets/icons/google.svg";
import facebookIcon from "@/assets/icons/facebook.svg";
import { googleSignInSequence } from "@/app/_lib/firebase/auth/google/auth_google_signin_sequence";
import { facebookSignInSequence } from "@/app/_lib/firebase/auth/facebook/auth_facebook_signin_sequence";
import styles from "@/app/(pages)/login/signup/SignUpPage.module.scss";

const FederatedAuthOptions = () => (
  <div className={styles.authWrapper}>
    <FederatedAuthButton src={googleIcon} alt="Google Icon" text="Continue with Google" onClick={googleSignInSequence} />
    <FederatedAuthButton src={facebookIcon} alt="Facebook Icon" text="Continue with Facebook" onClick={facebookSignInSequence} />
  </div>
);

export default FederatedAuthOptions;
