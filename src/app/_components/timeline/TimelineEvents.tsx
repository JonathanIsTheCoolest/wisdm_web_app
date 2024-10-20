// REWRITE COMPONENT INTO ONE WITH ALL THE OTHERS
// System Imports
import React, { useRef, useEffect, useState } from 'react';

// Stylesheet Imports
import styles from '@/app/(pages)/dashboard/timeline/Timeline.module.scss';

interface TimelineEvent {
  body: string;
  event_id: string;
  event_index: number;
  narrative_bias: string;
  timeline_id: string;
  version: number;
}

interface TimelineEventsProps {
  events: TimelineEvent[][];
}

const TimelineEvents: React.FC<TimelineEventsProps> = ({ events }) => {
  const allEvents = events.flat().sort((a, b) => a.event_index - b.event_index);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const calculateDotCount = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.clientHeight;
        const isMobile = window.innerWidth <= 767;
        const dotSpacing = isMobile ? 10 : 20;
        
        let availableHeight = containerHeight;
        if (isMobile) {
          const lastEvent = containerRef.current.querySelector(`.${styles.timelineEvent}:last-child`);
          if (lastEvent) {
            const lastEventBottom = lastEvent.getBoundingClientRect().bottom;
            const containerTop = containerRef.current.getBoundingClientRect().top;
            availableHeight = lastEventBottom - containerTop;
          }
        }
        
        const calculatedDotCount = Math.ceil(availableHeight / dotSpacing);
        setDotCount(Math.max(calculatedDotCount, allEvents.length * 3));
      }
    };

    calculateDotCount();
    window.addEventListener('resize', calculateDotCount);

    return () => {
      window.removeEventListener('resize', calculateDotCount);
    };
  }, [allEvents]);

  return (
    <div className={styles.timelineEventsContainer} ref={containerRef}>
      <div className={styles.timelineDots}>
        {Array.from({ length: dotCount }).map((_, index) => (
          <div 
            key={index} 
            className={`${styles.timelineDot} ${(index + 1) % 5 === 0 ? styles.largeDot : ''}`}
          />
        ))}
      </div>
      {allEvents.map((event) => (
        <div
          key={event.event_id}
          className={`${styles.timelineEvent} ${event.narrative_bias === 'left' ? styles.left : styles.right}`}
        >
          <div className={styles.eventContainer}>
            <div className={styles.eventDate}>{event.body.split(':')[0]}</div>
            <div className={styles.eventContent}>
              <div className={styles.eventTitle}>{event.body.split(':')[1].trim()}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimelineEvents;
