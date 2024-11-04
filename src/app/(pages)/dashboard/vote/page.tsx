"use client";

// System Imports
import React, { useState } from "react";

// API/Database Imports
import placeholderData from "@/assets/placeholderData.json";

// Component Imports
import VoteCard from "@/app/_components/cards/VoteCard";

// Stylesheet Imports
import styles from "@/app/(pages)/dashboard/vote/Vote.module.scss";

const Vote = () => {
  const [voteItems, setVoteItems] = useState(placeholderData.voteItems);

  const handleVote = (id: string, vote: boolean) => {
    setVoteItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, vote: vote } : item
      )
    );
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageTitle}>
        <h1>Vote</h1>
        <h2>Vote on the hottest takes 🔥</h2>
      </header>
      <div className={styles.pageWrapper}>
        {voteItems.map((item) => (
          <VoteCard
            key={item.id}
            id={item.id}
            image={item.image}
            title={item.title}
            description={item.description}
            vote={item.vote}
            onVote={handleVote}
          />
        ))}
      </div>
    </div>
  );
};

export default Vote;
