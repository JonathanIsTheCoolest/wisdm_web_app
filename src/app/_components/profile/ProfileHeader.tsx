import React from "react";
import Image from "next/image";
import styles from "@/styles/components/profile/ProfileHeader.module.scss";

interface User {
  avatarUrl: string;
  username: string;
  bio: string;
}

interface ProfileHeaderProps {
  user: User;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <div className={styles.profileHeader}>
      <div className={styles.avatar}>
        <Image src={user.avatarUrl} alt={`${user.username}'s avatar`} fill style={{ objectFit: "cover" }} />
      </div>
      <div className={styles.userInfo}>
        <h2 className={styles.username}>{user.username}</h2>
        <p className={styles.bio}>{user.bio}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;