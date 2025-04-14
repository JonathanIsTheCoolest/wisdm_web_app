import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import styles from "./TimelinePopup.module.scss";
import SourceCard from "@/app/_components/cards/SourceCard";
import { TimelinePopupProps } from "@/types";

export type TimelineEvent = {
  title: string;
  description?: string;
  index?: number;
  domElement?: HTMLElement;
  eventId?: string;
};

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
            duration: 0.3,
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
              color: "vars.$color-font-body",
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.3,
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
                    onClick={() => setActiveTab(tab as "left" | "right")}
                  >
                    {tab === "left" ? "Left Perspective" : "Right Perspective"}
                  </div>
                ))}
              </div>

              <div className={styles.tabContentContainer}>
                {activeTab === "left" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`${styles.tabContent} ${styles.perspectiveBox}`}
                  >
                    <h3>Left Perspective</h3>
                    <div className={styles.quoteContainer}>
                      <div className={styles.quoteText}>
                        <p>
                          {typeof eventData?.left_perspective === "object"
                            ? JSON.stringify(eventData.left_perspective)
                            : eventData?.left_perspective ||
                              "Left perspective data not available for this event."}
                        </p>
                      </div>
                    </div>
                    {eventData?.left_sources &&
                    eventData.left_sources.length > 0 ? (
                      <div className={styles.sourcesContainer}>
                        <h3>Sources</h3>
                        <div className={styles.sourcesList}>
                          {eventData.left_sources.map(
                            (source: any, index: number) => (
                              <div key={`left-source-${index}`}>
                                {renderSourceWithLink(source)}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    ) : null}
                  </motion.div>
                )}

                {activeTab === "right" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`${styles.tabContent} ${styles.perspectiveBox}`}
                  >
                    <h3>Right Perspective</h3>
                    <div className={styles.quoteContainer}>
                      <div className={styles.quoteText}>
                        <p>
                          {typeof eventData?.right_perspective === "object"
                            ? JSON.stringify(eventData.right_perspective)
                            : eventData?.right_perspective ||
                              "Right perspective data not available for this event."}
                        </p>
                      </div>
                    </div>
                    {eventData?.right_sources &&
                    eventData.right_sources.length > 0 ? (
                      <div className={styles.sourcesContainer}>
                        <h3>Sources</h3>
                        <div className={styles.sourcesList}>
                          {eventData.right_sources.map(
                            (source: any, index: number) => (
                              <div key={`right-source-${index}`}>
                                {renderSourceWithLink(source)}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    ) : null}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TimelinePopup;
