"use client";

// System Imports
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

// Component Imports
import Header from '@/src/app/_components/timeline/Header';
import Perspectives from '@/src/app/_components/timeline/Perspectives';
import TimelineEvents from '@/src/app/_components/timeline/TimelineEvents';
import TimelineComments from '@/src/app/_components/timeline/TimelineComments';
import ThreadContainer from '@/src/app/_components/comments/ThreadContainer/ThreadContainer';

// Stylesheet Imports
import styles from '@/app/(pages)/dashboard/timeline/Timeline.module.scss';

const Timeline = () => {
  const [timelineData, setTimelineData] = useState<any>(null);
  const searchParams = useSearchParams();
  const timelineId = searchParams?.get('timeline_id');

  // useEffect(() => {
  //   const fetchTimelineDetails = async () => {
  //     try {
  //       const response = await fetch(`${process.env.BASE_API_URL_DEV}/timelines/get/timeline?timeline_id=${timelineId}`);
  //       const data = await response.json();
  //       setTimelineData(data);
  //     } catch (error) {
  //       console.error("Error fetching timeline details:", error);
  //     }
  //   };
  //   if (timelineId) {
  //     fetchTimelineDetails();
  //   }
  // }, [timelineId]);

  // if (!timelineData) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className={styles.timelineContainer}>
      {/* <Header title={timelineData.timeline.title} />
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
      <TimelineEvents events={timelineData.events} /> */}
      <ThreadContainer threadId={timelineId}/>
    </div>
  );
};

export default Timeline;