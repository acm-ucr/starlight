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
    color: "text-starlight-spark",
    url: "/apply/spark",
  },
  {
    name: "Create",
    logo: Create,
    focus: "UI/UX",
    color: "text-starlight-create",
    url: "/apply/create",
  },
  {
    name: "Forge",
    logo: Forge,
    focus: "Embedded & Mechanics",
    color: "text-starlight-forge",
    url: "/apply/forge",
  },
  {
    name: "DAS",
    logo: DAS,
    focus: "Data Science & Statistics",
    color: "text-starlight-das",
    url: "/apply/das",
  },
];
export default Tracks;
