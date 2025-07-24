import { Details } from '@/type/job';
import React from 'react'



interface JobDetails{
  job: Details
}

const JobDetails: React.FC<JobDetails> = ({job}) => {
  return (
    <div className="flex gap-10 p-10 lg:w-6xl md:mx-auto">
      <div className="flex flex-col gap-8 md:w-4xl">
        <section>
          <h2 className="font-extrabold text-xl mb-2">Description</h2>
          <p className="text-gray-600 text-[14px] tracking-wide">
            {job.description}
          </p>
        </section>
        <section>
          <h2 className="font-extrabold text-xl mb-2">Responsibilies</h2>
          <ul className="text-gray-600 text-[14px] tracking-wide">
            {job.responsibilities.map((resp, i) => (
              <li key={i}> &#x2713; {resp}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-extrabold text-xl mb-2">
            Ideal Candidate we want
          </h2>
          <ul className="list-disc">
            <li className="font-bold text-[14px]">
              {job.ideal_candidate.age} {job.ideal_candidate.gender} {job.title}
            </li>
            {job.ideal_candidate.traits.map((trait, i) => (
              <li key={i} className="text-gray-600 text-[14px] tracking-wide">
                {trait}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-extrabold text-xl mb-2">When & Where</h2>
          <div className="text-gray-600 text-[14px] tracking-wide">
            {job.when_where}
          </div>
        </section>
      </div>
      <div>
        <section>
          <h2 className="font-extrabold text-xl mb-2">About</h2>
          <div className="my-2">
            <p className="text-gray-500 text-15px">Posted On</p>
            <span className="text-[14px] font-bold">{job.about.posted_on}</span>
          </div>
          <div className="mb-2">
            <p className="text-gray-500 text-15px">Deadline</p>
            <span className="text-[14px] font-bold">{job.about.deadline}</span>
          </div>
          <div className="mb-2">
            <p className="text-gray-500 text-15px">Location</p>
            <span className="text-[14px] font-bold">{job.about.location}</span>
          </div>
          <div className="mb-2">
            <p className="text-gray-500 text-15px">Start Date</p>
            <span className="text-[14px] font-bold">
              {job.about.start_date}
            </span>
          </div>
          <div className="mb-2">
            <p className="text-gray-500 text-15px">End Date</p>
            <span className="text-[14px] font-bold">{job.about.end_date}</span>
          </div>
        </section>
        <section className='mt-4'>
          <h2 className="font-extrabold text-xl mb-2">Catagory</h2>
          <div className="text-[14px] tracking-wide">
            {job.about.categories.map((category, i) => (
              <button
                key={i}
                className="rounded-full text-green-800 bg-green-200 mr-2 px-2 mb-1"
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className='mt-4'>
          <h2 className="font-extrabold text-xl mb-2">required Skills</h2>

          <div className="text-purple-900 text-[14px] tracking-wide">
            {job.about.required_skills.map((skill,i) => (
              <button key={i} className="bg-purple-100 p-1 mx-2 mb-1 rounded">
                {skill}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default JobDetails
