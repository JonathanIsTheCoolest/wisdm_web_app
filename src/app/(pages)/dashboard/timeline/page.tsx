"use client";

// System Imports
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

// API/Database Imports
import placeholderData from "@/assets/placeholderData.json";

// Component Imports
import Header from "@/app/_components/timeline/Header";
import Perspectives from "@/app/_components/timeline/Perspectives";
import TimelineEvents from "@/app/_components/timeline/TimelineEvents";
import TimelineComments from "@/app/_components/timeline/TimelineComments";

// Stylesheet Imports
import styles from "@/app/(pages)/dashboard/timeline/Timeline.module.scss";

const Timeline = () => {
  const [showComments, setShowComments] = useState<boolean>(true);
  const [timelineData, setTimelineData] = useState<any>(null);
  const searchParams = useSearchParams();
  const timelineId = searchParams.get("timeline_id");

  useEffect(() => {
    // Simulating API fetch with placeholder data
    const fetchTimelineDetails = () => {
      const mockTimelineData = placeholderData.timelines.find(
        (timeline) => timeline.timeline_id === timelineId
      );
      if (mockTimelineData) {
        setTimelineData(mockTimelineData);
      }
    };

    if (timelineId) {
      fetchTimelineDetails();
    }

    // Commented out API fetch
    /*
    const fetchTimelineDetails = async () => {
      try {
        const response = await fetch(`${process.env.BASE_API_URL_DEV}/timelines/get/timeline?timeline_id=${timelineId}`);
        const data = await response.json();
        setTimelineData(data);
      } catch (error) {
        console.error("Error fetching timeline details:", error);
      }
    };
    if (timelineId) {
      fetchTimelineDetails();
    }
    */
  }, [timelineId]);

  const toggleComments = (): void => {
    setShowComments(!showComments);
  };

  if (!timelineData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.timelineContainer}>
      <Header title={timelineData?.title || "Loading..."} />
      <Perspectives
        left={{
          title: "Left Perspective",
          content: placeholderData.events[0][0].body, // Using the first left event as a placeholder
        }}
        right={{
          title: "Right Perspective",
          content: placeholderData.events[1][0].body, // Using the first right event as a placeholder
        }}
      />
      <TimelineEvents events={placeholderData.events} />
      <button className={styles.toggleCommentsButton} onClick={toggleComments}>
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>
      {showComments && <TimelineComments onClose={toggleComments} />}
    </div>
  );
};

export default Timeline;
