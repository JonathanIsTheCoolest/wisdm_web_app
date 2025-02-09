"use client";

// System Imports
import React from "react";
import Image from "next/image";
import Link from "next/link";

import { useAppDispatch, useAppSelector } from "@/redux_lib/hooks";
import { updateCurrentChannel } from "@/redux_lib/features/userSlice";

import { standardizePersonalRoomName } from "@/app/_lib/user/name/general";

// Component Imports
import ThemeToggle from "@/app/_components/buttons/ThemeToggle";

// Stylesheet Imports
import styles from "@/app/(pages)/dashboard/timeline/Timeline.module.scss";

// Asset Imports
import arrowLeftBrand from "@/assets/icons/arrow_left_brand.svg";
import { RootState } from "@/redux_lib/store";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user);
  return (
    <header className={styles.header}>
      <div className={styles.timelineHeader}>
        <Link
          href="/dashboard"
          className={styles.backButton}
          onClick={() =>
            dispatch(updateCurrentChannel({ current_channel: standardizePersonalRoomName(user.username) }))
          }
        >
          <Image src={arrowLeftBrand} alt="Back" />
        </Link>
        <h1 className={styles.pageTitle}>{title}</h1>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
