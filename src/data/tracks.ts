import Spark from "@/public/logos/spark.svg";
import Create from "@/public/logos/create.svg";
import Forge from "@/public/logos/forge.svg";
import DAS from "@/public/logos/das.svg";
import { StaticImageData } from "next/image";

interface Track {
  name: string;
  logo: StaticImageData;
  focus: string;
  color: string;
  url: string;
}

const Tracks: Track[] = [
  {
    name: "Spark",
    logo: Spark,
    focus: "Web Development",
<<<<<<< HEAD
    color: "text-starlight-spark",
=======
    color: "text-yellow-500",
    url: "/apply/spark",
>>>>>>> 9af442ceee0201243817124578b778877b171f1f
  },
  {
    name: "Create",
    logo: Create,
    focus: "UI/UX",
<<<<<<< HEAD
    color: "text-starlight-create",
=======
    color: "text-blue-500",
    url: "/apply/create",
>>>>>>> 9af442ceee0201243817124578b778877b171f1f
  },
  {
    name: "Forge",
    logo: Forge,
    focus: "Embedded & Mechanics",
<<<<<<< HEAD
    color: "text-starlight-forge",
=======
    color: "text-gray-500",
    url: "/apply/forge",
>>>>>>> 9af442ceee0201243817124578b778877b171f1f
  },
  {
    name: "DAS",
    logo: DAS,
    focus: "Data Science & Statistics",
<<<<<<< HEAD
    color: "text-starlight-das",
=======
    color: "text-purple-500",
    url: "/apply/das",
>>>>>>> 9af442ceee0201243817124578b778877b171f1f
  },
];
export default Tracks;
