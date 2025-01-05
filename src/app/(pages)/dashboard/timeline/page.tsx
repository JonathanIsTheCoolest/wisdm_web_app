"use client";

// System Imports
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

// API/Database Imports
import { TimelineWithDetails } from "@/types";

// Component Imports
import TimelineHeader from "@/app/_components/timeline/TimelineHeader";
import Perspectives from "@/app/_components/timeline/Perspectives";
import TimelineEvents from "@/app/_components/timeline/TimelineEvents";
import ThreadContainer from "@/app/_components/comments/ThreadContainer/ThreadContainer";

// Stylesheet Imports
import styles from "@/app/(pages)/dashboard/timeline/Timeline.module.scss";

// Assets
import LoadingOverlay from "@/app/_components/loading/LoadingOverlay";
import timeline_1 from "@/assets/images/timeline_1.png";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

const Timeline = () => {
  const [timelineData, setTimelineData] = useState<TimelineWithDetails | null>(
    null
  );
  const searchParams = useSearchParams();
  const timelineId = searchParams?.get("timeline_id");

  useEffect(() => {
    const fetchTimelineDetails = async () => {
      const TIMELINE_DETAILS_URL = `${API_BASE_URL}/timelines/get/timeline?timeline_id=${timelineId}`;
      try {
        const response = await fetch(TIMELINE_DETAILS_URL, {
          method: "GET",
        });

        const result = await response.json();
        setTimelineData(result);
      } catch (e) {
        console.error(
          `Looks like there was an error fetching your timeline details: ${e}`
        );
      }
    };
    fetchTimelineDetails();
  }, [timelineId]);

  if (!timelineData) {
    return <LoadingOverlay isVisible={true} />;
  }

  return (
    timelineData && (
      <>
        <div className={styles.timelineContainer}>
          <TimelineHeader
            title={timelineData?.timeline.title || "Loading..."}
          />
          <div className={styles.timelineImage}>
            <Image src={timeline_1} alt="Timeline Image" />
          </div>
          <Perspectives
            left={{
              title: "Left Perspective",
              content: "Add Event Perspective Summaries",
            }}
            right={{
              title: "Right Perspective",
              content: "Add Event Perspective Summaries",
            }}
          />
          <TimelineEvents events={timelineData.events} />
        </div>
        <ThreadContainer threadId={timelineId} />
      </>
    )
  );
};

export default Timeline;
