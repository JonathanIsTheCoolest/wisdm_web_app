"use client";

// System Imports
import React from "react";

// Component Imports
import { ThemeContext } from "@/app/_contexts/ThemeContext";
import ToggleSwitch from "@/app/_components/buttons/ToggleSwitch";

// Stylesheet Imports
import styles from "@/app/_components/buttons/ThemeToggle.module.scss";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  return (
    <ToggleSwitch
      isOn={theme === "light"}
      handleToggle={toggleTheme}
      onClick={toggleTheme}
    />
  );
};

export default ThemeToggle;
