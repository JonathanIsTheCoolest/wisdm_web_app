"use client";

import { useState, useEffect } from "react";
import styles from "../styles/page.module.scss";
import SplashScreen from "./SplashScreen";
import Onboarding from "./Onboarding";
import Home from "./Home";
import Explore from "./Explore";
import Profile from "./Profile";
import Vote from "./Vote";
import Notifications from "./Notifications";
import NavigationBar from "./NavigationBar";

export default function App() {
  const [currentStep, setCurrentStep] = useState("splash");
  const [currentView, setCurrentView] = useState("home");

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentStep("onboarding");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleOnboardingComplete = () => {
    setCurrentStep("home");
  };

  const renderComponent = () => {
    switch (currentView) {
      case "home":
        return <Home />;
      case "explore":
        return <Explore />;
      case "profile":
        return <Profile />;
      case "vote":
        return <Vote />;
      case "notifications":
        return <Notifications />;
      default:
        return <Home />;
    }
  };

  return (
    <main className={styles.main}>
      {currentStep === "splash" && <SplashScreen />}
      {currentStep === "onboarding" && <Onboarding onComplete={handleOnboardingComplete} />}
      {currentStep === "home" && (
        <>
          {renderComponent()}
          <NavigationBar setCurrentView={setCurrentView} currentView={currentView} />
        </>
      )}
    </main>
  );
}