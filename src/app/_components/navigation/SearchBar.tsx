"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import TimelineCard from "@/app/_components/cards/TimelineCard";
import LoadingSpinner from "@/app/_components/loading/LoadingSpinner";
import searchIcon from "@/assets/icons/search.svg";
import styles from "./SearchBar.module.scss";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  apiBaseUrl?: string;
  idToken?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  className = "",
  placeholder = "Search",
  apiBaseUrl,
  idToken,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!searchFocused) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchFocused]);

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setIsSearching(false);
      setError(null);
      return;
    }
    setIsSearching(true);
    const timeout = setTimeout(async () => {
      try {
        const response = await fetch(
          `${
            apiBaseUrl || process.env.NEXT_PUBLIC_BASE_API_URL
          }/search?q=${encodeURIComponent(searchQuery)}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${idToken || ""}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSearchResults(data.results || []);
        setError(null);
      } catch (error) {
        console.error("Error searching:", error);
        setError("Failed to search. Please try again later.");
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 400);
    setDebounceTimeout(timeout);
    return () => clearTimeout(timeout);
  }, [searchQuery, idToken, apiBaseUrl]);

  return (
    <>
      <AnimatePresence>
        {searchFocused && searchQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className={styles.searchBackdrop}
            onClick={() => setSearchFocused(false)}
          />
        )}
      </AnimatePresence>
      <div ref={containerRef} className={`${styles.searchBar} ${className}`}>
        <input
          type="text"
          placeholder={placeholder}
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setSearchFocused(true)}
        />
        <div className={styles.searchIcon}>
          <Image src={searchIcon} alt="Search Icon" />
        </div>
        <AnimatePresence>
          {searchFocused && searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={styles.searchDropdown}
            >
              {isSearching ? (
                <div className={styles.dropdownLoading}>
                  <LoadingSpinner />
                </div>
              ) : error ? (
                <div className={styles.dropdownError}>{error}</div>
              ) : searchResults.length === 0 ? (
                <div className={styles.dropdownNoResults}>
                  No results found.
                </div>
              ) : (
                <>
                  {(() => {
                    const timelines = searchResults.filter(
                      (r) => r.type === "timeline"
                    );
                    const events = searchResults.filter(
                      (r) => r.type === "event"
                    );
                    const summaries = searchResults.filter(
                      (r) => r.type === "summary"
                    );
                    return (
                      <>
                        {timelines.length > 0 && (
                          <div className={styles.searchDropdownSection}>
                            <h2 className={styles.dropdownSectionTitle}>
                              Timeline Results
                            </h2>
                            <div className={styles.searchDropdownMasonry}>
                              {timelines.map((item) => (
                                <Link
                                  href={`/dashboard/timeline?id=${item.id}`}
                                  key={`timeline-${item.id}`}
                                >
                                  <TimelineCard {...item} variant="compact" />
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                        {events.length > 0 && (
                          <div className={styles.searchDropdownSection}>
                            <h2 className={styles.dropdownSectionTitle}>
                              Event Results
                            </h2>
                            {events.map((item) => (
                              <div
                                key={`event-${item.id}`}
                                className={styles.dropdownEventItem}
                              >
                                <h4>{item.title || "Event"}</h4>
                                <p>{item.body}</p>
                              </div>
                            ))}
                          </div>
                        )}
                        {summaries.length > 0 && (
                          <div className={styles.searchDropdownSection}>
                            <h2 className={styles.dropdownSectionTitle}>
                              Summary Results
                            </h2>
                            {summaries.map((item) => (
                              <div
                                key={`summary-${item.summary_id}`}
                                className={styles.dropdownSummaryItem}
                              >
                                <h4>Summary</h4>
                                <p>{item.text}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    );
                  })()}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default SearchBar;
