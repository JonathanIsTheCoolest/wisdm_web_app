'use client'

// System Imports
import React, { ReactNode, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

// API/Database Imports
import { handleSocketConnection, handleSocketCleanup } from '@/app/_lib/socket';

// Component Imports
import NavigationBar from '@/app/_components/navigation/NavigationBar';
import Sidebar from '@/app/_components/navigation/Sidebar';
import styles from '@/styles/page.module.scss';
import { handleSocketConnection, handleSocketCleanup } from '../_lib/socket';
import withAuth from '@/app/_components/auth/withAuth';

// Stylesheet Imports
import styles from '@/app/page.module.scss';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const pathname = usePathname();

  useEffect(() => {
    const cleanup = handleSocketCleanup(handleSocketConnection);
    return () => {
      cleanup();
    };
  }, []);

  const shouldShowNavBar = !pathname.includes('/timeline');

  return <div className={styles.onboardingWrapper}>
    {children}
    {shouldShowNavBar && <NavigationBar/>}
    <Sidebar isActive={showSidebar} toggleSidebar={toggleSidebar} />
  </div>;
};

export default Layout;

































// 'use client'

// import React, { ReactNode, useState } from 'react';
// import NavigationBar from '@/app/_components/navigation/NavigationBar';
// import Sidebar from '@/app/_components/navigation/Sidebar';
// import styles from '@/styles/Onboarding.module.scss';

// interface LayoutProps {
//   children: ReactNode;
// }

// const Layout: React.FC<LayoutProps> = ({ children }) => {

//   const [showSidebar, setShowSidebar] = useState(false);
//   const toggleSidebar = () => setShowSidebar(!showSidebar);

//   return <div className={styles.onboardingWrapper}>
//     {children}
//     <NavigationBar/>
//     <Sidebar isActive={showSidebar} toggleSidebar={toggleSidebar} />
//   </div>;
// };

// export default Layout;
