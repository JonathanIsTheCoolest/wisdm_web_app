// System Imports
import React, { useState } from "react";
import Image from "next/image";

// Component Imports
import ToggleSwitch from "@/app/_components/buttons/ToggleSwitch";

// Stylesheet Imports
import styles from "@/app/_components/profile/UserSettings.module.scss";

// Asset Imports
import placeholderAvatar from "@/assets/icons/user_avatar.svg";
import arrowLeftBrand from "@/assets/icons/arrow_left_brand.svg";
import editIcon from "@/assets/icons/edit.svg";

interface UserSettingsProps {
  user: {
    username: string;
    email: string;
    photo_url?: string | null;
  };
  onBack: () => void;
  isOpen: boolean;
}

const UserSettings: React.FC<UserSettingsProps> = ({ user, onBack, isOpen }) => {
  const [displayUsername, setDisplayUsername] = useState(false);
  const [displayLabels, setDisplayLabels] = useState(false);

  return (
    <div
      className={
        styles.userSettingsContainer +
        (isOpen ? ' ' + styles.active : '')
      }
    >
      <header className={styles.pageTitle}>
        <h1>User Settings</h1>
        <Image
          src={user.photo_url || placeholderAvatar}
          alt={`${user.username}'s avatar`}
          width={160}
          height={160}
        />
        <div className={styles.backButton} onClick={onBack}>
          <Image src={arrowLeftBrand} alt="Back" />
        </div>
      </header>

      <div className={styles.labelWrapper}>
        <label>Username</label>
        <div className={styles.labelContainer}>
          <input
            type="text"
            value={user.username}
            placeholder="test username"
            readOnly
          />
          <span className={styles.editIcon}>
            <Image src={editIcon} alt="edit icon" width={24} height={24} />
          </span>
        </div>
      </div>
      <div className={styles.labelWrapper}>
        <label>Email</label>
        <div className={styles.labelContainer}>
          <input
            type="email"
            value={user.email}
            placeholder="test email"
            readOnly
          />
          <span className={styles.editIcon}>
            <Image src={editIcon} alt="edit icon" width={24} height={24} />
          </span>
        </div>
      </div>

      <div className={styles.settingsContainer}>
        <div className={styles.settingsBody}>
          <label>Display Username</label>
          <p>
            Publicly displays your username when you comment, like, or interact
            with posts.
          </p>
        </div>
        <div className={styles.toggleContainer}>
          <ToggleSwitch
            isOn={displayUsername}
            handleToggle={() => setDisplayUsername(!displayUsername)}
          />
        </div>
      </div>
      <div className={styles.settingsContainer}>
        <div className={styles.settingsBody}>
          <label>Display Labels</label>
          <p>
            Publicly displays your sentiment labels when you comment, like, or
            interact with posts.
          </p>
        </div>
        <div className={styles.toggleContainer}>
          <ToggleSwitch
            isOn={displayLabels}
            handleToggle={() => setDisplayLabels(!displayLabels)}
          />
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
