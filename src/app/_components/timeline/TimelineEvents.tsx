import React from 'react';
import styles from '@/styles/dashboard/timeline/Timeline.module.scss';

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
  // Flatten the events array and sort by event_index
  const allEvents = events.flat().sort((a, b) => a.event_index - b.event_index);

  return (
    <div className={styles.timelineEventsContainer}>
      {allEvents.map((event) => (
        <div
          key={event.event_id}
          className={`${styles.timelineEvent} ${event.narrative_bias === 'left' ? styles.left : styles.right}`}
        >
          <div className={styles.eventContainer}>
            <div className={styles.eventDate}>
              {event.body.split(':')[0]} {/* Assuming the date is before the colon */}
            </div>
            <div className={styles.eventContent}>
              <div className={styles.eventTitle}>
                {event.body.split(':')[1].trim()} {/* The event description after the colon */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimelineEvents;
