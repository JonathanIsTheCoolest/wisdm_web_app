"use client";

// System Imports
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Component Imports
import Header from '@/src/app/_components/timeline/Header';
import Perspectives from '@/src/app/_components/timeline/Perspectives';
import TimelineEvents from '@/src/app/_components/timeline/TimelineEvents';
import ThreadContainer from '@/src/app/_components/comments/ThreadContainer/ThreadContainer';

// Stylesheet Imports
import styles from "@/app/(pages)/dashboard/timeline/Timeline.module.scss";

import { TimelineWithDetails } from "@/src/types";

const API_BASE_URL = process.env.BASE_API_URL || 'http://127.0.0.1:5000/api';

const Timeline = () => {
  const [timelineData, setTimelineData] = useState<TimelineWithDetails | null>(null);
  const searchParams = useSearchParams();
  const timelineId = searchParams?.get('timeline_id');

  useEffect(() => {
    const fetchTimelineDetails = async () => {
        const TIMELINE_DETAILS_URL = `${API_BASE_URL}/timelines/get/timeline?timeline_id=${timelineId}`
        try {
          const response = await fetch(TIMELINE_DETAILS_URL, {
            method: 'GET'
          });

          const result = await response.json()
          setTimelineData(result)
        } catch(e) {
          console.error(`Looks like there was an error fetching your timeline details: ${e}`)
        }
    }
    fetchTimelineDetails()
  }, [timelineId]);

  if (!timelineData) {
    return <div>Loading...</div>;
  }

  return (
    timelineData &&
    <>
      <div className={styles.timelineContainer}>
        <Header title={timelineData?.timeline.title || "Loading..."} />
        <Perspectives
          left={{
            title: "Left Perspective",
            content: 'Add Event Perspective Summaries',
          }}
          right={{
            title: "Right Perspective",
            content: 'Add Event Perspective Summaries',
          }}
        />
        <TimelineEvents events={timelineData.events} />
      </div>
      <ThreadContainer threadId={timelineId}/>
    </>
  );
};

export default Timeline;
