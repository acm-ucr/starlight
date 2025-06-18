import Tracks from "@/data/tracks";
import TrackCard from "./trackcard";

const TrackCards = () => {
  return (
    <div className="mx-auto w-5/6">
      <p className="to-starlight-yellow-primary bg-gradient-to-r from-white to-[70%] bg-clip-text pb-12 text-center text-5xl font-bold text-transparent md:to-10% md:pb-6 md:text-left">
        Tracks
      </p>
      <div className="flex flex-wrap justify-center">
        {Tracks.map(({ name, logo, focus, color }, index) => (
          <TrackCard
            key={index}
            name={name}
            logo={logo}
            focus={focus}
            color={color}
          />
        ))}
      </div>
    </div>
  );
};

export default TrackCards;
