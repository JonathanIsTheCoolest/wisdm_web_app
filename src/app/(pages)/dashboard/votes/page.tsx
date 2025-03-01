import { useLoadingState } from "@/hooks/useLoadingState";
import { useEffect } from "react";
import LoadingOverlay from "@/components/LoadingOverlay";

const Votes = () => {
  const { isLoading, setLoaded } = useLoadingState(["votes"]);

  useEffect(() => {
    // Simulate loading for now
    setTimeout(() => {
      setLoaded("votes");
    }, 1000);
  }, []);

  return (
    <>
      <LoadingOverlay isVisible={isLoading} />
      {/* rest of your JSX */}
    </>
  );
};

export default Votes;
