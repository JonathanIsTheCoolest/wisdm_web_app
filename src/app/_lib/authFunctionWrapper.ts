'use client'

import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";

export const apiHTTPWrapper = async (
  url: string, 
  options: RequestInit = {}
) => {
  const token = useAppSelector((state: RootState) => state.auth.idToken);

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response.json();
}

export const apiSocketWrapper = (cb: Function): any => {
  const token = useAppSelector((state: RootState) => state.auth.idToken);
  return cb(token)
}