// System Imports
import type { Metadata } from "next";

// API/Database Imports
import { ThemeProvider } from '@/app/_contexts/ThemeContext';
<<<<<<< Updated upstream
=======

// Component Imports
import StoreProvider from "./StoreProvider";
import AuthWrapper from "./_components/auth/AuthWrapper";
>>>>>>> Stashed changes

// Stylesheet Imports
import '../../styles/variables.scss';
import '../../styles/globals.scss';
import '../../styles/main.scss';
import styles from '@/app/page.module.scss'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Wisdm Web App",
  description: "Social media/news app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className={styles.main}>
          <StoreProvider>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </StoreProvider>
        </main>
      </body>
    </html>
  );
<<<<<<< Updated upstream
}
=======
}

// import type { Metadata } from "next";
// import './styles/variables.scss';
// import '../../styles/globals.scss';
// import '../../styles/main.scss';
// import styles from '@/styles/page.module.scss'
// import StoreProvider from "./StoreProvider";
// import { ThemeProvider } from '@/app/_contexts/ThemeContext';

// export const dynamic = 'force-dynamic'

// export const metadata: Metadata = {
//   title: "Wisdm Web App",
//   description: "Social media/news app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body>
//         <main className={styles.main}>
//           <StoreProvider>
//             <ThemeProvider>
//               {children}
//             </ThemeProvider>
//           </StoreProvider>
//         </main>
//       </body>
//     </html>
//   );
// }
>>>>>>> Stashed changes
