"use client";

// System Imports
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

// Component Imports
import Header from '@/app/_components/timeline/Header';
import Perspectives from '@/app/_components/timeline/Perspectives';
import TimelineEvents from '@/app/_components/timeline/TimelineEvents';
import TimelineComments from '@/app/_components/timeline/TimelineComments';

// Stylesheet Imports
import styles from '@/app/(pages)/dashboard/timeline/Timeline.module.scss';

const Timeline = () => {
  const [showComments, setShowComments] = useState<boolean>(true);
  const [timelineData, setTimelineData] = useState<any>(null);
  const searchParams = useSearchParams();
  const timelineId = searchParams.get('timeline_id');

  useEffect(() => {
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
  }, [timelineId]);

  const toggleComments = (): void => {
    setShowComments(!showComments);
  };

  if (!timelineData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.timelineContainer}>
      <Header title={timelineData.timeline.title} />
      <Perspectives
        left={{
          title: "Left Perspective",
          content: timelineData.summary.left
        }}
        right={{
          title: "Right Perspective",
          content: timelineData.summary.right
        }}
      />
      <TimelineEvents events={timelineData.events} />
      <button className={styles.toggleCommentsButton} onClick={toggleComments}>
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>
      {showComments && <TimelineComments onClose={toggleComments} />}
    </div>
  );
};

export default Timeline;