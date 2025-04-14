"use client";

// System Imports
import React, { useState, useEffect } from "react";
import Image from "next/image";

// API/Database Imports

// Component Imports
import ProfileTabs from "@/app/_components/profile/ProfileTabs";
import UserSettings from "@/app/_components/profile/UserSettings";
import LoadingSpinner from "@/app/_components/loading/LoadingSpinner";

// Stylesheet Imports
import styles from "@/app/(pages)/dashboard/profile/Profile.module.scss";

// Asset Imports
import placeholderAvatar from "@/assets/icons/user_avatar.svg";

// Redux imports
import { useAppSelector, useAppDispatch } from "@/redux_lib/hooks";
import { RootState } from "@/redux_lib/store";
import { apiHTTPWrapper } from "@/redux_lib/features/authSlice";
import { useLoadingState } from "@/hooks/useLoadingState";

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
  const [comments, setComments] = useState<any[]>([]);
  const { isLoading, setLoaded } = useLoadingState(["userTraits", "comments"]);

  useEffect(() => {
    const fetchUserTraits = async () => {
      try {
        if (!user?.username) {
          console.log("No user ID available yet");
          return;
        }

        const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

        const traitsUrl = `${API_BASE_URL}/user_traits/get/traits`;
        console.log("Fetching user traits for username:", user.username);
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
      } finally {
        setLoaded("userTraits");
      }
    };

    fetchUserTraits();
  }, [user?.username, dispatch]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (!user?.username) {
          console.log("No user ID available yet for comments");
          return;
        }
        const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
        const commentsUrl = `${API_BASE_URL}/comments/get_recent`;
        console.log("Fetching comments for user:", user.username);
        console.log("Comments API URL:", commentsUrl);
        const commentsResponse = await dispatch(
          apiHTTPWrapper({
            url: commentsUrl,
            options: { method: "GET" },
          })
        );
        console.log("Comments response:", commentsResponse);
        if (commentsResponse.payload) {
          const payload = commentsResponse.payload;
          setComments(payload.comments || []);
        } else {
          console.log("No comments in response");
          setComments([]);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]);
      } finally {
        setLoaded("comments");
      }
    };

    fetchComments();
  }, [user?.username, dispatch]);

  const getTraitClassName = (trait: string) => {
    const formattedTrait = "active" + trait.replace(/[\s-]/g, "");
    return styles[formattedTrait] || "";
  };

  const savedTopics: any[] = [];
  const wordsOfWisdm: any[] = [];

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  if (showSettings) {
    if (!user?.username) {
      return <div>Loading...</div>;
    }
    const userSettingsData = {
      username: user.username || "",
      email: user.email || "",
      photo_url: user.photo_url,
    };
    return <UserSettings user={userSettingsData} onBack={toggleSettings} />;
  }

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
          <div className={styles.avatarLarge}>
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
          wisdmList={wordsOfWisdm}
          quadrantData={{ xValue: 0.7, yValue: 0.6 }}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <div className={styles.scrollableContent}>
        {isLoading ? (
          <div className={styles.spinnerWrapper}>
            <LoadingSpinner />
          </div>
        ) : (
          <ProfileTabs.Content
            activeTab={activeTab}
            comments={comments}
            savedTopics={savedTopics}
            wisdmList={wordsOfWisdm}
            quadrantData={{ xValue: 0.7, yValue: 0.6 }}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
