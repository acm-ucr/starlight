import Track from "@/components/apply/track";
import TracksData from "@/data/tracks";
import Link from "next/link";
const Tracks = () => {
  return (
    <div className="bg-starlight-gray-primary flex h-screen w-screen flex-col items-center justify-evenly">
      <p className="pb-2 text-center text-5xl font-bold text-white">
        Select an Application
      </p>
      <div className="flex w-full flex-col items-center justify-center md:flex-row">
        {TracksData.map(({ name, logo, color, url }, index) => (
          <Track key={index} name={name} logo={logo} color={color} url={url} />
        ))}
      </div>
      <div className="flex flex-col items-center py-10 md:py-0">
        <p className="pb-2 text-4xl font-bold text-white">Leads/Directors</p>
        <Link
          className="bg-starlight-blue-primary rounded px-8 py-2 text-2xl text-white hover:cursor-pointer"
          href="apply/admin"
        >
          Apply
        </Link>
      </div>
    </div>
  );
};

export default Tracks;
