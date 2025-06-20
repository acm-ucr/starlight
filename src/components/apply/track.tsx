import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface TrackProps {
  name: string;
  logo: StaticImageData;
  color: string;
  url: string;
}
const Track = ({ name, logo, color, url }: TrackProps) => {
  return (
    <Link
      className="flex aspect-square w-1/4 flex-col items-center pt-4 hover:cursor-pointer"
      href={url}
    >
      <Image
        src={logo}
        className="drop-shadow-yellow-secondary"
        alt="acm spark logo"
      />
      <p className={`${color} pt-4 text-5xl font-bold`}>{name}</p>
    </Link>
  );
};

export default Track;
