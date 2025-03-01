"use client";

import { useState, useEffect } from "react";
import Timeline from "@/components/Timeline/Timeline";
import placeholderTimelineData from "@/assets/placeholderTimeline.json";
import LoadingOverlay from "@/app/_components/loading/LoadingOverlay";

const PlaceholderTimelinePage = () => {
  const [timelineData, setTimelineData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimelineData(placeholderTimelineData);
    setIsLoading(false);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <LoadingOverlay isVisible={isLoading} />

      {!isLoading && timelineData && (
        <Timeline timeline={timelineData} showComments={false} />
      )}
    </div>
  );
};

export default PlaceholderTimelinePage;
