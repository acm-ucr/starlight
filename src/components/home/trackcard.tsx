import Image, { StaticImageData } from "next/image";
import Link from "next/link";
interface TrackCardProps {
  name: string;
  logo: StaticImageData;
  focus: string;
  textColor: string;
  bgColor: string;
  shadowColor: string;
  buttonColor: string;
  url: string;
}

const TrackCard = ({
  name,
  logo,
  focus,
  textColor,
  bgColor,
  shadowColor,
  buttonColor,
  url,
}: TrackCardProps) => {
  return (
    <div
      className={`flex flex-col items-center bg-white/5 bg-linear-to-b py-12 md:pb-8 ${bgColor} shadow-b rounded-lg from-30% to-180% ${shadowColor}`}
    >
      <Image src={logo} alt="logo" className="w-4/9 pb-4" />
      <p className={`${textColor} pb-6 text-4xl font-bold`}>{name}</p>
      <p className="pb-6 text-lg text-white">{focus}</p>
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-starlight-blue-primary text-lg font-bold transition-all hover:scale-103 hover:opacity-90 ${buttonColor} mb-2 rounded-lg px-6 py-2`}
      >
        Learn More
      </Link>
    </div>
  );
};

export default TrackCard;
