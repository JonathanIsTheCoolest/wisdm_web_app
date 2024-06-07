import { JSX } from "react";

import styles from "../styles/page.module.scss";
import SplashScreen from "./SplashScreen";

export default function Home(): JSX.Element {
  return (
    <main className={styles.main}>

      <SplashScreen />

    </main>
  );
}