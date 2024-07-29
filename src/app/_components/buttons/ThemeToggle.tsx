'use client';

import React from 'react';
import { useTheme } from '@/app/_contexts/ThemeContext';
import styles from '@/styles/components/buttons/ThemeToggle.module.scss';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className={styles.themeToggle}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;