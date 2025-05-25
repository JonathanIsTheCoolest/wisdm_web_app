"use client";

import React from "react";
import { ResourceError } from "./index";

export interface ErrorHandlerOptions {
  fallbackMessage?: string;
  logError?: boolean;
}

/**
 * A higher-order function that wraps an async function with error handling
 * @param asyncFn - The async function to wrap
 * @param options - Options for error handling
 * @returns A new function that handles errors from the original function
 */
export function withErrorHandling<T, Args extends any[]>(
  asyncFn: (...args: Args) => Promise<T>,
  options: ErrorHandlerOptions = {}
) {
  const { fallbackMessage = "An error occurred", logError = true } = options;

  return async (...args: Args): Promise<T | React.ReactElement> => {
    try {
      return await asyncFn(...args);
    } catch (error) {
      if (logError) {
        console.error("Error caught by error handler:", error);
      }

      if (error instanceof Error) {
        return <ResourceError message={fallbackMessage} error={error} />;
      }

      return <ResourceError message={fallbackMessage} />;
    }
  };
}

/**
 * Helper function to safely parse JSON
 * @param jsonString - The JSON string to parse
 * @param fallback - Fallback value if parsing fails
 * @returns The parsed object or fallback value
 */
export function safeJsonParse<T>(jsonString: string, fallback: T): T {
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return fallback;
  }
}

/**
 * Helper function to handle fetch errors
 * @param response - The fetch response
 * @returns The response if it's ok, throws an error otherwise
 */
export async function handleFetchResponse(
  response: Response
): Promise<Response> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Network response error: ${response.status} ${response.statusText} - ${errorText}`
    );
  }
  return response;
}
