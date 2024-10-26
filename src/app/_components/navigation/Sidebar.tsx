// System Imports
import React, { useContext } from "react";
import Image from "next/image";

// API/Database Imports
import { onSignOut } from "@/app/_lib/firebase/auth/auth_sign_out";
import { ThemeContext } from "@/app/_contexts/ThemeContext";

// Stylesheet Imports
import styles from "@/app/_components/navigation/Sidebar.module.scss";

// Asset Imports
import wisdmLogoBrand from "@/assets/logos/wisdm_logo_brand.svg";
import wisdmLogoWhite from "@/assets/logos/wisdm_logo_white.svg";
import arrowRightBrand from "@/assets/icons/arrow_right_brand.svg";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.sidebarContainer} ${isOpen ? styles.active : ""}`}>
      <div className={styles.closeButton} onClick={onClose}>×</div>
      <header className={styles.sidebarHeader}>
        <h1>Wisdm</h1>
        <Image 
          src={theme === 'light' ? wisdmLogoBrand : wisdmLogoWhite} 
          alt="Wisdm Logo" 
        />
      </header>
      <h2>Privacy and Security</h2>
      <div className={styles.sidebarSection}>
        <div className={styles.sidebarItem}>
          <p>Privacy Settings</p>
          <span>
            <Image 
              src={arrowRightBrand}
              alt="Arrow Right"
            />
          </span>
        </div>
        <div className={styles.sidebarItem}>
          <p>Security Settings</p>
          <span>
            <Image 
              src={arrowRightBrand}
              alt="Arrow Right"
            />
          </span>
        </div>
        <div className={styles.sidebarItem}>
          <p>Blocked Users</p>
          <span>
            <Image 
              src={arrowRightBrand}
              alt="Arrow Right"
            />
          </span>
        </div>
      </div>
      <h2>Notifications</h2>
      <div className={styles.sidebarSection}>
        <div className={styles.sidebarItem}>
          <p>Email Notifications</p>
          <span>
            <Image 
              src={arrowRightBrand}
              alt="Arrow Right"
            />
          </span>
        </div>
      </div>
      <h2>Display and Accessibility</h2>
      <div className={styles.sidebarSection}>
        <div className={styles.sidebarItem}>
          <p>Themes</p>
          <span>
            <Image 
              src={arrowRightBrand}
              alt="Arrow Right"
            />
          </span>
        </div>
        <div className={styles.sidebarItem}>
          <p>Languages</p>
          <span>
            <Image 
              src={arrowRightBrand}
              alt="Arrow Right"
            />
          </span>
        </div>
      </div>
      <h2>Support and Feedback</h2>
      <div className={styles.sidebarSection}>
        <div className={styles.sidebarItem}>
          <p>Help Center</p>
          <span>
            <Image 
              src={arrowRightBrand}
              alt="Arrow Right"
            />
          </span>
        </div>
        <div className={styles.sidebarItem}>
          <p onClick={onSignOut}>Log Out</p>
          <span>
            <Image 
              src={arrowRightBrand}
              alt="Arrow Right"
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
