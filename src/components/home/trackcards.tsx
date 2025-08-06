import Tracks from "@/data/tracks";
import TrackCard from "./trackcard";

const colorClasses = {
  "starlight-spark": {
    textColor: "text-starlight-spark",
    bgColor: "to-starlight-spark/80",
    shadowColor: "shadow-starlight-spark",
    url: "https://acm.cs.ucr.edu/programs/spark",
  },
  "starlight-create": {
    textColor: "text-starlight-create",
    bgColor: "to-starlight-create/80",
    shadowColor: "shadow-starlight-create",
    url: "https://acm.cs.ucr.edu/programs/create",
  },
  "starlight-forge": {
    textColor: "text-starlight-forge",
    bgColor: "to-starlight-forge/80",
    shadowColor: "shadow-starlight-forge",
    url: "https://acm.cs.ucr.edu/programs/forge",
  },
  "starlight-das": {
    textColor: "text-starlight-das",
    bgColor: "to-starlight-das/80",
    shadowColor: "shadow-starlight-das",
    url: "https://acm.cs.ucr.edu/programs/das",
  },
};

const TrackCards = () => {
  return (
    <div className="mx-auto mb-40 w-5/6">
      <h2 className="text-starlight-yellow-primary pb-12 text-center text-4xl font-bold md:pb-6 md:text-left">
        Tracks
      </h2>
      <div className="flex flex-wrap justify-center gap-4 md:flex-nowrap">
        {Tracks.map(({ name, logo, focus, color }, index) => {
          const { textColor, bgColor, shadowColor, url } = colorClasses[color];
          return (
            <TrackCard
              key={index}
              name={name}
              logo={logo}
              focus={focus}
              textColor={textColor}
              bgColor={bgColor}
              shadowColor={shadowColor}
              buttonColor={`bg-${color}`}
              url={url}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TrackCards;
