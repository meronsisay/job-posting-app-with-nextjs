"use client";
import JobCard from "@/components/JobCard";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Data {
  title: string;
  image: string;
  description: string;
}

interface JobsList {
  job_postings: Data[];
}

function getImage(): string {
  for(let i = 1; i <= 4; i ++){
    return `/images/job${i}.png`;
  }
  return ""
}

export default function Home() {
  const [data, setData] = useState<Data[]>([]);
  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data: JobsList) => setData(data.job_postings));

  }, []);
  return (
    <main className="p-9">
      <div className="flex mx-auto w-3xl justify-between mb-6">
        <div className="">
          <h1 className="font-extrabold text-2xl">Opportunites</h1>
          <p className="text-gray-400">show 73 items</p>
        </div>
        <div>
          <span className="text-gray-500">sort by: </span>
          <span>
            most relevant
            <select name="" id=""></select>
          </span>
        </div>

        <div className="flex "></div>
      </div>

      <div>
        <ul className="flex flex-col gap-6">
          {data?.map((data, i) => (
            <li key={i}>
              <Link href={`/job/${i}`}>
                <JobCard
                  title={data.title}
                  description={data.description}
                  image="/images/job1.png"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
