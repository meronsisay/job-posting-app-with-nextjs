"use client";
import JobCard from "@/components/JobCard";
import { useGetJobPostsQuery } from "../app/service/data";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useGetBookmarksQuery } from "./service/bookmarkApi";
import Header from "@/components/Header";

export default function Home() {
  const { data: session, status } = useSession();
  const token = session?.user?.accessToken || null;

  const [filter, setFilter] = useState("All");

  const {
    data: jobs,
    isLoading: isJobsLoading,
    isError,
    isSuccess: isJobsSuccess,
  } = useGetJobPostsQuery();

  const {
    data: bookmarks,
    isLoading: isBookmarksLoading,
    isSuccess: isBookmarksSuccess,
  } = useGetBookmarksQuery({ token }, { skip: !token });

  const isLoading =
    isJobsLoading || (filter === "Bookmarked" && isBookmarksLoading);


  if (status === "loading") {
    return (
      <div className="text-center text-orange-700 mt-48 text-2xl">
        Loading...
      </div>
    );
  }
  let displayedJobs = jobs || [];

  if (
    filter === "Bookmarked" &&
    isJobsSuccess &&
    isBookmarksSuccess &&
    bookmarks &&
    token
  ) {
    displayedJobs = jobs.filter((job) =>
      bookmarks.some((b) => b.eventID === job.id)
    );
  }

  let content: React.ReactNode;

  if (isLoading) {
    content = (
      <div className="text-center text-orange-700 mt-48 text-2xl font-bold">
        Loading...
      </div>
    );
  } else if (isError) {
    content = (
      <div className="text-center text-red-600 mt-48 text-2xl">
        Oops! Something went wrong.
      </div>
    );
  } else if (displayedJobs.length === 0) {
    content = (
      <div className="text-center text-gray-500 mt-40 text-xl">
        No bookmarked jobs to display.
      </div>
    );
  } else {
    content = displayedJobs.map((job) => (
      <li key={job.id}>
        <JobCard
          id={job.id}
          title={job.title}
          description={job.description}
          image={job.logoUrl}
        />
      </li>
    ));
  }

  return (
    <>
      <Header />
      <main className="p-3">
        <div className="flex mx-auto w-3xl justify-between mb-6">
          <div>
            <h1 className="font-extrabold text-2xl">Opportunities</h1>
            <p className="text-gray-400">
              Showing {displayedJobs.length || 0} items
            </p>
          </div>
          <div>
            <span className="text-gray-500">Sort by:</span>
            <select
              className="ml-2 border px-2 py-1 rounded"
              data-testid="filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All" className="text-center">
                All
              </option>
              {token && (
                <option value="Bookmarked" className="text-center">
                  Bookmarked
                </option>
              )}
            </select>
          </div>
        </div>

        <ul className="flex flex-col gap-6 mb-9">{content}</ul>
      </main>
    </>
  );
}
