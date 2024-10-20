'use client';

// System Imports
import React from 'react';

// Component Imports
import { ThemeContext } from '@/app/_contexts/ThemeContext';

// Stylesheet Imports
import styles from '@/app/_components/buttons/ThemeToggle.module.scss';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className={`${styles.themeToggle} ${className || ''}`}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;