// System Imports
import React, { useContext, useState } from "react";
import Image from "next/image";

// API/Database Imports
import { onSignOut } from "@/app/_lib/firebase/auth/auth_sign_out";
import { ThemeContext } from "@/app/_contexts/ThemeContext";

// Component Imports
import ToggleSwitch from "@/app/_components/buttons/ToggleSwitch";
import ThemeToggle from "@/app/_components/buttons/ThemeToggle";

// Stylesheet Imports
import styles from "@/app/_components/navigation/Sidebar.module.scss";

// Asset Imports
import wisdmLogoBrand from "@/assets/logos/wisdm_logo_brand.svg";
import wisdmLogoWhite from "@/assets/logos/wisdm_logo_white.svg";
import arrowRightBrand from "@/assets/icons/arrow_right_brand.svg";
import closeIcon from "@/assets/icons/close.svg";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { theme } = useContext(ThemeContext);
  const [isPushNotificationsOn, setIsPushNotificationsOn] = useState(false);

  return (
    <div
      className={`${styles.sidebarContainer} ${isOpen ? styles.active : ""}`}
    >
      <header className={styles.sidebarHeader}>
        <div className={styles.logoContainer}>
          <Image
            src={theme === "light" ? wisdmLogoBrand : wisdmLogoWhite}
            alt="Wisdm Logo"
          />
          <h1>WISDM</h1>
        </div>
        <p className={styles.closeButton} onClick={onClose}>
          <Image src={closeIcon} alt="Close" />
        </p>
      </header>
      <h2>Privacy and Security</h2>
      <div className={styles.sidebarSection}>
        <div className={styles.sidebarItem}>
          <p>Privacy Settings</p>
          <Image src={arrowRightBrand} alt="Arrow Right" />
        </div>
        <div className={styles.sidebarItem}>
          <p>Security Settings</p>
          <Image src={arrowRightBrand} alt="Arrow Right" />
        </div>
      </div>
      <h2>Notifications</h2>
      <div className={styles.sidebarSection}>
        <div className={styles.sidebarItem}>
          <p>Email Notifications</p>
          <Image src={arrowRightBrand} alt="Arrow Right" />
        </div>
        <div className={styles.sidebarItem}>
          <p>Push Notifications</p>
          <ToggleSwitch
            isOn={isPushNotificationsOn}
            handleToggle={() =>
              setIsPushNotificationsOn(!isPushNotificationsOn)
            }
          />
        </div>
      </div>
      <h2>Display and Accessibility</h2>
      <div className={styles.sidebarSection}>
        <div className={styles.sidebarItem}>
          <p>Themes</p>
          <Image src={arrowRightBrand} alt="Arrow Right" />
        </div>
        <div className={styles.sidebarItem}>
          <p>Languages</p>
          <Image src={arrowRightBrand} alt="Arrow Right" />
        </div>
        <div className={styles.sidebarItem}>
          <p>Dark/Light Mode</p>
          <ThemeToggle />
        </div>
      </div>
      <h2>Support and Feedback</h2>
      <div className={styles.sidebarSection}>
        <div className={styles.sidebarItem}>
          <p>Help Center</p>
          <Image src={arrowRightBrand} alt="Arrow Right" />
        </div>
        <div className={styles.sidebarItem}>
          <p onClick={onSignOut}>Log Out</p>
          <Image src={arrowRightBrand} alt="Arrow Right" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
