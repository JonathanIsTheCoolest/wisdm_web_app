'use client'

import { useState } from "react";
import styles from "@/styles/components/loading/SplashScreen.module.scss";
import Image from "next/image";
import wisdm_logo_white from "@/assets/logos/wisdm_logo_white.svg";

const SplashScreen = () => {
    const [fadeOut, setFadeOut] = useState(false);

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