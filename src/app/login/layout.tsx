import React, { ReactNode } from 'react';
import styles from '@/styles/Onboarding.module.scss';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <div className={styles.onboardingWrapper}>{children}</div>;
};

export default Layout;