import { useEffect, useState } from "react";
import styles from "../styles/SplashScreen.module.scss";
import Onboarding from "./Onboarding";
import Home from "./Home";
import Image from "next/image";
import wisdm_logo_white from "../assets/logos/wisdm_logo_white.svg";

const SplashScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 500); // Duration of the fade-out transition
      }, 3000); // Adjust the timeout duration as needed
  
      return () => clearTimeout(timer);
    }, []);

    return (
      <main className={styles.main}>
        <div className={styles.splashScreen}>
          <div className={styles.splashContent}>
            <Image src={wisdm_logo_white} alt="Wisdm Logo" />
          </div>
        </div>
      </main>
    );
  };
  
  export default SplashScreen;

