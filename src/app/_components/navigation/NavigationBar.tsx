// System Imports
import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useContext,
} from "react";
import { usePathname } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/redux_lib/hooks";

// Context Imports
import { ThemeContext } from "@/app/_contexts/ThemeContext";

// Stylesheet Imports
import styles from "@/app/_components/navigation/NavigationBar.module.scss";

// Asset Imports
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
import navbarCurve from "@/assets/icons/navbar_curve.svg";

const NavigationBar = () => {
  const [currentView, setCurrentView] = useState<string | null>(null);
  const elementRef = useRef<HTMLImageElement | null>(null);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const pathname = usePathname();
  const notifications = useAppSelector(state => state.notifications)

  function extractLastSegment(path: string) {
    const pattern = /\/([^\/?]+)(?=\?|$)/;
    const match = path.match(pattern);
    if (match) {
      if (match[1] === "dashboard" || match[1] === "signIn") {
        return "home";
      } else {
        return match[1];
      }
    } else {
      return null;
    }
  }

  const isDarkMode = theme === "dark";

  const navOptionsArray = [
    {
      name: "home",
      href: "/",
      alt: "Home",
      activeIcon: homeActiveIcon,
      inactiveIcon: isDarkMode ? homeIcon : homeLightMode,
    },
    {
      name: "explore",
      href: "/explore",
      alt: "Explore",
      activeIcon: exploreActiveIcon,
      inactiveIcon: isDarkMode ? exploreIcon : exploreLightMode,
    },
    {
      name: "profile",
      href: "/profile",
      alt: "Profile",
      activeIcon: profileActiveIcon,
      inactiveIcon: isDarkMode ? profileIcon : profileLightMode,
    },
    {
      name: "vote",
      href: "/vote",
      alt: "Vote",
      activeIcon: voteActiveIcon,
      inactiveIcon: isDarkMode ? voteIcon : voteLightMode,
    },
    {
      name: "notifications",
      href: "/notifications",
      alt: "Notifications",
      activeIcon: notificationsActiveIcon,
      inactiveIcon: isDarkMode ? notificationsIcon : notificationsLightMode,
    },
  ];

  const navOption = (
    name: string,
    href: string,
    alt: string,
    activeIcon: StaticImageData,
    inactiveIcon: StaticImageData
  ) => (
    <Link
      href={`/dashboard${href}`}
      key={name}
      data-name={name}
      className={`${styles.navbarItem} ${
        currentView === name ? styles.navbarItemActive : ""
      }`}
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
    const circle: HTMLElement | null = document.querySelector(
      '[data-name="circle"]'
    );

    if (currentElement && circle) {
      const rect = currentElement.getBoundingClientRect();
      const circleSize = circle.getBoundingClientRect().width;

      const distances = {
        left: rect.left + rect.width / 2 - circleSize / 2,
        bottom:
          window.innerHeight - rect.bottom - rect.height / 2 + circleSize / 2,
      };

      if (circle) {
        circle.style.left = `${distances.left}px`;
        // To be refactored at a later time ↓
        // circle.style.bottom = `${distances.bottom + bottomPadding}px`;
      }
    }
  };

  useEffect(() => {
    if (pathname) {
      const newView = extractLastSegment(pathname);
      setCurrentView(newView);
    }
  }, [pathname]);

  useLayoutEffect(() => {
    updateCirclePosition(6);

    const handleResize = () => {
      updateCirclePosition(-10);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [currentView]);

  return (
    <nav className={styles.navbarWrapper}>
      <div className={styles.navbarContainer}>
        {navOptionsArray.map((item) => {
          const { name, href, alt, activeIcon, inactiveIcon } = item;
          return navOption(name, href, alt, activeIcon, inactiveIcon);
        })}
      </div>
      {currentView && (
        <div data-name="circle" className={styles.navbarCircle}>
          <svg
            width="112"
            height="59"
            viewBox="0 0 112 59"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.navbarEllipse}
          >
            <path
              d="M112 23C80 23 86.9279 59 56 59C25.0721 59 33 23 0 23C20 23 25.0721 23 56 23C86.9279 23 92 23 112 23Z"
              fill="white" // Hardcoded for testing
              className={styles.navbarCurveBackground}
            />
            <circle
              cx="56"
              cy="30"
              r="23"
              fill="#6A5DB9" // Hardcoded for testing
              className={styles.navbarCurveCircle}
            />
          </svg>
          <div className={styles.navbarInnerCircle}></div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
