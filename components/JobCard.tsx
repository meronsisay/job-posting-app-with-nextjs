import React from "react";
import Image from "next/image";
import Link from "next/link";

interface JobCardProps {
  title: string;
  description: string;
  image: string;
}

const JobCard: React.FC<JobCardProps> = ({
  title,
  image,
  description,
}: JobCardProps) => {
  return (
    <div className="border-2 border-gray-300 shadow w-3xl rounded-xl mx-auto px-10 py-4">
      {/* for title and logo */}
      <div className="grid grid-cols-8">
        {/* logo div */}
        <div className="">
          <Image src={image} alt="Logo" width={55} height={55} />
        </div>
        {/* title */}
        <div className="col-span-7 flex flex-col gap-2">
          <h1 className="font-bold text-lg">{title}</h1>
          <p className="text-sm font-light text-gray-400">
            Yenigat Birhan None Profit Organization . Addis Ababa, Ethiopia
          </p>

          {/* discription */}
          <section className="text-sm tracking-wide">{description}</section>

          <div className="flex gap-3 py-2">
            <button className="bg-green-100 rounded-full px-2 text-green-500 text-sm">
              In Person
            </button>
            <div className="border-green-500 border-r-1"></div>
            <button className="border-2 border-solid border-yellow-400 rounded-full px-2 text-yellow-400 text-sm">
              Education
            </button>
            <button className="border-2 border-solid border-purple-400 rounded-full px-4 text-purple-400 text-sm">
              IT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
