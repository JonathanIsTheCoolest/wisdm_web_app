import React, { useState, useRef } from "react";
import TimelineHeader from "@/app/_components/timeline/TimelineHeader";
import Perspectives from "@/app/_components/timeline/Perspectives";
import TimelineEvents from "@/app/_components/timeline/TimelineEvents";
import styles from "@/app/(pages)/dashboard/timeline/Timeline.module.scss";
import Image from "next/image";
import timeline_1 from "@/assets/images/timeline_1.png";
import TimelinePopup from "@/app/_components/timeline/TimelinePopup";

import { SelectedPopupEvent, TimelinePopupProps } from "@/types";

interface TimelineProps {
  timeline: any;
  showComments?: boolean;
}

const Timeline: React.FC<TimelineProps> = ({
  timeline,
  showComments = true,
}) => {
  const transformEventsForTimelineEvents = () => {
    if (!timeline || !timeline.timeline) return [];

    return [
      timeline.timeline.map((item: any, index: number) => ({
        body: `${item.date}: ${item.event}`,
        event_id: `event-${index}`,
        event_index: index,
        narrative_bias: index % 2 === 0 ? "left" : "right", // Alternate between left and right
        timeline_id: "placeholder-timeline",
        version: 1,
      })),
    ];
  };

  const transformedEvents = transformEventsForTimelineEvents();

  const [selectedPopupEvent, setSelectedPopupEvent] =
    useState<SelectedPopupEvent | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeEventElement, setActiveEventElement] =
    useState<HTMLElement | null>(null);

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

  return (
    <div className={styles.timelineContainer}>
      <TimelineHeader title={timeline?.topic_statement || "Loading..."} />
      <div className={styles.timelineImage}>
        <Image src={timeline_1} alt="Timeline Image" />
      </div>
      <Perspectives
        left={{
          title: "Left Perspective Summary",
          content:
            timeline?.summary?.substring(0, 150) + "..." ||
            "Left perspective summary",
        }}
        right={{
          title: "Right Perspective Summary",
          content:
            timeline?.methodology?.substring(0, 150) + "..." ||
            "Right perspective summary",
        }}
        topicStatement={timeline?.topic_statement}
      />
      <TimelineEvents
        events={transformedEvents}
        onEventClick={customEventClickHandler}
      />

      {selectedPopupEvent && (
        <TimelinePopup
          event={selectedPopupEvent.event}
          isOpen={isPopupOpen}
          onClose={handlePopupClose}
          initialClickPosition={selectedPopupEvent.position}
          narrativeBias={selectedPopupEvent.bias}
          timelineData={timeline}
        />
      )}
    </div>
  );
};

export default Timeline;
