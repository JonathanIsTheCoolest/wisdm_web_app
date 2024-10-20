// System Imports
import React from "react";

// Stylesheet Imports
import styles from "@/app/_components/navigation/Sidebar.module.scss";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`${styles.sidebarContainer} ${isOpen ? styles.active : ""}`}>
      <div className={styles.closeButton} onClick={onClose}>×</div>
      <header className={styles.header}>
        <h1>Wisdm</h1>
      </header>
      <div className={styles.section}>
        <h2>Privacy and Security</h2>
        <div className={styles.item}>
          <span className={styles.label}>Privacy Settings</span>
          <span className={styles.icon}>&gt;</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Security Settings</span>
          <span className={styles.icon}>&gt;</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Blocked Users</span>
          <span className={styles.icon}>&gt;</span>
        </div>
      </div>
      <div className={styles.section}>
        <h2>Notifications</h2>
        <div className={styles.toggleGroup}>
          <label>Push Notifications</label>
          {/* <div
            className={`${styles.toggleSwitch} ${pushNotifications ? "active" : ""}`}
            onClick={togglePushNotifications}
          ></div> */}
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Email Notifications</span>
          <span className={styles.icon}>&gt;</span>
        </div>
      </div>
      <div className={styles.section}>
        <h2>Display and Accessibility</h2>
        <div className={styles.item}>
          <span className={styles.label}>Themes</span>
          <span className={styles.icon}>&gt;</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Languages</span>
          <span className={styles.icon}>&gt;</span>
        </div>
      </div>
      <div className={styles.section}>
        <h2>Support and Feedback</h2>
        <div className={styles.item}>
          <span className={styles.label}>Help Center</span>
          <span className={styles.icon}>&gt;</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
