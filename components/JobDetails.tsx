import { JobPost } from '@/type/job';
import { IoLocationOutline } from "react-icons/io5";

interface JobDetails{
  job: JobPost
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
            {job.responsibilities.split("\n").map((resp, i) => (
              <li key={i}> &#x2713; {resp}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-extrabold text-xl mb-2">
            Ideal Candidate we want
          </h2>
          <ul className="list-disc">
            {/* <li className="font-bold text-[14px]">
              {job.ideal_candidate.age} {job.ideal_candidate.gender} {job.title}
            </li> */}
            {job.idealCandidate.split("\n").map((trait, i) => (
              <li key={i} className="text-gray-600 text-[14px] tracking-wide">
                {trait}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-extrabold text-xl mb-2">When & Where</h2>
          <div className="text-gray-600 text-[14px] tracking-wide flex gap-2">
            <span>
              <IoLocationOutline size="18px" />
            </span>
            {job.whenAndWhere}
          </div>
        </section>
      </div>
      <div>
        <section>
          <h2 className="font-extrabold text-xl mb-2">About</h2>
          <div className="my-2">
            <p className="text-gray-500 text-15px">Posted On</p>
            <span className="text-[14px] font-bold">{job.datePosted}</span>
          </div>
          <div className="mb-2">
            <p className="text-gray-500 text-15px">Deadline</p>
            <span className="text-[14px] font-bold">{job.deadline}</span>
          </div>
          <div className="mb-2 flex gap-2" >
            <div>
              <p className="text-gray-500 text-15px">Location</p>
              <span className="text-[14px] font-bold">{job.location}</span>
            </div>
          </div>
          <div className="mb-2">
            <p className="text-gray-500 text-15px">Start Date</p>
            <span className="text-[14px] font-bold">{job.startDate}</span>
          </div>
          <div className="mb-2">
            <p className="text-gray-500 text-15px">End Date</p>
            <span className="text-[14px] font-bold">{job.endDate}</span>
          </div>
        </section>
        <section className="mt-4">
          <h2 className="font-extrabold text-xl mb-2">Catagory</h2>
          <div className="text-[14px] tracking-wide">
            {job.categories.map((category, i) => (
              <button
                key={i}
                className="rounded-full text-green-800 bg-green-200 mr-2 px-2 mb-1"
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-4">
          <h2 className="font-extrabold text-xl mb-2">required Skills</h2>

          <div className="text-purple-900 text-[14px] tracking-wide">
            {job.requiredSkills.map((skill, i) => (
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
