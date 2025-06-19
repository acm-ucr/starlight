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
    color: "text-yellow-500",
    url: "/apply/spark",
  },
  {
    name: "Create",
    logo: Create,
    focus: "UI/UX",
    color: "text-blue-500",
    url: "/apply/create",
  },
  {
    name: "Forge",
    logo: Forge,
    focus: "Embedded & Mechanics",
    color: "text-gray-500",
    url: "/apply/forge",
  },
  {
    name: "DAS",
    logo: DAS,
    focus: "Data Science & Statistics",
    color: "text-purple-500",
    url: "/apply/das",
  },
];
export default Tracks;
