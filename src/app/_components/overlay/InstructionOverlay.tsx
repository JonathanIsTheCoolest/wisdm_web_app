import React from "react";
import { usePathname } from "next/navigation";
import styles from "./InstructionOverlay.module.scss";

interface InstructionOverlayProps {
  isVisible: boolean;
  onClose: () => void;
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
}) => {
  const pathname = usePathname();

  if (!isVisible) return null;

  // Get content for current route, or fallback to dashboard content
  const content =
    ROUTE_INSTRUCTIONS[pathname] || ROUTE_INSTRUCTIONS["/dashboard"];

  return (
    <div className={styles.overlayContainer} onClick={onClose}>
      <div
        className={styles.overlayContent}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{content.title}</h2>
        {content.instructions.map((instruction, index) => (
          <p key={index}>{instruction}</p>
        ))}
      </div>
    </div>
  );
};

export default InstructionOverlay;
