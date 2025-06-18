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
}

const Tracks: Track[] = [
  {
    name: "Spark",
    logo: Spark,
    focus: "Web Development",
    color: "text-yellow-500",
  },
  {
    name: "Create",
    logo: Create,
    focus: "UI/UX",
    color: "text-blue-500",
  },
  {
    name: "Forge",
    logo: Forge,
    focus: "Embedded & Mechanics",
    color: "text-gray-500",
  },
  {
    name: "DAS",
    logo: DAS,
    focus: "Data Science & Statistics",
    color: "text-purple-500",
  },
];
export default Tracks;
