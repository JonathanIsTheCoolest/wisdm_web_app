import { useState, useEffect } from "react";

interface LoadingStates {
  [key: string]: boolean;
}

export const useLoadingState = (initialStates: string[]) => {
  const [loadingStates, setLoadingStates] = useState<LoadingStates>(
    initialStates.reduce((acc, state) => ({ ...acc, [state]: true }), {})
  );
  const [isLoading, setIsLoading] = useState(true);
  const setLoaded = (state: string) => {
    setLoadingStates((prev) => ({ ...prev, [state]: false }));
  };
  const startLoading = (state: string) => {
    setLoadingStates((prev) => ({ ...prev, [state]: true }));
  };
  const resetLoading = () => {
    setLoadingStates(
      initialStates.reduce((acc, state) => ({ ...acc, [state]: true }), {})
    );
  };

  useEffect(() => {
    const allLoaded = Object.values(loadingStates).every((state) => !state);
    setIsLoading(!allLoaded);
  }, [loadingStates]);

  return { isLoading, setLoaded, startLoading, resetLoading };
};
