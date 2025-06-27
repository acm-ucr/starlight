import { FaLock } from "react-icons/fa";
import { ReactElement } from "react";
interface Tab {
  name: string;
  link: string;
  icon: ReactElement;
  target: string;
  affiliation?: string[];
}

const iconStyle = "text-xl";

interface Tools {
  expand: true;
  tabs: Tab[];
}

interface Tabs {
  [key: string]: {
    [key: string]: Tools;
  };
}

export const TABS: Tabs = {
  admin: {
    Admins: {
      expand: true,
      tabs: [
        {
          name: "ACM Board",
          link: "/admin/dashboard/board",
          icon: <FaLock className={iconStyle} />,
          target: "_self",
        },
        {
          name: "Create",
          link: "/admin/dashboard/create",
          icon: <FaLock className={iconStyle} />,
          target: "_self",
        },
        {
          name: "DAS",
          link: "/admin/dashboard/das",
          icon: <FaLock className={iconStyle} />,
          target: "_self",
        },
        {
          name: "Forge",
          link: "/admin/dashboard/forge",
          icon: <FaLock className={iconStyle} />,
          target: "_self",
        },
        {
          name: "Spark",
          link: "/admin/dashboard/spark",
          icon: <FaLock className={iconStyle} />,
          target: "_self",
        },
      ],
    },
    Applications: {
      expand: true,
      tabs: [
        {
          name: "Create",
          link: "/admin/dashboard/createapplications",
          icon: <FaLock className={iconStyle} />,
          target: "_self",
          affiliation: ["Create", "ACM Board"],
        },
        {
          name: "DAS",
          link: "/admin/dashboard/dasapplications",
          icon: <FaLock className={iconStyle} />,
          target: "_self",
          affiliation: ["DAS", "ACM Board"],
        },
        {
          name: "Forge",
          link: "/admin/dashboard/forgeapplications",
          icon: <FaLock className={iconStyle} />,
          target: "_self",
          affiliation: ["Forge", "ACM Board"],
        },
        {
          name: "Spark",
          link: "/admin/dashboard/sparkapplications",
          icon: <FaLock className={iconStyle} />,
          target: "_self",
          affiliation: ["Spark", "ACM Board"],
        },
      ],
    },
  },
};
