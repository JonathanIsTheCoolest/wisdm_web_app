import { useEffect, useRef } from "react";
import styles from "../styles/NavigationBar.module.scss";
import Image from "next/image";
import homeIcon from "../assets/icons/home.svg";
import homeActiveIcon from "../assets/icons/home_active.svg";
import exploreIcon from "../assets/icons/explore.svg";
import exploreActiveIcon from "../assets/icons/explore_active.svg";
import profileIcon from "../assets/icons/profile.svg";
import profileActiveIcon from "../assets/icons/profile_active.svg";
import voteIcon from "../assets/icons/vote.svg";
import voteActiveIcon from "../assets/icons/vote_active.svg";
import notificationsIcon from "../assets/icons/notification.svg";
import notificationsActiveIcon from "../assets/icons/notification_active.svg";

const NavigationBar = ({ setCurrentView, currentView }: { setCurrentView: (view: string) => void, currentView: string }) => {

  const handleNavigation = (view: string) => {
    requestAnimationFrame(() => {
      setCurrentView(view);
    });
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navWrapper}>
        <div
          className={`${styles.navItem} ${currentView === "home" ? styles.navItemActive : ""}`}
          onClick={() => handleNavigation("home")}
        >
          <Image src={currentView === "home" ? homeActiveIcon : homeIcon} alt="Home" />
          {currentView === "home" && <span>Home</span>}
        </div>
        
        <div
          className={`${styles.navItem} ${currentView === "explore" ? styles.navItemActive : ""}`}
          onClick={() => handleNavigation("explore")}
        >
          <Image src={currentView === "explore" ? exploreActiveIcon : exploreIcon} alt="Explore" />
          {currentView === "explore" && <span>Explore</span>}
        </div>
        
        <div
          className={`${styles.navItem} ${currentView === "profile" ? styles.navItemActive : ""}`}
          onClick={() => handleNavigation("profile")}
        >
          <Image src={currentView === "profile" ? profileActiveIcon : profileIcon} alt="Profile" />
          {currentView === "profile" && <span>Profile</span>}
        </div>
        
        <div
          className={`${styles.navItem} ${currentView === "vote" ? styles.navItemActive : ""}`}
          onClick={() => handleNavigation("vote")}
        >
          <Image src={currentView === "vote" ? voteActiveIcon : voteIcon} alt="Vote" />
          {currentView === "vote" && <span>Vote</span>}
        </div>
        
        <div
          className={`${styles.navItem} ${currentView === "notifications" ? styles.navItemActive : ""}`}
          onClick={() => handleNavigation("notifications")}
        >
          <Image src={currentView === "notifications" ? notificationsActiveIcon : notificationsIcon} alt="Notifications" />
          {currentView === "notifications" && <span>Notifications</span>}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;