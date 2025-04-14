// REWRITE COMPONENT INTO ONE WITH ALL THE OTHERS
// System Imports
import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

// Stylesheet Imports
import styles from "@/app/(pages)/dashboard/timeline/Timeline.module.scss";

// Import TimelinePopup component
import TimelinePopup, {
  TimelineEvent as PopupTimelineEvent,
} from "./TimelinePopup";

interface TimelineEvent {
  body: string;
  event_id: string;
  event_index: number;
  narrative_bias: "left" | "right";
  timeline_id: string;
  version: number;
}

interface TimelineEventsProps {
  events: TimelineEvent[][] | TimelineEvent[];
  onEventClick?: (
    event: TimelineEvent,
    e: React.MouseEvent<HTMLDivElement>
  ) => void;
}

const TimelineEvents: React.FC<TimelineEventsProps> = ({
  events,
  onEventClick,
}) => {
  const eventsContainerRef = useRef<HTMLDivElement>(null);
  const [transformedEvents, setTransformedEvents] = useState<TimelineEvent[]>(
    []
  );
  const [dotCount, setDotCount] = useState(0);

  // Added state for popup
  const [selectedPopupEvent, setSelectedPopupEvent] =
    useState<PopupTimelineEvent | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Added state for initial click position for popup
  const [popupInitialPosition, setPopupInitialPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // Added state for popupNarrativeBias
  const [popupNarrativeBias, setPopupNarrativeBias] = useState<
    "left" | "right" | undefined
  >(undefined);

  useEffect(() => {
    // Transform the events into a flat array if they are nested
    if (events && Array.isArray(events)) {
      if (events.length > 0 && Array.isArray(events[0])) {
        setTransformedEvents(events[0] as TimelineEvent[]);
      } else {
        setTransformedEvents(events as TimelineEvent[]);
      }
    }
  }, [events]);

  const handleEventClick = (
    timelineEvent: TimelineEvent,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (onEventClick) {
      onEventClick(timelineEvent, e);
      return;
    }

    // Default click handler
    const parts = timelineEvent.body.split(":");
    const titlePart = parts[1] ? parts[1].trim() : "No Title";
    const popupEvent: PopupTimelineEvent = {
      title: titlePart,
    };
    const rect = e.currentTarget.getBoundingClientRect();
    const initialX = rect.left + rect.width / 2;
    const initialY = rect.top + rect.height / 2;
    setPopupInitialPosition({ x: initialX, y: initialY });
    // Set narrative bias based on the event's narrative_bias field
    setPopupNarrativeBias(timelineEvent.narrative_bias);
    setSelectedPopupEvent(popupEvent);
    setIsPopupOpen(true);
  };

  useEffect(() => {
    const calculateDotCount = () => {
      if (eventsContainerRef.current) {
        const containerHeight = eventsContainerRef.current.clientHeight;
        const isMobile = window.innerWidth <= 767;
        const dotSpacing = isMobile ? 10 : 20;

        let availableHeight = containerHeight;
        if (isMobile) {
          const lastEvent = eventsContainerRef.current.querySelector(
            `.${styles.timelineEvent}:last-child`
          );
          if (lastEvent) {
            const lastEventBottom = lastEvent.getBoundingClientRect().bottom;
            const containerTop =
              eventsContainerRef.current.getBoundingClientRect().top;
            availableHeight = lastEventBottom - containerTop;
          }
        }

        const calculatedDotCount = Math.ceil(availableHeight / dotSpacing);
        setDotCount(Math.max(calculatedDotCount, transformedEvents.length * 3));
      }
    };

    calculateDotCount();
    window.addEventListener("resize", calculateDotCount);

    return () => {
      window.removeEventListener("resize", calculateDotCount);
    };
  }, [transformedEvents]);

  return (
    <>
      <div ref={eventsContainerRef} className={styles.timelineEventsContainer}>
        <div className={styles.timelineDots}>
          {Array.from({ length: dotCount }).map((_, index) => (
            <div
              key={index}
              className={`${styles.timelineDot} ${
                (index + 1) % 5 === 0 ? styles.largeDot : ""
              }`}
            />
          ))}
        </div>
        {transformedEvents.map((event, index) => (
          <motion.div
            key={event.event_id || index}
            className={`${styles.timelineEvent} ${
              event.narrative_bias === "left" ? styles.left : styles.right
            }`}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.3,
              delay: index * 0.05,
              type: "tween",
              ease: "easeOut",
            }}
          >
            <motion.div
              className={styles.eventContainer}
              layoutId={`event-container-${event.event_id}`}
              whileHover={{
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
              }}
              transition={{
                type: "tween",
                duration: 0.3,
              }}
              onClick={(e) => handleEventClick(event, e)}
            >
              <div className={styles.eventContent}>
                <motion.div layoutId={`event-title-${event.event_id}`}>
                  <h3 className={styles.eventDate}>
                    {event.body.split(":")[0]}
                  </h3>
                  <div className={styles.eventTitle}>
                    <h3>{event.body.split(":")[1]}</h3>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
      {!onEventClick && selectedPopupEvent && (
        <TimelinePopup
          event={selectedPopupEvent}
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          initialClickPosition={popupInitialPosition || undefined}
          narrativeBias={popupNarrativeBias || undefined}
        />
      )}
    </>
  );
};

export default TimelineEvents;
