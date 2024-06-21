import React, { useState } from "react";
import styles from "@/styles/Sidebar.module.scss";

interface SidebarProps {
  isActive: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isActive , toggleSidebar }) => {
  const [pushNotifications, setPushNotifications] = useState(true);

  const togglePushNotifications = () => {
    setPushNotifications(!pushNotifications);
  };

  return (
    <div className={`${styles.sidebarContainer} ${isActive ? styles.active : ""}`}>
      <div className={styles.closeButton} onClick={toggleSidebar}>×</div>
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
          <div
            className={`${styles.toggleSwitch} ${pushNotifications ? "active" : ""}`}
            onClick={togglePushNotifications}
          ></div>
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