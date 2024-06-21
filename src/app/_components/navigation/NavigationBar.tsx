import { useState } from "react";
import styles from "@/styles/NavigationBar.module.scss";
import Image, { StaticImageData } from "next/image";
import homeIcon from "@/assets/icons/home.svg";
import homeActiveIcon from "@/assets/icons/home_active.svg";
import exploreIcon from "@/assets/icons/explore.svg";
import exploreActiveIcon from "@/assets/icons/explore_active.svg";
import profileIcon from "@/assets/icons/profile.svg";
import profileActiveIcon from "@/assets/icons/profile_active.svg";
import voteIcon from "@/assets/icons/vote.svg";
import voteActiveIcon from "@/assets/icons/vote_active.svg";
import notificationsIcon from "@/assets/icons/notification.svg";
import notificationsActiveIcon from "@/assets/icons/notification_active.svg";
import Link from "next/link";

const NavigationBar = () => {
  const [currentView, setCurrentView] = useState('home')

  const navOptionsArray = [
    {name: 'home', href: '/', alt: 'Home', activeIcon: homeActiveIcon, inactiveIcon: homeIcon},
    {name: 'explore', href: '/explore', alt: 'Explore', activeIcon: exploreActiveIcon, inactiveIcon: exploreIcon},
    {name: 'profile', href: '/profile', alt: 'Profile', activeIcon: profileActiveIcon, inactiveIcon: profileIcon},
    {name: 'vote', href: '/vote', alt: 'Vote', activeIcon: voteActiveIcon, inactiveIcon: voteIcon},
    {name: 'notifications', href: '/notifications', alt: 'Notifications', activeIcon: notificationsActiveIcon, inactiveIcon: notificationsIcon},
  ]

  const navOption = (name: string, href: string, alt: string, activeIcon: StaticImageData, inactiveIcon: StaticImageData) => {
    return (
      <Link
      href={`/dashboard${href}`}
      key={name}
      className={`${styles.navItem} ${currentView === name ? styles.navItemActive : ""}`}
      onClick={() => setCurrentView(name)}
    >
      <Image src={currentView === name ? activeIcon : inactiveIcon} alt={alt} />
      {currentView === name && <span>{alt}</span>}
    </Link>
    )
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navWrapper}>
        {
          navOptionsArray.map((item) => {
            const {name, href, alt, activeIcon, inactiveIcon} = item
            return navOption(name, href, alt, activeIcon, inactiveIcon)
          })
        }
      </div>
    </nav>
  );
};

export default NavigationBar;