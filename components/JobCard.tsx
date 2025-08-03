import BookmarkToggle from "./BookToggleButton";
import Image from "next/image";
import Link from "next/link";

interface JobCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  isBookmarked?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  title,
  image,
  description,
}: JobCardProps) => {
  return (
    <div
      className="border-2 border-gray-300 shadow w-3xl rounded-xl mx-auto px-10 py-4 flex justify-between"
      data-testid="job-card"
    >
      {/* for title and logo */}
      <Link href={`/job/${id}`}>
        <div className="grid grid-cols-8 gap-2">
          {/* logo div */}

          <div className="">
            <Image
              src={
                image ||
                "https://res.cloudinary.com/dtt1wnvfb/image/upload/v1701954159/photo_2023-12-07%2016.02.23.jpeg.jpg"
              }
              alt="Logo"
              width={55}
              height={55}
              unoptimized
            />
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
      </Link>
      <BookmarkToggle jobId={id} />
    </div>
  );
};

export default JobCard;

