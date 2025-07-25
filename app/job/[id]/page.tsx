"use client";
import { useParams } from "next/navigation";
import JobDetails from "@/components/JobDetails";
import { useGetSinglePostQuery } from "@/app/service/data";
import { JobPost } from "@/type/job";

const JobDescription = () => {
  const { id } = useParams();
 

  const { isError, isLoading, isSuccess, data } = useGetSinglePostQuery(id as string);
   console.log(data);
  let content: React.ReactNode;
  if (isLoading) {
    content = (
      <div className="text-center align-middle text-3xl text-orange-700 mt-48">
        Loading...
      </div>
    );
  } else if (isError) {
    content = (
      <div className="text-center text-red-600 align-middle font-bold text-xl  mt-48">
        Opps. Something went wrong
      </div>
    );
  } else if(isSuccess && data){
    content =  <JobDetails job={data} />;
  }
 

  return <div>{content}</div>;
};

export default JobDescription;
