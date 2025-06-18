import Image, { StaticImageData } from "next/image";
interface TrackCardProps {
  name: string;
  logo: StaticImageData;
  focus: string;
  color: string;
}

const TrackCard = ({ name, logo, focus, color }: TrackCardProps) => {
  return (
    <div className="flex flex-col items-center pb-12 md:pb-8">
      <Image
        src={logo}
        alt="logo"
        className="drop-shadow-yellow-secondary w-8/12 pb-4"
      />
      <p className={`${color} pb-2 text-5xl font-bold`}>{name}</p>
      <p className="text-xl text-white">{focus}</p>
    </div>
  );
};

export default TrackCard;
