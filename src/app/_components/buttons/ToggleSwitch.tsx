// System Imports
import React from "react";

// Stylesheet Imports
import styles from "./ToggleSwitch.module.scss";

interface ToggleSwitchProps {
  isOn: boolean;
  handleToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, handleToggle }) => {
  return (
    <label className={styles.toggleWrapper}>
      <input type="checkbox" checked={isOn} onChange={handleToggle} />
      <span className={`${styles.toggleSlider} ${isOn ? styles.on : ""}`}>
        <span className={styles.toggleCircle}></span>
      </span>
    </label>
  );
};

export default ToggleSwitch;
