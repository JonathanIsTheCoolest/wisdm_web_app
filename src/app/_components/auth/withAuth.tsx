"use client";

import { useAppSelector } from "@/redux_lib/hooks";
import { RootState } from "@/redux_lib/store";
import { useRouter } from "next/navigation";
import React, { ComponentType, useEffect } from "react";

// Higher Order Component Redirect
const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> => {
  return (props: P) => {
    const idToken = useAppSelector((state: RootState) => state.auth.idToken);
    const router = useRouter();

    useEffect(() => {
      if (!idToken) {
        router.push("/login");
      }
    }, [idToken, router]);

    if (!idToken) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
