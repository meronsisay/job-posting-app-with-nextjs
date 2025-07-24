"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import JobDetails from "@/components/JobDetails";
import { Details } from "@/type/job";

const JobDescription = () => {
  const params = useParams();
  const id = params.id as string;

  const [data, setData] = useState<Details | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(id);
        const selectedJob = data.job_postings[parseInt(id)];
        setData(selectedJob);
      });
  }, [id]);

  if (!data) return <div>Loading...</div>;

  return <JobDetails job={data} />;
};

export default JobDescription;
