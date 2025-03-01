import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import styles from "./TimelinePopup.module.scss";
import SourceCard from "@/app/_components/cards/SourceCard";

export type TimelineEvent = {
  title: string;
  description?: string;
  index?: number;
  domElement?: HTMLElement;
  eventId?: string;
};

interface TimelinePopupProps {
  event: TimelineEvent;
  isOpen: boolean;
  onClose: () => void;
  narrativeBias?: "left" | "right";
  timelineData?: any;
}

const TimelinePopup: React.FC<TimelinePopupProps> = ({
  event,
  isOpen,
  onClose,
  narrativeBias,
  timelineData,
}) => {
  const [activeTab, setActiveTab] = useState<"event" | "left" | "right">(
    narrativeBias === "left"
      ? "left"
      : narrativeBias === "right"
      ? "right"
      : "event"
  );

  const isClosingRef = useRef(false);

  const getEventData = () => {
    if (!timelineData || event.index === undefined) return null;
    return timelineData.timeline[event.index];
  };

  const eventData = getEventData();

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isClosingRef.current) {
      isClosingRef.current = true;
      onClose();
    }
  };

  const renderSourceWithLink = (source: any) => (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        type: "tween",
        ease: "easeOut",
      }}
    >
      <SourceCard
        title={source.title}
        author={source.author}
        publication={source.publication}
        date={source.date}
        url={source.url}
        imageUrl={source.image_url}
        variant={
          activeTab === "left"
            ? "left"
            : activeTab === "right"
            ? "right"
            : "default"
        }
      />
    </motion.div>
  );

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className={styles.popupOverlay}
          onClick={handleOverlayClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.25,
            type: "tween",
            ease: "easeInOut",
          }}
          onAnimationComplete={() => {
            isClosingRef.current = false;
          }}
        >
          <motion.div
            layoutId={`event-container-${event.eventId || event.index}`}
            className={`${styles.popupContent} ${
              activeTab === "left"
                ? styles.leftPerspectivePopup
                : activeTab === "right"
                ? styles.rightPerspectivePopup
                : ""
            }`}
            onClick={(e) => e.stopPropagation()}
            transition={{
              type: "tween",
              duration: 0.3,
              ease: "easeOut",
            }}
            style={{
              backgroundColor: "var(--color-timeline-event-bg)",
              color: "var(--color-body-font)",
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.2,
                type: "tween",
                ease: "easeOut",
                delay: 0.05,
              }}
              className={styles.popupInnerContent}
            >
              <div className={styles.popupHeader}>
                <motion.h2
                  layoutId={`event-title-${event.eventId || event.index}`}
                  transition={{ type: "tween", duration: 0.3 }}
                >
                  {eventData ? eventData.event : event.title}
                </motion.h2>
                {eventData?.date && (
                  <motion.div
                    layoutId={`event-date-${event.eventId || event.index}`}
                    className={styles.eventDate}
                    transition={{ type: "tween", duration: 0.3 }}
                  >
                    {eventData.date}
                  </motion.div>
                )}
              </div>

              <div className={styles.tabContainer}>
                {["left", "right"].map((tab) => (
                  <div
                    key={tab}
                    className={`${styles.tabItem} ${
                      activeTab === tab ? styles.activeTab : ""
                    } ${tab === "left" ? styles.leftTab : styles.rightTab}`}
                    onClick={() => setActiveTab(tab as any)}
                  >
                    {tab === "left" ? "Left Perspective" : "Right Perspective"}
                  </div>
                ))}
              </div>

              <div className={styles.tabContentContainer}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.2,
                      ease: "linear",
                    }}
                    className={styles.tabContent}
                  >
                    {activeTab === "left" && eventData?.left_perspective && (
                      <motion.div
                        className={`${styles.perspectiveBox}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <p className={styles.perspectiveContent}>
                          {eventData.left_perspective.viewpoint}
                        </p>

                        {eventData.left_perspective.quotes &&
                          eventData.left_perspective.quotes.length > 0 && (
                            <div className={styles.quoteContainer}>
                              <h3>Quotes</h3>
                              <div className={styles.quoteText}>
                                {eventData.left_perspective.quotes.map(
                                  (quote: string, i: number) => (
                                    <motion.p
                                      key={i}
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{ delay: i * 0.1 }}
                                    >
                                      "{quote}"
                                    </motion.p>
                                  )
                                )}
                              </div>
                            </div>
                          )}

                        {eventData.left_perspective.sources &&
                          eventData.left_perspective.sources.length > 0 && (
                            <div className={styles.sourcesContainer}>
                              <h3>Sources</h3>
                              <div className={styles.sourcesList}>
                                {eventData.left_perspective.sources.map(
                                  (source: any, i: number) => (
                                    <motion.div
                                      key={i}
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{ delay: 0.1 + i * 0.05 }}
                                    >
                                      {renderSourceWithLink(source)}
                                    </motion.div>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                      </motion.div>
                    )}

                    {activeTab === "right" && eventData?.right_perspective && (
                      <motion.div
                        className={`${styles.perspectiveBox}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <p className={styles.perspectiveContent}>
                          {eventData.right_perspective.viewpoint}
                        </p>

                        {eventData.right_perspective.quotes &&
                          eventData.right_perspective.quotes.length > 0 && (
                            <div className={styles.quoteContainer}>
                              <h3>Quotes</h3>
                              <div className={styles.quoteText}>
                                {eventData.right_perspective.quotes.map(
                                  (quote: string, i: number) => (
                                    <motion.p
                                      key={i}
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{ delay: i * 0.1 }}
                                    >
                                      "{quote}"
                                    </motion.p>
                                  )
                                )}
                              </div>
                            </div>
                          )}

                        {eventData.right_perspective.sources &&
                          eventData.right_perspective.sources.length > 0 && (
                            <div className={styles.sourcesContainer}>
                              <h3>Sources</h3>
                              <div className={styles.sourcesList}>
                                {eventData.right_perspective.sources.map(
                                  (source: any, i: number) => (
                                    <motion.div
                                      key={i}
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{ delay: 0.1 + i * 0.05 }}
                                    >
                                      {renderSourceWithLink(source)}
                                    </motion.div>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TimelinePopup;
