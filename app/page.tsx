"use client";
import JobCard from "@/components/JobCard";
import Link from "next/link";
import { useGetJobPostsQuery } from "./service/data";

export default function Home() {
  const { isError, isLoading, isSuccess, data } = useGetJobPostsQuery();
  console.log(data);

  let content: React.ReactNode;
  if (isLoading) {
    content = (
      <div className="text-center align-middle text-3xl text-orange-700  mt-48">
        Loading...
      </div>
    );
  } else if (isError) {
    content = (
      <div className="text-center text-red-600 align-middle  mt-48">
        Opps. Something went wrong
      </div>
    );
  } else if (isSuccess) {
    content = data.map((job, i) => (
      <li key={job.id || i}>
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
    <main className="p-9">
      <div className="flex mx-auto w-3xl justify-between mb-6">
        <div>
          <h1 className="font-extrabold text-2xl">Opportunites</h1>
          <p className="text-gray-400">show 73 items</p>
        </div>
        <div>
          <span className="text-gray-500">sort by: </span>
          <span>
            most relevant
            <select className="ml-2 border px-2 py-1 rounded">
              <option value="relevant">Most Relevant</option>
              <option value="latest">Latest</option>
            </select>
          </span>
        </div>
      </div>

      <div>
        <ul className="flex flex-col gap-6">{content}</ul>
      </div>
    </main>
  );
}
