import React, { ReactNode } from 'react';
import styles from '@/styles/login/startScreen.module.scss';
import themeToggleStyles from '@/styles/login/loginThemeToggle.module.scss';
import ThemeToggle from '@/app/_components/buttons/ThemeToggle';

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