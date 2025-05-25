"use client";

import { ResourceError } from "@/app/_components/errors";
import React from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <ResourceError message="Something went wrong" error={error} retry={reset} />
  );
}
