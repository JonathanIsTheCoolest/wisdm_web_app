"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./PageTransition.module.scss";

interface PageTransitionProps {
  children: ReactNode;
}

const navOrder = ["home", "explore", "profile", "vote", "notifications"];

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const pathname = usePathname();
  const [prevPath, setPrevPath] = useState<string | null>(null);
  const [displayContent, setDisplayContent] = useState<ReactNode>(children);
  const [previousContent, setPreviousContent] = useState<ReactNode | null>(
    null
  );
  const [transitionClass, setTransitionClass] = useState<string>("");
  const isTransitioning = useRef(false);

  useEffect(() => {
    console.log("PageTransition useEffect triggered");
    console.log("Current Pathname:", pathname);
    console.log("Previous Pathname:", prevPath);
    console.log("Children:", children);

    if (!prevPath || isTransitioning.current) {
      setPrevPath(pathname);
      setDisplayContent(children);
      return;
    }

    const currentPage = pathname.split("/").pop() || "home";
    const prevPage = prevPath.split("/").pop() || "home";

    const currentIndex = navOrder.indexOf(currentPage);
    const prevIndex = navOrder.indexOf(prevPage);

    if (currentIndex !== prevIndex) {
      isTransitioning.current = true;

      setPreviousContent(displayContent);

      const direction =
        currentIndex > prevIndex ? styles.slideFromRight : styles.slideFromLeft;
      setTransitionClass(direction);

      const timer = setTimeout(() => {
        setDisplayContent(children);
        setPrevPath(pathname);

        const cleanupTimer = setTimeout(() => {
          setPreviousContent(null);
          setTransitionClass("");
          isTransitioning.current = false;
        }, 500);

        return () => clearTimeout(cleanupTimer);
      }, 50);

      return () => clearTimeout(timer);
    } else {
      setDisplayContent(children);
      setPrevPath(pathname);
      setPreviousContent(null);
      setTransitionClass("");
    }
  }, [pathname, children, prevPath]);

  return (
    <div className={styles.transitionContainer}>
      {previousContent && (
        <div
          className={`${styles.transitionContent} ${
            transitionClass === styles.slideFromRight
              ? styles.slideToLeft
              : styles.slideToRight
          }`}
        >
          {previousContent}
        </div>
      )}
      <div className={`${styles.transitionContent} ${transitionClass}`}>
        {displayContent}
      </div>
    </div>
  );
};

export default PageTransition;
