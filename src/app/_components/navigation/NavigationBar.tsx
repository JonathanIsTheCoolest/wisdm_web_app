import { useState, useEffect, useRef, useLayoutEffect } from "react";
import styles from "@/styles/components/navigation/NavigationBar.module.scss";
import Image, { StaticImageData } from "next/image";
import homeIcon from "@/assets/icons/home.svg";
import homeActiveIcon from "@/assets/icons/home_active_clear.svg";
import homeLightMode from "@/assets/icons/home_lightmode.svg";
import exploreIcon from "@/assets/icons/explore.svg";
import exploreActiveIcon from "@/assets/icons/explore_active_clear.svg";
import exploreLightMode from "@/assets/icons/explore_lightmode.svg";
import profileIcon from "@/assets/icons/profile.svg";
import profileActiveIcon from "@/assets/icons/profile_active_clear.svg";
import profileLightMode from "@/assets/icons/profile_lightmode.svg";
import voteIcon from "@/assets/icons/vote.svg";
import voteActiveIcon from "@/assets/icons/vote_active_clear.svg";
import voteLightMode from "@/assets/icons/vote_lightmode.svg";
import notificationsIcon from "@/assets/icons/notification.svg";
import notificationsActiveIcon from "@/assets/icons/notification_active_clear.svg";
import notificationsLightMode from "@/assets/icons/notification_lightmode.svg";
import ellipse from "@/assets/icons/ellipse.svg"
import navbarCurveLight from "@/assets/icons/navbar_curve_light.svg"
import Link from "next/link";

const NavigationBar = () => {
  const [currentView, setCurrentView] = useState<string | null>(null);
  const elementRef = useRef<HTMLImageElement | null>(null);

  function extractLastSegment(path: string) {
    const pattern = /\/([^\/?]+)(?=\?|$)/;
    const match = path.match(pattern);
    if (match) {
      if (match[1] === 'dashboard' || match[1] === 'signIn') {
        return 'home';
      } else {
        return match[1];
      }
    } else {
      return null;
    }
  }

  const INITIAL_VIEW: string | null = typeof document !== 'undefined' && document.location.pathname ? extractLastSegment(document.location.pathname) : 'home';
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navOptionsArray = [
    { 
      name: 'home', 
      href: '/', 
      alt: 'Home', 
      activeIcon: homeActiveIcon, 
      inactiveIcon: isDarkMode ? homeIcon : homeLightMode
    },
    { 
      name: 'explore', 
      href: '/explore', 
      alt: 'Explore', 
      activeIcon: exploreActiveIcon, 
      inactiveIcon: isDarkMode ? exploreIcon : exploreLightMode
    },
    { 
      name: 'profile', 
      href: '/profile', 
      alt: 'Profile', 
      activeIcon: profileActiveIcon, 
      inactiveIcon: isDarkMode ? profileIcon : profileLightMode
    },
    { 
      name: 'vote', 
      href: '/vote', 
      alt: 'Vote', 
      activeIcon: voteActiveIcon, 
      inactiveIcon: isDarkMode ? voteIcon : voteLightMode
    },
    { 
      name: 'notifications', 
      href: '/notifications', 
      alt: 'Notifications', 
      activeIcon: notificationsActiveIcon, 
      inactiveIcon: isDarkMode ? notificationsIcon : notificationsLightMode
    },
  ];

  const navOption = (name: string, href: string, alt: string, activeIcon: StaticImageData, inactiveIcon: StaticImageData) => (
    <Link
      href={`/dashboard${href}`}
      key={name}
      data-name={name}
      className={`${styles.navItem} ${currentView === name ? styles.navItemActive : ""}`}
      onClick={() => setCurrentView(name)}
    >
      <Image
        ref={currentView === name ? elementRef : null}
        src={currentView === name ? activeIcon : inactiveIcon}
        alt={alt}
      />
      {currentView === name && <span>{alt}</span>}
    </Link>
  );

  const updateCirclePosition = (bottomPadding: number = 0) => {
    const currentElement = elementRef.current;
    const circle: HTMLElement | null = document.querySelector('[data-name="circle"]');

    if (currentElement && circle) {
      const rect = currentElement.getBoundingClientRect();
      const circleSize = circle.getBoundingClientRect().width;

      const distances = {
        left: rect.left + (rect.width / 2) - (circleSize / 2),
        bottom: window.innerHeight - rect.bottom - (rect.height / 2) + (circleSize / 2),
      };
      
      if (circle) {
        circle.style.left = `${distances.left}px`;
        // To be refactored at a later time ↓
        // circle.style.bottom = `${distances.bottom + bottomPadding}px`;
      }
    }
  };

  useLayoutEffect(() => {
    updateCirclePosition(6);

    const handleResize = () => {
      updateCirclePosition(-10);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currentView]);

  useEffect(() => {
    setCurrentView(INITIAL_VIEW)
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navWrapper}>
        {navOptionsArray.map((item) => {
          const { name, href, alt, activeIcon, inactiveIcon } = item;
          return navOption(name, href, alt, activeIcon, inactiveIcon);
        })}
      </div>
      {currentView && (
        <div
          data-name="circle"
          className={styles.circle}
        >
          <Image 
            className={styles.ellipse} 
            src={navbarCurveLight} // CHANGE FOR LIGHT & DARK MODE
            alt="ellipse"
          />
          <div
            className={styles.innerCircle}
          ></div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;