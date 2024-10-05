'use client';

import React from 'react';
import { ThemeContext } from '@/app/_contexts/ThemeContext';
import styles from '@/styles/components/buttons/ThemeToggle.module.scss';

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