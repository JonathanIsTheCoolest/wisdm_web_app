// System Imports
import React, { ReactNode } from 'react';

// Component Imports
import ThemeToggle from '@/src/app/_components/buttons/ThemeToggle';

// Stylesheet Imports
import styles from '@/app/(pages)/login/StartScreen.module.scss';
import themeToggleStyles from '@/app/_components/buttons/ThemeToggle.module.scss';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.onboardingWrapper}>
      <ThemeToggle className={themeToggleStyles.loginThemeToggle} />
      {children}
    </div>
  );
};

export default Layout;