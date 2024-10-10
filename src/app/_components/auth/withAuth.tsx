'use client'

import { useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import React, { ComponentType, useEffect } from 'react';

// Higher Order Component Redirect
const withAuth  = <P extends object>(WrappedComponent: ComponentType<P>): ComponentType<P> => {
  return (props: P) => {
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/login');
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;