import { useState, useEffect, useRef, useCallback } from "react";

export const useOnboardingLoadingState = (maxLoadingTime = 10000) => {
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const clearLoadingTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);
  const startLoading = useCallback(() => {
    setIsLoading(true);
    clearLoadingTimeout();

    timeoutRef.current = setTimeout(() => {
      console.warn(
        `Loading state automatically reset after ${maxLoadingTime}ms`
      );
      setIsLoading(false);
    }, maxLoadingTime);
  }, [maxLoadingTime, clearLoadingTimeout]);

  const stopLoading = useCallback(() => {
    clearLoadingTimeout();
    setIsLoading(false);
  }, [clearLoadingTimeout]);

  useEffect(() => {
    return () => {
      clearLoadingTimeout();
    };
  }, [clearLoadingTimeout]);

  return { isLoading, startLoading, stopLoading };
};

export const useFormLoadingState = () => useOnboardingLoadingState();
