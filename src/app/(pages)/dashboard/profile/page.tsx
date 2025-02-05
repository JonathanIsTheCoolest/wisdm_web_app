"use client";

// System Imports
import React, { useState, useEffect } from "react";
import Image from "next/image";

// API/Database Imports

// Component Imports
import ProfileTabs from "@/app/_components/profile/ProfileTabs";
import UserSettings from "@/app/_components/profile/UserSettings";

// Stylesheet Imports
import styles from "@/app/(pages)/dashboard/profile/Profile.module.scss";

// Asset Imports
import placeholderAvatar from "@/assets/icons/user_avatar.svg";
import arrowLeftBrand from "@/assets/icons/arrow_left_brand.svg";
import editIcon from "@/assets/icons/edit.svg";

// Redux imports
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { apiHTTPWrapper } from "@/lib/features/authSlice";

interface UserState {
  username: string | null;
  email: string | null;
  created_at: string | null;
  photo_url: string | null;
  locality: string | null;
  gender: string | null;
  name: string | null;
  disabled: boolean;
  partial_data: boolean;
  current_channel: string | null;
  last_sign_in_time: string | null;
  uid: string | null;
}

interface UserSettingsProps {
  user: UserState;
  onBack: () => void;
}

type UserTrait = string;

interface UserTraitsResponse {
  traits: UserTrait[];
}

const Profile: React.FC = () => {
  const user = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState("comments");
  const [userTraits, setUserTraits] = useState<UserTrait[]>([]);

  useEffect(() => {
    const fetchUserTraits = async () => {
      try {
        if (!user?.uid) {
          console.log("No user ID available yet");
          return;
        }

        const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

        const traitsUrl = `${API_BASE_URL}/user_traits/get/traits`;
        console.log("Fetching user traits for user ID:", user.uid);
        console.log("API URL:", traitsUrl);

        const traitsResponse = await dispatch(
          apiHTTPWrapper({
            url: traitsUrl,
            options: {
              method: "GET",
            },
          })
        );

        console.log("Traits response:", traitsResponse);

        // If our backend returns {"traits": [...]}, extract that field.
        if (traitsResponse.payload) {
          const payload = traitsResponse.payload;
          console.log("Setting user traits:", payload);
          setUserTraits(payload.traits ?? payload);
        } else {
          console.log("No traits in response");
          setUserTraits([]);
        }
      } catch (error) {
        console.error("Error fetching user traits:", error);
        setUserTraits([]);
      }
    };

    fetchUserTraits();
  }, [user?.uid, dispatch]);

  const getTraitClassName = (trait: string) => {
    const formattedTrait = "active" + trait.replace(/[\s-]/g, "");
    return styles[formattedTrait] || "";
  };

  // For demo purposes, default empty arrays for other data
  const savedTopics: any[] = [];
  const wordsOfWisdom: any[] = [];
  const comments: any[] = [];

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  if (showSettings) {
    if (!user?.username) {
      return <div>Loading...</div>;
    }
    // Convert nullable fields to required format for UserSettings
    const userSettingsData = {
      username: user.username || "",
      email: user.email || "",
    };
    return <UserSettings user={userSettingsData} onBack={toggleSettings} />;
  }

  // Update the created_at date formatting to handle null
  const joinedDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString()
    : "Loading...";

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageWrapper}>
        <header className={styles.pageTitle}>
          <h1>Profile</h1>
          <button className={styles.editButton} onClick={toggleSettings}>
            Edit
          </button>
        </header>
        <div className={styles.profileHeader}>
          <div className={styles.avatarSmall}>
            <Image
              src={user?.photo_url || placeholderAvatar}
              alt={`${user?.username || "User"}'s avatar`}
              width={80}
              height={80}
            />
          </div>
          <div className={styles.userInfo}>
            <h2>{user?.username || "Loading..."}</h2>
            <p>Joined {joinedDate}</p>
            <div className={styles.tagContainer}>
              {userTraits.map((trait, index) => (
                <div
                  key={index}
                  className={`${styles.tagItem} ${getTraitClassName(trait)}`}
                >
                  {trait.split(/(?=[A-Z])/).join(" ")}
                </div>
              ))}
            </div>
          </div>
        </div>
        <ProfileTabs
          comments={comments}
          savedTopics={savedTopics}
          wisdmList={wordsOfWisdom}
          quadrantData={{ xValue: 0.7, yValue: 0.6 }}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <div className={styles.scrollableContent}>
        <ProfileTabs.Content
          activeTab={activeTab}
          comments={comments}
          savedTopics={savedTopics}
          wisdmList={wordsOfWisdom}
          quadrantData={{ xValue: 0.7, yValue: 0.6 }}
        />
      </div>
    </div>
  );
};

export default Profile;
