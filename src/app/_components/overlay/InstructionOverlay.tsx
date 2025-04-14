import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import styles from "./InstructionOverlay.module.scss";

interface InstructionOverlayProps {
  isVisible: boolean;
  onClose: () => void;
  triggerPosition?: { x: number; y: number } | null;
}

interface InstructionContent {
  title: string;
  instructions: string[];
}

const ROUTE_INSTRUCTIONS: Record<string, InstructionContent> = {
  "/dashboard": {
    title: "How to Use",
    instructions: [
      "Scroll sideways for different themes",
      "Scroll down for more posts",
    ],
  },
  "/dashboard/timeline": {
    title: "Timeline View",
    instructions: [
      "Click on posts to expand them",
      "Use the navigation bar to switch between dates",
    ],
  },
  "/dashboard/explore": {
    title: "Explore View",
    instructions: [
      "Explore featured posts based on your interests, trending comments, and trending posts.",
    ],
  },
  // Add more routes and their instructions as needed
};

const InstructionOverlay: React.FC<InstructionOverlayProps> = ({
  isVisible,
  onClose,
  triggerPosition = null,
}) => {
  const pathname = usePathname();
  const [animationOrigin, setAnimationOrigin] = useState(() => ({
    x: typeof window !== "undefined" ? window.innerWidth - 60 : 0,
    y: 60,
  }));

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!triggerPosition) {
      setAnimationOrigin({
        x: window.innerWidth - 60,
        y: 60,
      });
    }
  }, []);

  useEffect(() => {
    if (isVisible && triggerPosition) {
      setAnimationOrigin(triggerPosition);
    }
  }, [isVisible, triggerPosition]);

  const content =
    pathname && ROUTE_INSTRUCTIONS[pathname]
      ? ROUTE_INSTRUCTIONS[pathname]
      : ROUTE_INSTRUCTIONS["/dashboard"];

  const initialScale = 0.01;
  const screenDiagonal = Math.sqrt(
    Math.pow(typeof window !== "undefined" ? window.innerWidth : 1920, 2) +
      Math.pow(typeof window !== "undefined" ? window.innerHeight : 1080, 2)
  );

  const scaleTo = screenDiagonal / 15;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.overlayContainer}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className={styles.circleExpand}
            initial={{
              scale: initialScale,
              left: animationOrigin.x - 20,
              top: animationOrigin.y - 20,
              borderRadius: "50%",
            }}
            animate={{
              scale: scaleTo,
              borderRadius: "0%",
            }}
            exit={{
              scale: initialScale,
              borderRadius: "50%",
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
              mass: 0.5,
            }}
            style={{
              position: "fixed",
              transformOrigin: "center center",
            }}
          />
          <motion.div
            className={styles.overlayContent}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <h2>{content.title}</h2>
            {content.instructions.map((instruction: string, index: number) => (
              <p key={index}>{instruction}</p>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InstructionOverlay;
