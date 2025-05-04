"use client";

// System Imports
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useAppDispatch } from "@/redux_lib/hooks";
import { updateCurrentChannel } from "@/redux_lib/features/userSlice";

// API/Database Imports
import {
  TimelineWithDetails,
  SelectedPopupEvent,
  TimelinePopupProps,
} from "@/types";

// Component Imports
import TimelineHeader from "@/app/_components/timeline/TimelineHeader";
import Perspectives from "@/app/_components/timeline/Perspectives";
import TimelineEvents from "@/app/_components/timeline/TimelineEvents";
import ThreadContainer from "@/app/_components/comments/ThreadContainer/ThreadContainer";
import TimelinePopup from "@/app/_components/timeline/TimelinePopup";

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
  const timelineId: string = searchParams?.get("timeline_id") || "";
  const dispatch = useAppDispatch();

  // Using the type from the central types file
  const [selectedPopupEvent, setSelectedPopupEvent] =
    useState<SelectedPopupEvent | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeEventElement, setActiveEventElement] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    const fetchTimelineDetails = async () => {
      const TIMELINE_DETAILS_URL = `${API_BASE_URL}/timelines/get/timeline?timeline_id=${timelineId}`;
      try {
        const response = await fetch(TIMELINE_DETAILS_URL, {
          method: "GET",
        });

        const result = await response.json();
        console.log(result);
        setTimelineData(result);
      } catch (e) {
        console.error(
          `Looks like there was an error fetching your timeline details: ${e}`
        );
      }
    };
    fetchTimelineDetails();
  }, [timelineId]);

  useEffect(() => {
    timelineId &&
      dispatch(
        updateCurrentChannel({
          current_channel: timelineId,
        })
      );
  }, [timelineId]);

  const customEventClickHandler = (event: any, e: React.MouseEvent) => {
    const eventElement = e.currentTarget as HTMLElement;

    if (activeEventElement) {
      activeEventElement.classList.remove(styles.highlightedEvent);
    }

    eventElement.classList.add(styles.highlightedEvent);
    setActiveEventElement(eventElement);

    const eventIndex = event.event_index;

    const popupEvent = {
      title: event.body.split(":")[1]?.trim() || event.body,
      index: eventIndex,
      eventId: event.event_id,
    };

    const rect = eventElement.getBoundingClientRect();
    const initialX =
      rect.left + (event.narrative_bias === "left" ? rect.width : 0);
    const initialY = rect.top + rect.height / 2;

    setSelectedPopupEvent({
      event: popupEvent,
      position: { x: initialX, y: initialY },
      bias: event.narrative_bias,
    });

    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    if (activeEventElement) {
      activeEventElement.classList.remove(styles.highlightedEvent);
      setActiveEventElement(null);
    }
    setIsPopupOpen(false);
  };

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
              content:
                timelineData?.timeline?.summary?.substring(0, 150) + "..." ||
                "Add Event Perspective Summaries",
            }}
            right={{
              title: "Right Perspective",
              content:
                timelineData?.timeline?.methodology?.substring(0, 150) +
                  "..." || "Add Event Perspective Summaries",
            }}
            topicStatement={timelineData?.timeline?.topic_statement}
          />
          <TimelineEvents
            events={timelineData.events}
            onEventClick={customEventClickHandler}
          />

          {selectedPopupEvent && (
            <TimelinePopup
              event={selectedPopupEvent.event}
              isOpen={isPopupOpen}
              onClose={handlePopupClose}
              initialClickPosition={selectedPopupEvent.position}
              narrativeBias={selectedPopupEvent.bias}
              timelineData={timelineData}
            />
          )}
        </div>
        <ThreadContainer threadId={timelineId} threadType="timelines"/>
      </>
    )
  );
};

export default Timeline;
